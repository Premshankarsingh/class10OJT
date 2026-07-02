"use client";
import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Typography, TextField, Alert, InputAdornment, IconButton } from "@mui/material";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import HomeLayout from "@/app/layouts/HomeLayout/layout";

const MainComponent = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f0f2f5",
  paddingTop: "80px",
});

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recovered, setRecovered] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecovered(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setAlertMsg({ type: "error", message: "Password must be at least 8 characters." });
      return;
    }
    if (password !== confirmPassword) {
      setAlertMsg({ type: "error", message: "Passwords do not match." });
      return;
    }
    setAlertMsg({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setAlertMsg({ type: "success", message: "Password updated successfully! Redirecting..." });
        setTimeout(() => router.push("/auth/login"), 1500);
      } else {
        setAlertMsg({ type: "error", message: data.error || "Failed to update password." });
      }
    } catch {
      setAlertMsg({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!recovered) {
    return (
      <HomeLayout>
        <MainComponent>
          <Box sx={{ width: "100%", maxWidth: 420, px: 2 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 2, color: "#666" }}>
                Invalid or expired reset link.
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#F43755", cursor: "pointer", fontWeight: 600 }}
                onClick={() => router.push("/auth/forgot-password")}
              >
                Request a new reset link
              </Typography>
            </Paper>
          </Box>
        </MainComponent>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <MainComponent>
        <Box sx={{ width: "100%", maxWidth: 420, px: 2 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" align="center" sx={{ mb: 1, fontWeight: 700, color: "#1a1a2e" }}>
              Reset Password
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 3, color: "#666" }}>
              Enter your new password
            </Typography>

            {alertMsg.message && (
              <Alert severity={alertMsg.type} sx={{ mb: 2 }}>{alertMsg.message}</Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box mb={1}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>New Password</Typography>
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter new password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <HiEye /> : <HiEyeOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box mt={2} mb={1}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Confirm Password</Typography>
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Confirm new password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                        {showConfirm ? <HiEye /> : <HiEyeOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ py: 1.2, fontSize: "16px", fontWeight: 600, backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}
                >
                  {isSubmitting ? "Updating..." : "Reset Password"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </MainComponent>
    </HomeLayout>
  );
}
