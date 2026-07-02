"use client";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import BusinessIcon from "@mui/icons-material/Business";
import CMSLayout from "./CMSLayout";

export default function CMSDashboard() {
  const [newsCount, setNewsCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [facilityCount, setFacilityCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const fetchMessages = () => {
    fetch("/api/contact-messages")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((res) => { if (res.success) setMessages(res.data || []); })
      .catch(() => {});
  };

  useEffect(() => {
    fetch("/api/cms/news").then((r) => r.ok ? r.json() : Promise.reject()).then((res) => { if (res.success) setNewsCount(res.data?.length || 0); }).catch(() => {});
    fetch("/api/cms/staff").then((r) => r.ok ? r.json() : Promise.reject()).then((res) => { if (res.success) setStaffCount(Array.isArray(res.data) ? res.data.length : 0); }).catch(() => {});
    fetch("/api/cms/facilities").then((r) => r.ok ? r.json() : Promise.reject()).then((res) => { if (res.success) setFacilityCount(Array.isArray(res.data) ? res.data.length : 0); }).catch(() => {});
    fetch("/api/cms/gallery").then((r) => r.ok ? r.json() : Promise.reject()).then((res) => { if (res.success) setGalleryCount(Array.isArray(res.data) ? res.data.length : 0); }).catch(() => {});
    fetchMessages();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch("/api/contact-messages?id=" + deleteId, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setMessages((prev) => prev.filter((m) => m.id !== deleteId));
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
    setDeleteId(null);
  };

  const sections = [
    { title: "News Articles", count: newsCount, icon: <ArticleIcon sx={{ fontSize: 40 }} />, color: "#F43755", href: "/cms/news" },
    { title: "Staff Members", count: staffCount, icon: <PeopleIcon sx={{ fontSize: 40 }} />, color: "#2C235A", href: "/cms/staff" },
    { title: "Facilities", count: facilityCount, icon: <BusinessIcon sx={{ fontSize: 40 }} />, color: "#27ae60", href: "/cms/facilities" },
    { title: "Gallery Categories", count: galleryCount, icon: <PhotoLibraryIcon sx={{ fontSize: 40 }} />, color: "#e67e22", href: "/cms/gallery" },
  ];

  return (
    <CMSLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a1a2e" }}>
          Welcome to CMS Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", mt: 1 }}>
          Manage all website content from here. Use the sidebar to navigate between sections.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {sections.map((section) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={section.title}>
            <Card sx={{ cursor: "pointer", transition: "transform 0.2s", "&:hover": { transform: "translateY(-4px)" } }}>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Box sx={{ color: section.color, mb: 2 }}>{section.icon}</Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: section.color }}>
                  {section.count}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mt: 1 }}>
                  {section.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Contact Messages ({messages.length})</Typography>
        </Box>
        {messages.length === 0 ? (
          <Typography variant="body2" sx={{ color: "#999" }}>No messages yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {messages.map((msg) => (
              <Grid size={{ xs: 12 }} key={msg.id}>
                <Card sx={{ border: "1px solid #e0e0e0", borderRadius: "12px" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1a1a2e" }}>
                          {msg.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          {msg.email}
                        </Typography>
                        {msg.phone && (
                          <Typography variant="body2" sx={{ color: "#666" }}>
                            {msg.phone}
                          </Typography>
                        )}
                        <Typography variant="body2" sx={{ color: "#666", textTransform: "capitalize" }}>
                          Subject: {msg.subject}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="caption" sx={{ color: "#999", whiteSpace: "nowrap" }}>
                          {new Date(msg.created_at).toLocaleDateString()}
                        </Typography>
                        <IconButton size="small" color="error" onClick={() => setDeleteId(msg.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: "8px" }}>
                      <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6 }}>{msg.message}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Quick Guide</Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <li><Typography><strong>Topbar & Footer</strong> - Edit school name, navigation items, footer links and social media</Typography></li>
          <li><Typography><strong>Home Page</strong> - Manage banner images, message cards shown on homepage</Typography></li>
          <li><Typography><strong>News</strong> - Add, edit, or delete technical and general news articles</Typography></li>
          <li><Typography><strong>About</strong> - Edit History, School Today, and Committees pages</Typography></li>
          <li><Typography><strong>Staff</strong> - Manage staff members in Technical and General branches</Typography></li>
          <li><Typography><strong>Facilities</strong> - Add, edit, or remove facility cards</Typography></li>
          <li><Typography><strong>Gallery</strong> - Manage gallery categories and photos with image uploads</Typography></li>
          <li><Typography><strong>Exam Portal</strong> - Manage exam cards and subjects</Typography></li>
          <li><Typography><strong>Contact</strong> - Edit contact information, staff cards, and map locations</Typography></li>
          <li><Typography><strong>Messages</strong> - Edit messages from Principal, Chairman, Coordinator, VP</Typography></li>
          <li><Typography><strong>CMS Users</strong> - Manage who can access this CMS dashboard</Typography></li>
        </Box>
      </Paper>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Message</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this message? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </CMSLayout>
  );
}
