"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, Alert, Tabs, Tab, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CMSLayout from "../CMSLayout";
import ImageCellDialog from "../components/ImageCellDialog";

export default function StaffCMS() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/cms/staff").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }).then((res) => {
      if (res.success) setData(res.data);
    }).catch((err) => console.error("CMS Staff fetch error:", err.message));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/cms/staff", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!data) return null;

  const current = tab === 0 ? "technicalBranch" : "generalBranch";
  const updateMember = (i, field, value) => {
    const branch = { ...data[current] };
    branch.members = [...branch.members];
    branch.members[i] = { ...branch.members[i], [field]: value };
    setData({ ...data, [current]: branch });
  };
  const addMember = () => {
    const branch = { ...data[current] };
    branch.members = [...branch.members, { id: Date.now(), name: "", subject: "", phone: "", address: "", photo: "/images/principal.png" }];
    setData({ ...data, [current]: branch });
  };
  const removeMember = (i) => {
    const branch = { ...data[current] };
    branch.members = branch.members.filter((_, idx) => idx !== i);
    setData({ ...data, [current]: branch });
  };

  return (
    <CMSLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Staff</Typography>
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

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label={`Technical (${data.technicalBranch?.members?.length || 0})`} />
        <Tab label={`General (${data.generalBranch?.members?.length || 0})`} />
      </Tabs>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Branch Label" value={data[current]?.label} onChange={(e) => setData({ ...data, [current]: { ...data[current], label: e.target.value } })} size="small" /></Grid>
          <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Header Color" value={data[current]?.bgColor} onChange={(e) => setData({ ...data, [current]: { ...data[current], bgColor: e.target.value } })} size="small" /></Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Members</Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={addMember}>Add Member</Button>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, width: 60 }}>Photo</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 600, width: 60 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data[current]?.members || []).map((item, i) => (
                <TableRow key={item.id || i}>
                  <TableCell>
                    <ImageCellDialog value={item.photo} onChange={(url) => updateMember(i, "photo", url)} />
                  </TableCell>
                  <TableCell><TextField fullWidth size="small" value={item.name} onChange={(e) => updateMember(i, "name", e.target.value)} placeholder="Name" /></TableCell>
                  <TableCell><TextField fullWidth size="small" value={item.subject} onChange={(e) => updateMember(i, "subject", e.target.value)} placeholder="Subject" /></TableCell>
                  <TableCell><TextField fullWidth size="small" value={item.phone} onChange={(e) => updateMember(i, "phone", e.target.value)} placeholder="Phone" /></TableCell>
                  <TableCell><TextField fullWidth size="small" value={item.address} onChange={(e) => updateMember(i, "address", e.target.value)} placeholder="Address" /></TableCell>
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
