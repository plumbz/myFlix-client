// UserProfile.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { UserInfo } from "./user-info";

export const UserProfile = ({ user }) => {
    const [userData, setUserData] = useState(user); // Use the passed `user` prop directly
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Optionally, fetch the user data again in case it's updated after login.
    useEffect(() => {
        if (!user) return; // Don't fetch if there's no user

        setLoading(false);
        // If you need to fetch more data (e.g., to get updated info)
        // fetch("https://movie-flix19-efb939257bd3.herokuapp.com/users", {
        //     headers: {
        //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);
        //         setUserData(data); // Update user data
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         setError(err.message);
        //         setLoading(false);
        //     });
    }, [user]);

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

    // Render the profile data
    return (
        <Container>
            <Row className="justify-content-center mt-4">
                <Col md={6}>
                    <h2>User Profile</h2>
                    <div>
                        <UserInfo name={userData.username} email={userData.email} />
                        {userData.favorites && userData.favorites.length > 0 && (
                            <div>
                                <h5>Favorites:</h5>
                                <ul>
                                    {userData.favorites.map((movie, index) => (
                                        <li key={index}>{movie}</li> // Assuming the favorites are movie names/IDs
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
