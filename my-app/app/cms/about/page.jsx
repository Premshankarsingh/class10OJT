"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, Alert, Tabs, Tab, IconButton, Select, MenuItem, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, FormControlLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CMSLayout from "../CMSLayout";
import ImageUpload from "../components/ImageUpload";
import ImageCellDialog from "../components/ImageCellDialog";

export default function AboutCMS() {
  const [history, setHistory] = useState(null);
  const [today, setToday] = useState(null);
  const [committeesData, setCommitteesData] = useState(null);
  const [selectedCommittee, setSelectedCommittee] = useState("");
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/cms/about-history").then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }),
      fetch("/api/cms/about-today").then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }),
      fetch("/api/cms/about-committees").then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }),
    ]).then(([h, t, c]) => {
      if (h.success) setHistory(h.data);
      if (t.success) setToday(t.data);
      if (c.success && c.data) {
        setCommitteesData(c.data);
        const keys = Object.keys(c.data);
        if (keys.length > 0) setSelectedCommittee(keys[0]);
      }
    }).catch((err) => console.error("CMS About fetch error:", err.message));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const promises = [
      fetch("/api/cms/about-history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(history) }),
      fetch("/api/cms/about-today", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(today) }),
    ];
    if (committeesData) {
      promises.push(
        fetch("/api/cms/about-committees", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(committeesData) })
      );
    }
    await Promise.all(promises);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!history || !today) return null;

  const updateHistoryField = (field, value) => setHistory({ ...history, [field]: value });
  const updateTodayField = (field, value) => setToday({ ...today, [field]: value });

  const updatePrincipal = (era, i, field, value) => {
    const key = era === "gurukul" ? "gurukulPrincipals" : "modernPrincipals";
    const list = [...history[key]];
    list[i] = { ...list[i], [field]: value };
    setHistory({ ...history, [key]: list });
  };

  const committee = selectedCommittee && committeesData ? committeesData[selectedCommittee] : null;
  const updateCommitteeMeta = (field, value) => {
    if (!committee) return;
    setCommitteesData({ ...committeesData, [selectedCommittee]: { ...committee, [field]: value } });
  };
  const updateCommitteeMember = (i, field, value) => {
    if (!committee) return;
    const members = [...(committee.members || [])];
    members[i] = { ...members[i], [field]: value };
    setCommitteesData({ ...committeesData, [selectedCommittee]: { ...committee, members } });
  };
  const addCommitteeMember = () => {
    if (!committee) return;
    const members = [...(committee.members || []), { id: Date.now(), name: "", position: "", phone: "", address: "", photo: "/images/principal.png" }];
    setCommitteesData({ ...committeesData, [selectedCommittee]: { ...committee, members } });
  };
  const removeCommitteeMember = (i) => {
    if (!committee) return;
    const members = committee.members.filter((_, idx) => idx !== i);
    setCommitteesData({ ...committeesData, [selectedCommittee]: { ...committee, members } });
  };

  return (
    <CMSLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>About Pages</Typography>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving} sx={{ backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
      {saved && <Alert severity="success" sx={{ mb: 2 }}>Saved successfully!</Alert>}

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="History" />
        <Tab label="School Today" />
        <Tab label={`Committees (${committeesData ? Object.keys(committeesData).length : 0})`} />
      </Tabs>

      {tab === 0 && (
        <>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Page Header</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Title" value={history.title} onChange={(e) => updateHistoryField("title", e.target.value)} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Subtitle" value={history.subtitle} onChange={(e) => updateHistoryField("subtitle", e.target.value)} />
              </Grid>
            </Grid>
          </Paper>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Journey Text</Typography>
            <TextField fullWidth label="Journey Text" value={history.journeyText} onChange={(e) => updateHistoryField("journeyText", e.target.value)} multiline rows={6} />
          </Paper>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Gurukul Era Principals</Typography>
            {history.gurukulPrincipals.map((p, i) => (
              <Paper key={i} sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 3 }}><TextField fullWidth label="Name" value={p.name} onChange={(e) => updatePrincipal("gurukul", i, "name", e.target.value)} size="small" /></Grid>
                  <Grid size={{ xs: 12, sm: 3 }}><TextField fullWidth label="Years" value={p.years} onChange={(e) => updatePrincipal("gurukul", i, "years", e.target.value)} size="small" /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Address" value={p.address} onChange={(e) => updatePrincipal("gurukul", i, "address", e.target.value)} size="small" /></Grid>
                </Grid>
              </Paper>
            ))}
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Modern Era Principals</Typography>
            {history.modernPrincipals.map((p, i) => (
              <Paper key={i} sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 3 }}><TextField fullWidth label="Name" value={p.name} onChange={(e) => updatePrincipal("modern", i, "name", e.target.value)} size="small" /></Grid>
                  <Grid size={{ xs: 12, sm: 3 }}><TextField fullWidth label="Years" value={p.years} onChange={(e) => updatePrincipal("modern", i, "years", e.target.value)} size="small" /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Address" value={p.address} onChange={(e) => updatePrincipal("modern", i, "address", e.target.value)} size="small" /></Grid>
                </Grid>
              </Paper>
            ))}
          </Paper>
        </>
      )}

      {tab === 1 && (
        <>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Page Header</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Title" value={today.title} onChange={(e) => updateTodayField("title", e.target.value)} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Subtitle" value={today.subtitle} onChange={(e) => updateTodayField("subtitle", e.target.value)} /></Grid>
            </Grid>
          </Paper>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Description</Typography>
            <TextField fullWidth value={today.description} onChange={(e) => updateTodayField("description", e.target.value)} multiline rows={6} />
          </Paper>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Principal Info</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <ImageUpload value={today.principal?.photo} onChange={(url) => updateTodayField("principal", { ...today.principal, photo: url })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 8 }}>
                <TextField fullWidth label="Name" value={today.principal?.name} onChange={(e) => updateTodayField("principal", { ...today.principal, name: e.target.value })} sx={{ mb: 1 }} />
                <TextField fullWidth label="Description" value={today.principal?.description} onChange={(e) => updateTodayField("principal", { ...today.principal, description: e.target.value })} multiline rows={3} />
              </Grid>
            </Grid>
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Vision / Mission / Achievements</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="Vision" value={today.vision} onChange={(e) => updateTodayField("vision", e.target.value)} multiline rows={3} /></Grid>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="Mission" value={today.mission} onChange={(e) => updateTodayField("mission", e.target.value)} multiline rows={3} /></Grid>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="Achievements" value={today.achievements} onChange={(e) => updateTodayField("achievements", e.target.value)} multiline rows={4} /></Grid>
            </Grid>
          </Paper>
        </>
      )}

      {tab === 2 && committeesData && (
        <>
          <Paper sx={{ p: 3, mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Select Committee</InputLabel>
              <Select value={selectedCommittee} label="Select Committee" onChange={(e) => setSelectedCommittee(e.target.value)}>
                {Object.entries(committeesData).map(([key, val]) => (
                  <MenuItem key={key} value={key}>{val.name || key}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>

          {committee && (
            <>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Committee Details</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Name" value={committee.name} onChange={(e) => updateCommitteeMeta("name", e.target.value)} /></Grid>
                  <Grid size={{ xs: 12, sm: 3 }}><TextField fullWidth label="Color" value={committee.color} onChange={(e) => updateCommitteeMeta("color", e.target.value)} placeholder="#000000" /></Grid>
                  <Grid size={{ xs: 12, sm: 3 }}><TextField fullWidth label="Icon Name" value={committee.icon} onChange={(e) => updateCommitteeMeta("icon", e.target.value)} placeholder="Groups" /></Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel control={<Checkbox checked={!!committee.showPhone} onChange={(e) => updateCommitteeMeta("showPhone", e.target.checked)} />} label="Show Phone Numbers" />
                  </Grid>
                </Grid>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Members</Typography>
                  <Button size="small" startIcon={<AddIcon />} onClick={addCommitteeMember}>Add Member</Button>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, width: 60 }}>Photo</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                        {committee.showPhone && <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>}
                        <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                        <TableCell sx={{ fontWeight: 600, width: 60 }}></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(committee.members || []).map((item, i) => (
                        <TableRow key={item.id || i}>
                          <TableCell>
                            <ImageCellDialog value={item.photo} onChange={(url) => updateCommitteeMember(i, "photo", url)} />
                          </TableCell>
                          <TableCell><TextField fullWidth size="small" value={item.name} onChange={(e) => updateCommitteeMember(i, "name", e.target.value)} placeholder="Name" /></TableCell>
                          <TableCell><TextField fullWidth size="small" value={item.position} onChange={(e) => updateCommitteeMember(i, "position", e.target.value)} placeholder="Position" /></TableCell>
                          {committee.showPhone && <TableCell><TextField fullWidth size="small" value={item.phone || ""} onChange={(e) => updateCommitteeMember(i, "phone", e.target.value)} placeholder="Phone" /></TableCell>}
                          <TableCell><TextField fullWidth size="small" value={item.address} onChange={(e) => updateCommitteeMember(i, "address", e.target.value)} placeholder="Address" /></TableCell>
                          <TableCell><IconButton size="small" onClick={() => removeCommitteeMember(i)}><DeleteIcon fontSize="small" color="error" /></IconButton></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </>
          )}
        </>
      )}
    </CMSLayout>
  );
}
