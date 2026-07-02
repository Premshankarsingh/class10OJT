"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CMSLayout from "../CMSLayout";

export default function UsersCMS() {
  const [users, setUsers] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetch("/api/cms/users").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }).then((res) => {
      if (res.success) setUsers(res.data);
    }).catch((err) => console.error("CMS Users fetch error:", err.message));
  }, []);

  const addEditor = async () => {
    if (!newEmail || !newName) return;
    await fetch("/api/cms/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "addEditor", email: newEmail, fullName: newName }),
    });
    const res = await fetch("/api/cms/users").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    });
    if (res.success) setUsers(res.data);
    setOpenDialog(false);
    setNewEmail("");
    setNewName("");
  };

  const removeEditor = async (id) => {
    await fetch("/api/cms/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "removeEditor", id }),
    });
    const res = await fetch("/api/cms/users").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    });
    if (res.success) setUsers(res.data);
  };

  if (!users) return null;

  return (
    <CMSLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>CMS Users</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>Add Editor</Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Admins <Chip label={users.admins?.length || 0} size="small" color="error" sx={{ ml: 1 }} />
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.admins?.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.fullName}</TableCell>
                  <TableCell>{u.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Editors <Chip label={users.editors?.length || 0} size="small" color="primary" sx={{ ml: 1 }} />
        </Typography>
        {users.editors?.length === 0 ? (
          <Typography variant="body2" sx={{ color: "#999" }}>No editors added yet.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.editors?.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.fullName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => removeEditor(u.id)}>
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add CMS Editor</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}><TextField fullWidth label="Full Name" value={newName} onChange={(e) => setNewName(e.target.value)} /></Grid>
            <Grid size={{ xs: 12 }}><TextField fullWidth label="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={addEditor} disabled={!newEmail || !newName}>Add</Button>
        </DialogActions>
      </Dialog>
    </CMSLayout>
  );
}
