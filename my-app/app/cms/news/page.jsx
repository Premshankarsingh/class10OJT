"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, IconButton, Alert, Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CMSLayout from "../CMSLayout";

export default function NewsCMS() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/cms/news").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }).then((res) => {
      if (res.success) {
        const items = Array.isArray(res.data) ? res.data : [];
        setData({
          technical: items.filter(n => n.category === "technical"),
          general: items.filter(n => n.category !== "technical"),
        });
      }
    }).catch((err) => console.error("CMS News fetch error:", err.message));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/cms/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!data) return null;

  const current = tab === 0 ? "technical" : "general";
  const updateItem = (i, field, value) => {
    const items = data[current] ? [...data[current]] : [];
    items[i] = { ...items[i], [field]: value };
    setData({ ...data, [current]: items });
  };
  const addItem = () => {
    setData({ ...data, [current]: [...(data[current] || []), { id: Date.now(), slug: "", subject: "", date: "", title: "", content: "", images: ["/images/principal.png"], author: "" }] });
  };
  const removeItem = (i) => setData({ ...data, [current]: (data[current] || []).filter((_, idx) => idx !== i) });

  return (
    <CMSLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>News</Typography>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving} sx={{ backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
      {saved && <Alert severity="success" sx={{ mb: 2 }}>Saved successfully!</Alert>}

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label={`Technical (${data.technical?.length || 0})`} />
        <Tab label={`General (${data.general?.length || 0})`} />
      </Tabs>

      <Box sx={{ mb: 2 }}>
        <Button size="small" startIcon={<AddIcon />} onClick={addItem}>Add Article</Button>
      </Box>

      {data[current]?.map((item, i) => (
        <Paper key={i} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.title || "New Article"}</Typography>
            <IconButton size="small" onClick={() => removeItem(i)}><DeleteIcon fontSize="small" color="error" /></IconButton>
          </Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Slug" value={item.slug} onChange={(e) => updateItem(i, "slug", e.target.value)} size="small" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Subject" value={item.subject} onChange={(e) => updateItem(i, "subject", e.target.value)} size="small" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Date" value={item.date} onChange={(e) => updateItem(i, "date", e.target.value)} size="small" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Author" value={item.author} onChange={(e) => updateItem(i, "author", e.target.value)} size="small" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Title" value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Content" value={item.content} onChange={(e) => updateItem(i, "content", e.target.value)} multiline rows={4} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Image Path (e.g. /images/science.png)" value={item.images?.[0] || ""} onChange={(e) => updateItem(i, "images", [e.target.value])} size="small" />
              {item.images?.[0] && <img src={item.images[0]} alt="preview" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px", marginTop: "8px" }} />}
            </Grid>
          </Grid>
        </Paper>
      ))}
    </CMSLayout>
  );
}
