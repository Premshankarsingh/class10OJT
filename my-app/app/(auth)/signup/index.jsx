import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as yep from "yup";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import LoginLayout from "@/layout/LoginLayout";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { postAPIHandler } from "src/ApiConfig/service";
const MainComponent = styled("Box")(({ theme }) => ({
  "& .signupMainBox": {
    height: "100%",
    position: "relative",
    zIndex: "999",
    overflowY: "auto",
    "& p": {
      fontWeight: "300",
    },
    "& .signupBox": {
      height: "initail",
      margin: "15px auto",
      maxWidth: " 95%",
      width: "487px",
      maxHeight: "100%",
      "& .mainBox": {
        marginTop: "50px",
      },
    },
    "& span": {
      color: "#000000DE",
      maxWidth: "400px",
      textDecoration: "underline",
    },
    "& .termBox": {
      "& p": {
        color: "#00000099",
        width: "100%",
        maxWidth: "350px",
        textAlign: "center",
      },
      "& span": {
        color: "#000000DE",
        maxWidth: "400px",
        textDecoration: "underline",
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
  "& .mainradioBox": {
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      alignItems: "center",
    },
    "& .radioBox": {
      border: "1px solid rgba(0, 0, 0, 0.25)",
      borderRadius: "50px",
      padding: "3px 10px 0px 21px",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "10px",
      },
      "& p": {
        marginRight: "25px",
        color: "#00000099 !important",
      },
    },
  },
}));
export default function SignUp() {
  const [value, setValue] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [gender, setGender] = useState("Male");
  const router = useRouter();
  const formInitialSchema = {
    email: "",
    fullName: "",
    phone: "",
    gender: "",
    countryCode: "",
  };
  const formValidationSchema = yep.object().shape({
    fullName: yep
      .string()
      .trim()
      .min(3, "Please enter atleast 3 characters.")
      .max(256, "You can enter only 256 characters.")
      .required("First name is required.")
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/g,
        "Please enter your first name."
      ),
    // lastName: yep
    //   .string()
    //   .trim()
    //   .min(3, "Please enter atleast 3 characters.")
    //   .max(256, "You can enter only 256 characters.")
    //   .required("Last name is required.")
    //   .matches(
    //     /^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/g,
    //     "Please enter your last name."
    //   ),

    email: yep
      .string()
      .trim()
      .email("Please enter valid email.")
      .required("Email address is required.")
      .max(256, "Should not exceeds 256 characters.")
      .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
    // phone: yep
    //   .string()
    //   .required("Please enter valid mobile number.")
    //   .max(13, "Should not exceeds 13 digits.")
    //   .min(7, "Must be minimum 7 digits."),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsUpdating(true);

      const response = await postAPIHandler({
        endPoint: "signUp",
        dataToSend: {
          email: values.email,
          fullName: values.fullName,
          mobileNumber: values.phone,
          gender: gender,
          countryCode: "91",
        },
      });

      if (response.data.responseCode === 200) {
        console.log("uygse", router);
        toast.success(response.data.responseMessage);
        // router.push({
        //   pathname: "/otp",
        //   search: "email",
        // });
        router.push({
          pathname: "/auth/otp",
          query: { email: values.email },
        });
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
      <Box className="signupMainBox displayCenter">
        <Box className="signupBox">
          <Paper className="mainBox" elevation={2}>
            <Box className="logoImage displayColumn">
              <img src="/images/loginLayout/realTime.jpg" />
              <Typography variant="h3">Real Time</Typography>
              <Typography variant="h2" color="primary">
                Create New Account
              </Typography>
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
                      <Typography variant="body2">
                        First Name
                        <label style={{ color: "#FE6A2D" }}>*</label>
                      </Typography>
                    </Box>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      placeholder="Enter your first name"
                      name="fullName"
                      value={values.fullName}
                      error={Boolean(touched.fullName && errors.fullName)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.fullName && errors.fullName}
                    </FormHelperText>
                  </Box>
                  {/* <Box>
                    <Box mt={2} mb={1}>
                      <Typography variant="body2">
                        Last Name
                        <label style={{ color: "#FE6A2D" }}>*</label>
                      </Typography>
                    </Box>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      placeholder="Enter your last name"
                      name="lastName"
                      value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.lastName && errors.lastName}
                    </FormHelperText>
                  </Box> */}
                  <Box>
                    <Box mt={2} mb={1}>
                      <Typography variant="body2">
                        Mobile Number
                        <label style={{ color: "#FE6A2D" }}>*</label>
                      </Typography>
                    </Box>
                    <FormControl fullWidth>
                      <PhoneInput
                        country={"in"}
                        placeholder="Enter your mobile number"
                        value={values.phone}
                        error={Boolean(touched.phone && errors.phone)}
                        onBlur={handleBlur}
                        onChange={(phone, e) => {
                          setFieldValue("phone", phone);
                        }}
                      />
                    </FormControl>
                    <FormHelperText error>
                      {touched.phone && errors.phone}
                    </FormHelperText>
                  </Box>
                  <Box>
                    <Box mt={2} mb={1}>
                      <Typography variant="body2">
                        Email&nbsp;
                        <label
                          style={{
                            color: "rgba(0, 0, 0, 0.60)",
                            fontFamily: "Gilroy-Light",
                          }}
                        >
                          (Optional)
                        </label>
                      </Typography>
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
                  <Box mt={2}>
                    <Typography mb={1} variant="body2">
                      Select Gender
                      <label style={{ color: "#FE6A2D" }}>*</label>
                    </Typography>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={gender}
                      onChange={(e) => {
                        console.log("iii1", e.target.value);
                        setGender(e.target.value);
                      }}
                     
                    >
                      <Box className="mainradioBox displaySpacebetween">
                        <Box className="radioBox displayStart">
                          <Typography variant="body2">Male</Typography>
                          <FormControlLabel
                            name="gender"
                            value="Male"
                            control={<Radio />}
                          />
                        </Box>
                        <Box className="radioBox displayStart">
                          <Typography variant="body2">Female</Typography>
                          <FormControlLabel
                            name="gender"
                            value="Female"
                            control={<Radio />}
                          />
                        </Box>
                        <Box className="radioBox displayStart">
                          <Typography variant="body2">Other</Typography>
                          <FormControlLabel
                            name="gender"
                            value="Other"
                            control={<Radio />}
                          />
                        </Box>
                      </Box>
                    </RadioGroup>
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
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      SIGNUP
                    </Button>
                  </Box>
                  <Box className="displayCenter" mt={3} mb={3}>
                    <Typography
                      variant="body2"
                      style={{ color: "rgba(0, 0, 0, 0.40)" }}
                    >
                      Don’t have an account?
                      <span
                        onClick={() => {
                          router.push("/auth/login");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        &nbsp;Login
                      </span>
                    </Typography>
                  </Box>
                  {/* <Box className="displayCenter" mt={3} mb={3}>
                    <Typography
                      variant="body2"
                      style={{ color: "rgba(0, 0, 0, 0.40)" }}
                    >
                      Need help with account?
                    </Typography>
                  </Box> */}
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Box>
    </MainComponent>
  );
}

SignUp.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};
