"use client";
import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Typography, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HomeLayout from "@/app/layouts/HomeLayout/layout";

const MainComponent = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f0f2f5",
  paddingTop: "80px",
});

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [alertMsg, setAlertMsg] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setAlertMsg({ type: "error", message: "Please enter your email." });
      return;
    }
    setAlertMsg({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setAlertMsg({ type: "success", message: "Check your email for the reset link." });
      } else {
        setAlertMsg({ type: "error", message: data.error || "Something went wrong." });
      }
    } catch {
      setAlertMsg({ type: "error", message: "Failed to send reset email. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HomeLayout>
      <MainComponent>
        <Box sx={{ width: "100%", maxWidth: 420, px: 2 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" align="center" sx={{ mb: 1, fontWeight: 700, color: "#1a1a2e" }}>
              Forgot Password
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 3, color: "#666" }}>
              Enter your email and we&apos;ll send you a reset link
            </Typography>

            {alertMsg.message && (
              <Alert severity={alertMsg.type} sx={{ mb: 2 }}>{alertMsg.message}</Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box mb={1}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Email</Typography>
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ py: 1.2, fontSize: "16px", fontWeight: 600, backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </Box>
            </form>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography
                variant="body2"
                sx={{ color: "#F43755", cursor: "pointer", fontWeight: 600 }}
                onClick={() => router.push("/auth/login")}
              >
                Back to Login
              </Typography>
            </Box>
          </Paper>
        </Box>
      </MainComponent>
    </HomeLayout>
  );
}
