"use client";
import { styled } from "@mui/material/styles";
import { HiEye, HiEyeOff } from "react-icons/hi";
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import HomeLayout from "@/app/layouts/HomeLayout/layout";

const MainComponent = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f0f2f5",
  paddingTop: "80px",
}));

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ type: "", message: "" });

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setAlertMsg({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const data = await login(email, password);
      setAlertMsg({ type: "success", message: "Login successful! Redirecting..." });
      setTimeout(() => {
        router.push(data.data.user.role === "admin" ? "/admin/dashboard" : "/");
      }, 1000);
    } catch (error) {
      setAlertMsg({ type: "error", message: error.message || "Login failed. Please try again." });
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
              Welcome Back
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 3, color: "#666" }}>
              Sign in to your account
            </Typography>

            {alertMsg.message && (
              <Alert severity={alertMsg.type} sx={{ mb: 2 }}>
                {alertMsg.message}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box>
                <Box mb={1}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Email</Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                />
                <FormHelperText error>{errors.email}</FormHelperText>
              </Box>
              <Box mt={2}>
                <Box mb={1}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Password</Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(errors.password)}
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
                <FormHelperText error>{errors.password}</FormHelperText>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  inputProps={{ "aria-label": "remember me" }}
                />
                <Typography variant="body2" sx={{ cursor: "pointer", color: "#1976d2" }} onClick={() => router.push("/auth/forgot-password")}>Forgot Password?</Typography>
              </Box>
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ py: 1.2, fontSize: "16px", fontWeight: 600, backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </Box>
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Don&apos;t have an account?
                  <Typography
                    component="span"
                    sx={{ color: "#F43755", cursor: "pointer", fontWeight: 600, ml: 0.5 }}
                    onClick={() => router.push("/auth/signup")}
                  >
                    Create New Account
                  </Typography>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Box>
      </MainComponent>
    </HomeLayout>
  );
}
