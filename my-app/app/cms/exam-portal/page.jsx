"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, Alert, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CMSLayout from "../CMSLayout";
import ImageCellDialog from "../components/ImageCellDialog";

export default function ExamPortalCMS() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/cms/exam-portal").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }).then((res) => {
      if (res.success) setData(res.data);
    }).catch((err) => console.error("CMS Exam Portal fetch error:", err.message));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/cms/exam-portal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!data) return null;

  const updateItem = (i, field, value) => {
    const items = [...(data.exams || [])];
    items[i] = { ...items[i], [field]: value };
    setData({ ...data, exams: items });
  };
  const addItem = () => setData({ ...data, exams: [...(data.exams || []), { id: Date.now(), title: "", img: "/images/principal.png", link: "/exam-portal/new" }] });
  const removeItem = (i) => setData({ ...data, exams: (data.exams || []).filter((_, idx) => idx !== i) });

  return (
    <CMSLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Exam Portal</Typography>
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
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Exams</Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={addItem}>Add Exam</Button>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, width: 60 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Link</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 60 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data.exams || []).map((item, i) => (
                <TableRow key={item.id || i}>
                  <TableCell>
                    <ImageCellDialog value={item.img} onChange={(url) => updateItem(i, "img", url)} />
                  </TableCell>
                  <TableCell>
                    <TextField fullWidth size="small" value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} placeholder="Title" />
                  </TableCell>
                  <TableCell>
                    <TextField fullWidth size="small" value={item.link} onChange={(e) => updateItem(i, "link", e.target.value)} placeholder="/exam-portal/..." />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => removeItem(i)}><DeleteIcon fontSize="small" color="error" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </CMSLayout>
  );
}
