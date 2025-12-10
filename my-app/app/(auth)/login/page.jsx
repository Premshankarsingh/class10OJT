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
} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as yep from "yup";
import { Form, Formik } from "formik";
import LoginLayout from "../../layouts/LoginLayout/layout";
import { useState } from "react";

const MainComponent = styled(Box)(({ theme }) => ({
  "& .loginmainBox": {
    height: "100%",
    position: "relative",
    zIndex: "999",
    overflowY: "auto",
     marginTop:"100px",
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
  const [checked, setChecked] = useState(false);
  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };
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
            <Paper className="mainBox" elevation={1}>
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
                    <Box className="displaySpacebetween">
                      <Checkbox
                        checked={checked}
                        onChange={handleCheckChange}
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                      <Typography variant="body1">Forgot Password</Typography>
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
                      <Box>
                        <Typography variant="body2" align="center">
                          or
                        </Typography>
                        <Typography variant="h6" style={{ color: "#2DA8ED" }}>
                          Create New Account
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="displayCenter" mt={3} mb={3}>
                      <Box>
                        <Typography variant="body2" align="center">
                          Login With Social Accounts
                        </Typography>
                        <Box className="displayCenter">
                          <IconButton>
                            <img
                              src="/images/login/googleIcons.svg"
                              alt="search"
                              width="350px"
                            />
                          </IconButton>
                          <IconButton>
                            <img
                              src="/images/login/facebookIcon.svg"
                              alt="search"
                              width="350px"
                            />
                          </IconButton>
                        </Box>
                      </Box>
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
