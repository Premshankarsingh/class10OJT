"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, Alert, Tabs, Tab, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CMSLayout from "../CMSLayout";
import ImageUpload from "../components/ImageUpload";

export default function MessagesCMS() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const tabs = ["principal", "chairman", "coordinator", "vicePrincipal"];
  const defaultEntry = { photo: "", title: "", name: "", address: "", borderColor: "#F43755", message: "" };

  useEffect(() => {
    fetch("/api/cms/messages").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }).then((res) => {
      if (res.success) {
        const initialized = { ...res.data };
        tabs.forEach(t => {
          if (!initialized[t]) initialized[t] = { ...defaultEntry };
        });
        setData(initialized);
      }
    }).catch((err) => console.error("CMS Messages fetch error:", err.message));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/cms/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const current = tabs[tab];

  if (!data || !data[current]) return null;

  const updateField = (field, value) => setData({ ...data, [current]: { ...data[current], [field]: value } });

  return (
    <CMSLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Messages</Typography>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving} sx={{ backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
      {saved && <Alert severity="success" sx={{ mb: 2 }}>Saved successfully!</Alert>}

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Principal" />
        <Tab label="Chairman" />
        <Tab label="Coordinator" />
        <Tab label="Vice Principal" />
      </Tabs>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, sm: 4 }}>
            <ImageUpload value={data[current].photo} onChange={(url) => updateField("photo", url)} />
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Title" value={data[current].title} onChange={(e) => updateField("title", e.target.value)} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Name" value={data[current].name} onChange={(e) => updateField("name", e.target.value)} /></Grid>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="Address" value={data[current].address} onChange={(e) => updateField("address", e.target.value)} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Border Color</InputLabel>
                  <Select label="Border Color" value={data[current].borderColor} onChange={(e) => updateField("borderColor", e.target.value)}>
                    <MenuItem value="#F43755">Red</MenuItem>
                    <MenuItem value="#2C235A">Purple</MenuItem>
                    <MenuItem value="#27ae60">Green</MenuItem>
                    <MenuItem value="#0984e3">Blue</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <TextField fullWidth label="Message" value={data[current].message} onChange={(e) => updateField("message", e.target.value)} multiline rows={8} sx={{ mt: 3 }} />
      </Paper>
    </CMSLayout>
  );
}
