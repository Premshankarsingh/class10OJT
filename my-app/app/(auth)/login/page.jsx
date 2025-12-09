"use client";
import { styled } from "@mui/material/styles";
import { HiEye, HiEyeOff } from "react-icons/hi";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as yep from "yup";
import { Form, Formik } from "formik";
import LoginLayout from "../../layouts/LoginLayout/layout";
import { useState } from "react";

const MainComponent = styled("Box")(({ theme }) => ({
  "& .loginmainBox": {
    height: "100%",
    position: "relative",
    zIndex: "999",
    overflowY: "auto",
    "& p": {
      fontWeight: "300",
    },
    "& span": {
      color: "#000000DE",
      maxWidth: "400px",
      textDecoration: "underline",
    },
    "& .loginBox": {
      height: "initail",
      margin: "15px auto",
      maxWidth: "95%",
      width: "487px",
      maxHeight: "100%",
    },
  
  },
}));
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const formInitialSchema = {
    email: "",
    password: "",
  };
  const formValidationSchema = yep.object().shape({
    email: yep
      .string()
      .email("Please enter valid email.")
      .max(256, "Should not exceeds 256 characters.")
      .required("Email is required."),
    password: yep
      .string()
      .trim()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Please enter valid password."
      )
      .required("Password is required.")
      .max(16, "Password should not exceeds 16 characters.")
      .min(8, "Password must be minimum of 8 characters."),
  });

  return (
    <LoginLayout>
      <MainComponent>
        <Box className="loginmainBox displayCenter">
          <Box className="loginBox">
            <Paper className="mainBox" elevation={2}>
              <Formik
                initialValues={formInitialSchema}
                validationSchema={formValidationSchema}
                onSubmit={(values) => handleFormSubmit(values)}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  touched,
                  values,
                }) => (
                  <Form>
                    <Box>
                      <Box mt={2} mb={1}>
                        <Typography variant="body2">Email or Mobile</Typography>
                      </Box>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="email"
                        placeholder="Enter your email address"
                        name="email"
                        value={values.email}
                        error={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.email && errors.email}
                      </FormHelperText>
                    </Box>
                    <Box>
                      <Box mt={2} mb={1}>
                        <Typography variant="body2">Email or Mobile</Typography>
                      </Box>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={values.password}
                        error={Boolean(touched.password && errors.password)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                <Box>
                                  {showPassword ? (
                                    <HiEye className="iconClass1" />
                                  ) : (
                                    <HiEyeOff className="iconClass1" />
                                  )}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error>
                        {touched.password && errors.password}
                      </FormHelperText>
                    </Box>
                    <Box className="displaySpaceBetween">
                      <Typography
                        variant="body2"
                        style={{
                          color: "#EC1F24",
                          cursor: "pointer",
                          fontWeight: "500",
                        }}
                        onClick={() => history.push("/forget-password")}
                      >
                        Forgot Password?
                      </Typography>
                    </Box>
                    <Box mt={2} mb={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Login
                      </Button>
                    </Box>
                    <Box className="displayCenter" mt={3} mb={3}>
                      <Typography
                        variant="body2"
                        style={{ color: "rgba(0, 0, 0, 0.40)" }}
                      >
                        Don’t have an account?&nbsp;
                        <span
                          onClick={() => {
                            // router.push("/auth/signup");
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Sign Up
                        </span>
                      </Typography>
                    </Box>
                    <Box className="displayCenter" mt={3} mb={3}>
                      <Typography
                        variant="body2"
                        style={{ color: "rgba(0, 0, 0, 0.40)" }}
                      >
                        Need help with account?
                      </Typography>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Box>
        </Box>
      </MainComponent>
    </LoginLayout>
  );
}
