"use client";
import { useState, useEffect, Fragment } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, Alert, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ImageIcon from "@mui/icons-material/Image";
import CMSLayout from "../CMSLayout";
import ImageCellDialog from "../components/ImageCellDialog";

export default function GalleryCMS() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("/api/cms/gallery").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }).then((res) => {
      if (res.success) setData(res.data);
    }).catch((err) => console.error("CMS Gallery fetch error:", err.message));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/cms/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!data) return null;

  const updateItem = (i, field, value) => {
    const items = [...(data.categories || [])];
    items[i] = { ...items[i], [field]: value };
    setData({ ...data, categories: items });
  };

  const addItem = () => setData({
    ...data,
    categories: [...(data.categories || []), { id: Date.now(), title: "", img: "/images/principal.png", link: "/gallery/new", photos: [] }]
  });

  const removeItem = (i) => setData({ ...data, categories: (data.categories || []).filter((_, idx) => idx !== i) });

  const toggleExpand = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));

  const addPhoto = (catIdx) => {
    const items = [...(data.categories || [])];
    items[catIdx] = {
      ...items[catIdx],
      photos: [...(items[catIdx].photos || []), { src: "/images/principal.png", alt: "" }],
    };
    setData({ ...data, categories: items });
  };

  const updatePhoto = (catIdx, photoIdx, field, value) => {
    const items = [...(data.categories || [])];
    const photos = [...(items[catIdx].photos || [])];
    photos[photoIdx] = { ...photos[photoIdx], [field]: value };
    items[catIdx] = { ...items[catIdx], photos };
    setData({ ...data, categories: items });
  };

  const removePhoto = (catIdx, photoIdx) => {
    const items = [...(data.categories || [])];
    items[catIdx] = {
      ...items[catIdx],
      photos: (items[catIdx].photos || []).filter((_, idx) => idx !== photoIdx),
    };
    setData({ ...data, categories: items });
  };

  return (
    <CMSLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Gallery</Typography>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving} sx={{ backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
      {saved && <Alert severity="success" sx={{ mb: 2 }}>Saved successfully!</Alert>}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Page Title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></Grid>
          <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Subtitle" value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} /></Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Categories</Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={addItem}>Add Category</Button>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, width: 60 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Link</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 40 }}>Photos</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 60 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data.categories || []).map((item, i) => (
                <Fragment key={item.id || i}>
                  <TableRow>
                    <TableCell>
                      <ImageCellDialog value={item.img} onChange={(url) => updateItem(i, "img", url)} />
                    </TableCell>
                    <TableCell>
                      <TextField fullWidth size="small" value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} placeholder="Title" />
                    </TableCell>
                    <TableCell>
                      <TextField fullWidth size="small" value={item.link} onChange={(e) => updateItem(i, "link", e.target.value)} placeholder="/gallery/..." />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => toggleExpand(i)} title="Manage Photos">
                        {expanded[i] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => removeItem(i)}><DeleteIcon fontSize="small" color="error" /></IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow key={`photos-${item.id || i}`}>
                    <TableCell colSpan={5} sx={{ p: 0 }}>
                      <Collapse in={expanded[i]}>
                        <Box sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <ImageIcon fontSize="small" color="primary" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Photos</Typography>
                            <Button size="small" startIcon={<AddIcon />} onClick={() => addPhoto(i)} sx={{ ml: "auto" }}>
                              Add Photo
                            </Button>
                          </Box>
                          {(item.photos || []).length === 0 ? (
                            <Typography variant="body2" sx={{ color: "#999", fontStyle: "italic" }}>No photos yet. Click &apos;Add Photo&apos; to add images.</Typography>
                          ) : (
                            <Grid container spacing={1}>
                              {(item.photos || []).map((photo, pIdx) => (
                                <Grid key={pIdx} size={{ xs: 6, sm: 4, md: 3 }}>
                                  <Box sx={{ border: "1px solid #ddd", borderRadius: 1, p: 1, backgroundColor: "#fff", position: "relative" }}>
                                    <ImageCellDialog
                                      value={photo.src}
                                      onChange={(url) => updatePhoto(i, pIdx, "src", url)}
                                    />
                                    <TextField
                                      fullWidth
                                      size="small"
                                      value={photo.alt || ""}
                                      onChange={(e) => updatePhoto(i, pIdx, "alt", e.target.value)}
                                      placeholder="Caption"
                                      sx={{ mt: 0.5 }}
                                    />
                                    <IconButton
                                      size="small"
                                      onClick={() => removePhoto(i, pIdx)}
                                      sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "rgba(255,255,255,0.8)" }}
                                    >
                                      <DeleteIcon fontSize="small" color="error" />
                                    </IconButton>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </CMSLayout>
  );
}
