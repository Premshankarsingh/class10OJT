"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, IconButton, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CMSLayout from "../CMSLayout";
import ImageUpload from "../components/ImageUpload";

export default function HomeCMS() {
  const [banner, setBanner] = useState(null);
  const [cards, setCards] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/cms/home-banner").then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }),
      fetch("/api/cms/message-cards").then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }),
    ]).then(([b, c]) => {
      if (b.success) setBanner(b.data);
      if (c.success) setCards(c.data);
    }).catch((err) => console.error("CMS Home fetch error:", err.message));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await Promise.all([
      fetch("/api/cms/home-banner", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(banner) }),
      fetch("/api/cms/message-cards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cards) }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!banner || !cards) return null;

  const updateSlide = (i, field, value) => {
    const slides = [...banner.images];
    slides[i] = { ...slides[i], [field]: value };
    setBanner({ ...banner, images: slides });
  };

  const addSlide = () => setBanner({ ...banner, images: [...banner.images, { id: Date.now(), src: "", alt: "Slide" }] });
  const removeSlide = (i) => setBanner({ ...banner, images: banner.images.filter((_, idx) => idx !== i) });

  const updateCard = (i, field, value) => {
    const c = [...cards];
    c[i] = { ...c[i], [field]: value };
    setCards(c);
  };
  const addCard = () => setCards([...cards, { id: Date.now(), title: "", img: "/images/principal.png", text: "", link: "/message/principal" }]);
  const removeCard = (i) => setCards(cards.filter((_, idx) => idx !== i));

  return (
    <CMSLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Home Page</Typography>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving} sx={{ backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
      {saved && <Alert severity="success" sx={{ mb: 2 }}>Saved successfully!</Alert>}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Banner Images</Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={addSlide}>Add Slide</Button>
        </Box>
        <Grid container spacing={2}>
          {(banner.images || []).map((slide, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Paper sx={{ p: 2, position: "relative" }}>
                <IconButton size="small" onClick={() => removeSlide(i)} sx={{ position: "absolute", top: 8, right: 8 }}>
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
                <ImageUpload value={slide.src} onChange={(url) => updateSlide(i, "src", url)} />
                <TextField fullWidth label="Alt Text" value={slide.alt} onChange={(e) => updateSlide(i, "alt", e.target.value)} sx={{ mt: 1 }} size="small" />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Message Cards</Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={addCard}>Add Card</Button>
        </Box>
        {cards.map((card, i) => (
          <Paper key={i} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{card.title || "New Card"}</Typography>
              <IconButton size="small" onClick={() => removeCard(i)}><DeleteIcon fontSize="small" color="error" /></IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <ImageUpload value={card.img} onChange={(url) => updateCard(i, "img", url)} />
              </Grid>
              <Grid size={{ xs: 12, sm: 8 }}>
                <TextField fullWidth label="Title" value={card.title} onChange={(e) => updateCard(i, "title", e.target.value)} sx={{ mb: 1 }} />
                <TextField fullWidth label="Preview Text" value={card.text} onChange={(e) => updateCard(i, "text", e.target.value)} multiline rows={2} sx={{ mb: 1 }} />
                <TextField fullWidth label="Link" value={card.link} onChange={(e) => updateCard(i, "link", e.target.value)} />
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Paper>
    </CMSLayout>
  );
}
