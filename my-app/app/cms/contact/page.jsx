"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, Alert, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CMSLayout from "../CMSLayout";

export default function ContactCMS() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/cms/contact").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }).then((res) => {
      if (res.success) setData(res.data);
    }).catch((err) => console.error("CMS Contact fetch error:", err.message));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/cms/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!data) return null;

  const updateContactInfo = (field, value) => setData({ ...data, contactInfo: { ...data.contactInfo, [field]: value } });
  const updateMember = (i, field, value) => {
    const items = [...(data.staffMembers || [])];
    items[i] = { ...items[i], [field]: value };
    setData({ ...data, staffMembers: items });
  };
  const addMember = () => setData({ ...data, staffMembers: [...(data.staffMembers || []), { name: "", role: "", email: "", phone: "" }] });
  const removeMember = (i) => setData({ ...data, staffMembers: (data.staffMembers || []).filter((_, idx) => idx !== i) });

  return (
    <CMSLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Contact</Typography>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving} sx={{ backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
      {saved && <Alert severity="success" sx={{ mb: 2 }}>Saved successfully!</Alert>}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Page Header</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></Grid>
          <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Subtitle" value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} /></Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Contact Information</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}><TextField fullWidth label="Header" value={data.contactInfo?.header} onChange={(e) => updateContactInfo("header", e.target.value)} /></Grid>
          <Grid size={{ xs: 12 }}><TextField fullWidth label="Subtitle" value={data.contactInfo?.subtitle} onChange={(e) => updateContactInfo("subtitle", e.target.value)} /></Grid>
          <Grid size={{ xs: 12 }}><TextField fullWidth label="Address" value={data.contactInfo?.address} onChange={(e) => updateContactInfo("address", e.target.value)} /></Grid>
          <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Phone" value={data.contactInfo?.phone} onChange={(e) => updateContactInfo("phone", e.target.value)} multiline rows={2} /></Grid>
          <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Email" value={data.contactInfo?.email} onChange={(e) => updateContactInfo("email", e.target.value)} /></Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Staff Contact Cards</Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={addMember}>Add Staff</Button>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 60 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data.staffMembers || []).map((item, i) => (
                <TableRow key={i}>
                  <TableCell><TextField fullWidth size="small" value={item.name} onChange={(e) => updateMember(i, "name", e.target.value)} placeholder="Name" /></TableCell>
                  <TableCell><TextField fullWidth size="small" value={item.role} onChange={(e) => updateMember(i, "role", e.target.value)} placeholder="Role" /></TableCell>
                  <TableCell><TextField fullWidth size="small" value={item.email} onChange={(e) => updateMember(i, "email", e.target.value)} placeholder="Email" /></TableCell>
                  <TableCell><TextField fullWidth size="small" value={item.phone} onChange={(e) => updateMember(i, "phone", e.target.value)} placeholder="Phone" /></TableCell>
                  <TableCell><IconButton size="small" onClick={() => removeMember(i)}><DeleteIcon fontSize="small" color="error" /></IconButton></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </CMSLayout>
  );
}
