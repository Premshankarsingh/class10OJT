"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { useAuth } from "@/src/context/AuthContext";
import HomeLayout from "@/app/layouts/HomeLayout/layout";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [pendingRes, approvedRes] = await Promise.all([
        fetch("/api/admin/approve?status=pending"),
        fetch("/api/admin/approve?status=approved"),
      ]);
      const pendingData = await pendingRes.json();
      const approvedData = await approvedRes.json();
      if (pendingData.success) setPendingUsers(pendingData.data);
      if (approvedData.success) setApprovedUsers(approvedData.data);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    loadData();
  }, [user, isAdmin, loadData]);

  const approveUser = async (userId) => {
    setActionLoading(userId);
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action: "approve" }),
      });
      const data = await res.json();
      if (data.success) {
        setPendingUsers((prev) => prev.filter((u) => u.id !== userId));
        setApprovedUsers((prev) => [...prev, data.data]);
      }
    } catch (err) {
      console.error("Approve failed:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const rejectUser = async (userId) => {
    setActionLoading(userId);
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action: "reject" }),
      });
      const data = await res.json();
      if (data.success) {
        setPendingUsers((prev) => prev.filter((u) => u.id !== userId));
      }
    } catch (err) {
      console.error("Reject failed:", err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <HomeLayout>
      <Box sx={{ pt: "80px", pb: 4, px: 4, maxWidth: "1200px", margin: "0 auto" }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Admin Dashboard
        </Typography>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Pending Approvals ({pendingUsers.length})
            </Typography>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : pendingUsers.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No pending signup requests.</Typography>
            ) : (
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Applied Date</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingUsers.map((pendingUser) => (
                      <TableRow key={pendingUser.id}>
                        <TableCell>{pendingUser.full_name}</TableCell>
                        <TableCell>{pendingUser.email}</TableCell>
                        <TableCell>{pendingUser.phone}</TableCell>
                        <TableCell>{pendingUser.gender}</TableCell>
                        <TableCell>{new Date(pendingUser.created_at).toLocaleDateString()}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="success"
                            onClick={() => approveUser(pendingUser.id)}
                            disabled={actionLoading === pendingUser.id}
                          >
                            {actionLoading === pendingUser.id ? <CircularProgress size={20} /> : <Check />}
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => rejectUser(pendingUser.id)}
                            disabled={actionLoading === pendingUser.id}
                          >
                            <Close />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Approved Users ({approvedUsers.length})
            </Typography>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : approvedUsers.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No approved users yet.</Typography>
            ) : (
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Approved Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {approvedUsers.map((approvedUser) => (
                      <TableRow key={approvedUser.id}>
                        <TableCell>{approvedUser.full_name}</TableCell>
                        <TableCell>{approvedUser.email}</TableCell>
                        <TableCell>{approvedUser.phone}</TableCell>
                        <TableCell>{approvedUser.gender}</TableCell>
                        <TableCell>
                          <Chip label="Approved" color="success" size="small" />
                        </TableCell>
                        <TableCell>{new Date(approvedUser.approved_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </HomeLayout>
  );
}
