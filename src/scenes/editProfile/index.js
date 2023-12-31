import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { TextField, Button, Box, useMediaQuery, useTheme } from "@mui/material";
import { setLogin } from "state";

const editProfileSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
});

const EditProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = useRef(useSelector((state) => state.token));
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    occupation: "",
  });
  const dispach = useDispatch();

  const [userStr, setUserStr] = useState(JSON.stringify(initialValues));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API}/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token.current}` },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setInitialValues(userData);
          setUserStr(JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId, userStr]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_API}/profile/${userId}`,
        {
          method: "PATCH", // Use PATCH here
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.current}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        if (userData.user._id === userId) {
          dispach(setLogin({ user: userData.user, token: token.current }));
        }
        navigate(`/profile/${userId}`);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editProfileSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Form>
            <Box display="grid" gap="20px">
              <Field
                as={TextField}
                name="firstName"
                label="First Name"
                fullWidth
              />
              <Field
                as={TextField}
                name="lastName"
                label="Last Name"
                fullWidth
              />
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                fullWidth
              />
              <Field
                as={TextField}
                name="location"
                label="Location"
                fullWidth
              />
              <Field
                as={TextField}
                name="occupation"
                label="Occupation"
                fullWidth
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting}
              >
                Save Changes
              </Button>
            </Box>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default EditProfile;
