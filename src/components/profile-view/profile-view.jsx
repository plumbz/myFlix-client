import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

export const UserProfile = () => {
    const [userData, setUserData] = useState(null); // Holds the user data
    const [loading, setLoading] = useState(true); // Loading state for the API request
    const [error, setError] = useState(null); // Error state if the request fails
    const navigate = useNavigate(); // For navigation (in case we need to redirect)

    // Fetch user data when the component mounts
    useEffect(() => {
        const token = localStorage.getItem("token"); // Assuming the token is saved in localStorage

        if (!token) {
            // Redirect to login if there's no token
            navigate("/login");
            return;
        }
        console.log("hey");
        fetch("https://movie-flix19-efb939257bd3.herokuapp.com/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Send token in Authorization header
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data); // Save the user data
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((err) => {
                setError(err.message); // Set error if the fetch fails
                setLoading(false); // Set loading to false
            });
    }, [navigate]); // Empty dependency array to run only once on mount

    // Render loading spinner or error message
    if (loading) {
        return (
            <Container className="text-center">
                <Spinner animation="border" variant="primary" />
                <p>Loading profile...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    // Render the profile if userData is successfully fetched
    return (
        <Container>
            <Row className="justify-content-center mt-4">
                <Col md={6}>
                    <h2>User Profile</h2>
                    <div>
                        <h4>Name: {userData.name}</h4>
                        <p>Email: {userData.email}</p>
                        <p>Bio: {userData.bio}</p>
                        <p>Birthday: {new Date(userData.birthdate).toLocaleDateString()}</p>
                        {/* Render other user details here */}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
