import styled from "@emotion/styled";
import { Box, Button, FormHelperText, Paper, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as yep from "yup";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import LoginLayout from "@/layout/LoginLayout";
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
    "& .termBox": {
      "& p": {
        color: "#00000099",
        width: "100%",
        maxWidth: "300px",
        textAlign: "center",
        cursor: "pointer",
      },
    },
    "& .logoImage": {
      width: "100%",
      backgroundSize: "cover !important",
      backgroundRepeat: "no-repeat !important",
      objectFit: "cover !important",
      "& h3": {
        marginTop: "8px",
        fontWeight: "400",
        color: "#000000DE",
      },
      "& h2": {
        color: "#000000DE",
        marginTop: "20px",
        marginBottom: "20px",
        fontWeight: "400",
      },
    },
  },
}));
export default function Login() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const router = useRouter();
  const formInitialSchema = {
    email: "",
  };
  const formValidationSchema = yep.object().shape({
    email: yep
      .string()
      .email("Please enter valid email.")
      .max(256, "Should not exceeds 256 characters.")
      .required("Email is required."),
  });
  const handleFormSubmit = async (values) => {
    try {
      setIsUpdating(true);

      const response = await postAPIHandler({
        endPoint: "userLogin",
        dataToSend: {
          email: values.email,
          // deviceToken: "string",
          // deviceType: "string",
        },
      });

      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        // history.push({
        //   pathname: "/otp",
        //   search: "email",
        // });
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
    }
  };

  return (
    <MainComponent>
      <Box className="loginmainBox displayCenter">
        <Box className="loginBox">
          <Paper className="mainBox" elevation={2}>
            <Box className="logoImage displayColumn">
              <img src="/images/loginLayout/realTime.jpg" />
              <Typography variant="h3">Real Time</Typography>
              <Typography variant="h2">Login</Typography>
            </Box>
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
                setFieldValue,
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
                  <Box mt={3} mb={3} className="termBox displayColumn">
                    <Typography variant="body2">
                      By logging in, you agree to Real Time
                    </Typography>
                    <Typography variant="body2">
                      <span
                        onClick={() => {
                          window.open("/static/terms");
                        }}
                      >
                        Terms and Policy
                      </span>
                      &nbsp;and&nbsp;
                      <span
                        onClick={() => {
                          window.open("/static/privacy");
                        }}
                      >
                        Help and Support
                      </span>
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
                          router.push("/auth/signup");
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
  );
}

Login.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
