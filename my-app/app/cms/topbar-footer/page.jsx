"use client";
import { useState, useEffect } from "react";
import {
  Box, Typography, Paper, TextField, Button, Grid, IconButton, Alert, Accordion, AccordionSummary, AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CMSLayout from "../CMSLayout";
import ImageUpload from "../components/ImageUpload";

export default function TopbarFooterCMS() {
  const [topbar, setTopbar] = useState(null);
  const [footer, setFooter] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/cms/topbar").then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }),
      fetch("/api/cms/footer").then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }),
    ]).then(([topbarRes, footerRes]) => {
      if (topbarRes.success) setTopbar(topbarRes.data);
      if (footerRes.success) setFooter(footerRes.data);
    }).catch((err) => console.error("CMS Topbar/Footer fetch error:", err.message));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await Promise.all([
      fetch("/api/cms/topbar", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(topbar) }),
      fetch("/api/cms/footer", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(footer) }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!topbar || !footer) return null;

  const addNavItem = () => setTopbar({ ...topbar, navItems: [...topbar.navItems, { label: "", href: "/" }] });
  const removeNavItem = (i) => setTopbar({ ...topbar, navItems: topbar.navItems.filter((_, idx) => idx !== i) });
  const updateNavItem = (i, field, value) => {
    const items = [...topbar.navItems];
    items[i] = { ...items[i], [field]: value };
    setTopbar({ ...topbar, navItems: items });
  };

  const addSubItem = (parentIdx) => {
    const items = [...topbar.navItems];
    items[parentIdx].subItems = [...(items[parentIdx].subItems || []), { label: "", href: "/" }];
    setTopbar({ ...topbar, navItems: items });
  };

  const removeSubItem = (parentIdx, subIdx) => {
    const items = [...topbar.navItems];
    items[parentIdx].subItems = items[parentIdx].subItems.filter((_, idx) => idx !== subIdx);
    setTopbar({ ...topbar, navItems: items });
  };

  const updateSubItem = (parentIdx, subIdx, field, value) => {
    const items = [...topbar.navItems];
    items[parentIdx].subItems[subIdx] = { ...items[parentIdx].subItems[subIdx], [field]: value };
    setTopbar({ ...topbar, navItems: items });
  };

  return (
    <CMSLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Topbar & Footer</Typography>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving} sx={{ backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>

      {saved && <Alert severity="success" sx={{ mb: 2 }}>Saved successfully!</Alert>}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>School Information</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="School Name" value={topbar.schoolName} onChange={(e) => setTopbar({ ...topbar, schoolName: e.target.value })} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="School Location" value={topbar.schoolLocation} onChange={(e) => setTopbar({ ...topbar, schoolLocation: e.target.value })} />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Navigation Items</Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={addNavItem}>Add Item</Button>
        </Box>
        {topbar.navItems.map((item, i) => (
          <Accordion key={i} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.label || "New Item"}</Typography>
                {item.subItems && <Typography variant="caption" sx={{ color: "#999" }}>({item.subItems.length} sub-items)</Typography>}
              </Box>
              <Box
                onClick={(e) => { e.stopPropagation(); removeNavItem(i); }}
                sx={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", p: 1, borderRadius: "50%", "&:hover": { backgroundColor: "#f0f0f0" } }}
              >
                <DeleteIcon fontSize="small" color="error" />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Label" value={item.label} onChange={(e) => updateNavItem(i, "label", e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Link" value={item.href} onChange={(e) => updateNavItem(i, "href", e.target.value)} />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Sub Items</Typography>
                  <Button size="small" onClick={() => addSubItem(i)}>Add Sub Item</Button>
                </Box>
                {(item.subItems || []).map((sub, j) => (
                  <Box key={j} sx={{ display: "flex", gap: 1, mb: 1 }}>
                    <TextField size="small" value={sub.label} onChange={(e) => updateSubItem(i, j, "label", e.target.value)} sx={{ flex: 1 }} />
                    <TextField size="small" value={sub.href} onChange={(e) => updateSubItem(i, j, "href", e.target.value)} sx={{ flex: 1 }} />
                    <IconButton size="small" onClick={() => removeSubItem(i, j)}><DeleteIcon fontSize="small" color="error" /></IconButton>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Footer</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Email" value={footer.email} onChange={(e) => setFooter({ ...footer, email: e.target.value })} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth label="Address" multiline rows={2} value={footer.address} onChange={(e) => setFooter({ ...footer, address: e.target.value })} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth label="Copyright" value={footer.copyright} onChange={(e) => setFooter({ ...footer, copyright: e.target.value })} />
          </Grid>
        </Grid>
      </Paper>
    </CMSLayout>
  );
}
