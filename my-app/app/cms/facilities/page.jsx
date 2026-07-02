"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, Alert, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CMSLayout from "../CMSLayout";
import ImageCellDialog from "../components/ImageCellDialog";

export default function FacilitiesCMS() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/cms/facilities").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }).then((res) => {
      if (res.success) setData({ facilities: [], ...res.data });
    }).catch((err) => console.error("CMS Facilities fetch error:", err.message));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/cms/facilities", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!data) return null;

  const updateItem = (i, field, value) => {
    const items = [...data.facilities];
    items[i] = { ...items[i], [field]: value };
    setData({ ...data, facilities: items });
  };
  const addItem = () => setData({ ...data, facilities: [...data.facilities, { id: Date.now(), title: "", description: "", image: "/images/principal.png" }] });
  const removeItem = (i) => setData({ ...data, facilities: data.facilities.filter((_, idx) => idx !== i) });

  return (
    <CMSLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Facilities</Typography>
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
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Facilities List</Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={addItem}>Add Facility</Button>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, width: 60 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 60 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.facilities.map((item, i) => (
                <TableRow key={item.id || i}>
                  <TableCell>
                    <ImageCellDialog value={item.image} onChange={(url) => updateItem(i, "image", url)} />
                  </TableCell>
                  <TableCell>
                    <TextField fullWidth size="small" value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} placeholder="Title" />
                  </TableCell>
                  <TableCell>
                    <TextField fullWidth size="small" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="Description" multiline />
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
