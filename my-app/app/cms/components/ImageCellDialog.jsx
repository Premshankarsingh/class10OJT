"use client";
import { useState } from "react";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import ImageUpload from "./ImageUpload";

export default function ImageCellDialog({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {value ? (
          <Box
            onClick={() => setOpen(true)}
            sx={{ width: 50, height: 50, borderRadius: 1, overflow: "hidden", cursor: "pointer", border: "1px solid #ddd", flexShrink: 0 }}
          >
            <img src={value} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
        ) : (
          <Box
            onClick={() => setOpen(true)}
            sx={{ width: 50, height: 50, borderRadius: 1, border: "1px dashed #ddd", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, fontSize: 20, color: "#999" }}
          >
            +
          </Box>
        )}
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <ImageUpload value={value} onChange={(url) => { onChange(url); setOpen(false); }} />
        </DialogContent>
      </Dialog>
    </>
  );
}
