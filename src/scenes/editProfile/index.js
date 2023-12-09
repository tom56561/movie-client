import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Box } from '@mui/material';

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
    const token = useSelector((state) => state.token);
    const [initialValues, setInitialValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        occupation: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/profile/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.ok) {
                    const userData = await response.json();
                    setInitialValues(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId, token]);

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const response = await fetch(`http://localhost:3001/profile/${userId}`, {
                method: 'PATCH', // Use PATCH here
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                navigate(`/profile/${userId}`);
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={editProfileSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ isSubmitting }) => (
                <Form>
                    <Box display="grid" gap="20px">
                        <Field as={TextField} name="firstName" label="First Name" fullWidth />
                        <Field as={TextField} name="lastName" label="Last Name" fullWidth />
                        <Field as={TextField} name="email" type="email" label="Email" fullWidth />
                        <Field as={TextField} name="location" label="Location" fullWidth />
                        <Field as={TextField} name="occupation" label="Occupation" fullWidth />
                        <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                            Save Changes
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default EditProfile;
