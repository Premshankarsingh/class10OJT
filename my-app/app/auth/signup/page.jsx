"use client";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { HiEye, HiEyeOff } from "react-icons/hi";
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

export default function SignUp() {
  const router = useRouter();
  const { signup } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ type: "", message: "" });

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      newErrors.password = "Password must contain uppercase, lowercase, number, and special character.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
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
      await signup({ fullName, email, phone, gender, password });
      setSignupSuccess(true);
    } catch (error) {
      setAlertMsg({ type: "error", message: error.message || "Signup failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (signupSuccess) {
    return (
      <HomeLayout>
        <MainComponent>
          <Box sx={{ width: "100%", maxWidth: 420, px: 2 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h4" sx={{ mb: 2, color: "#4CAF50", fontWeight: 600 }}>
                Signup Request Submitted!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: "#666" }}>
                Your account is pending admin approval. You will receive an email notification once your account is activated.
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}
                onClick={() => router.push("/auth/login")}
              >
                Go to Login
              </Button>
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
              Create Account
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 3, color: "#666" }}>
              Signup requires admin approval
            </Typography>

            {alertMsg.message && (
              <Alert severity={alertMsg.type} sx={{ mb: 2 }}>
                {alertMsg.message}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box>
                <Box mb={1}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Full Name <span style={{ color: "#FE6A2D" }}>*</span>
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder="Enter your full name"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={Boolean(errors.fullName)}
                />
                <FormHelperText error>{errors.fullName}</FormHelperText>
              </Box>

              <Box mt={2}>
                <Box mb={1}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Email <span style={{ color: "#FE6A2D" }}>*</span>
                  </Typography>
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
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Phone Number <span style={{ color: "#FE6A2D" }}>*</span>
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={Boolean(errors.phone)}
                />
                <FormHelperText error>{errors.phone}</FormHelperText>
              </Box>

              <Box mt={2}>
                <Typography mb={1} variant="body2" sx={{ fontWeight: 500 }}>
                  Select Gender <span style={{ color: "#FE6A2D" }}>*</span>
                </Typography>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </Box>
                </RadioGroup>
              </Box>

              <Box mt={2}>
                <Box mb={1}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Password <span style={{ color: "#FE6A2D" }}>*</span>
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Create password"
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

              <Box mt={2}>
                <Box mb={1}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Confirm Password <span style={{ color: "#FE6A2D" }}>*</span>
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Confirm password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={Boolean(errors.confirmPassword)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                          {showConfirmPassword ? <HiEye /> : <HiEyeOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText error>{errors.confirmPassword}</FormHelperText>
              </Box>

              <Box sx={{ textAlign: "center", mt: 3, mb: 2 }}>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  By signing up, you agree to our <span style={{ color: "#F43755", cursor: "pointer" }}>Terms</span> and <span style={{ color: "#F43755", cursor: "pointer" }}>Privacy Policy</span>
                </Typography>
              </Box>

              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ py: 1.2, fontSize: "16px", fontWeight: 600, backgroundColor: "#F43755", "&:hover": { backgroundColor: "#d32f2f" } }}
                >
                  {isSubmitting ? "Submitting..." : "SIGNUP"}
                </Button>
              </Box>

              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Already have an account?
                  <Typography
                    component="span"
                    sx={{ color: "#F43755", cursor: "pointer", fontWeight: 600, ml: 0.5 }}
                    onClick={() => router.push("/auth/login")}
                  >
                    Login
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
