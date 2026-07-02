"use client";
import { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function ImageUpload({ value, onChange, label = "Upload Image" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/cms/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setPreview(data.url);
        if (onChange) onChange(data.url);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <Box>
      {preview && (
        <Box sx={{ mb: 2, maxWidth: 200, maxHeight: 200, overflow: "hidden", borderRadius: 2 }}>
          <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
      )}
      <Box
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        sx={{
          border: `2px dashed ${dragActive ? "#F43755" : "#ddd"}`,
          borderRadius: 2,
          p: 3,
          textAlign: "center",
          backgroundColor: dragActive ? "#fff5f5" : "#fafafa",
          transition: "all 0.2s",
        }}
      >
        {uploading ? (
          <CircularProgress size={24} />
        ) : (
          <>
            <CloudUploadIcon sx={{ fontSize: 40, color: "#999", mb: 1 }} />
            <Typography variant="body2" sx={{ color: "#666" }}>
              {label}
            </Typography>
            <Button
              variant="contained"
              size="small"
              component="label"
              sx={{ mt: 1, backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}
            >
              Choose File
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            </Button>
            <Typography variant="caption" sx={{ display: "block", mt: 1, color: "#999" }}>
              or drag and drop
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
