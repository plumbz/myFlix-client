// UserProfile.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert, Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { UserInfo } from "./user-info";

export const UserProfile = ({ user, movies, handleLogout }) => {
    const [userData, setUserData] = useState(user); // Use the passed `user` prop directly
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        password: "",
        username: user.username || ""
    });
    const [success, setSuccess] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false); // For delete confirmation
    const [redirect, setRedirect] = useState(false); // State to handle redirection

    // Filter favorite movies from the movies prop
    const favoriteMovies = movies.filter((movie) =>
        userData.favorites.includes(movie.id)
    );

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

    const handleRemoveFromFavorites = (movieId, movieTitle) => {
        if (!userData) {
            return;
        }


        // Remove the movieId from the user's favorite list
        const updatedFavorites = userData.favorites.filter(id => id !== movieId);

        // Update the user locally
        const updatedUser = { ...userData, favorites: updatedFavorites };
        setUserData(updatedUser);

        // Save the updated user data in localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Make the DELETE request to remove the movie from the backend favorites list
        fetch(`https://movie-flix19-efb939257bd3.herokuapp.com/users/${userData.username}/favorites/${encodeURIComponent(movieTitle)}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Favorites updated:", data);
            })
            .catch((error) => {
                console.error("Error updating favorites:", error);
            });
    };
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

    // Handle form field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;
        if (!email || !password) {
            setError("Email and Password are mandatory.");
            return;
        }

        setLoading(true);
        setError(null); // Clear any previous errors

        // Example API request to update user information (replace with your actual endpoint)
        fetch(`https://movie-flix19-efb939257bd3.herokuapp.com/users/${user.username}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update user info.");
                }
                return response.json();
            })
            .then((data) => {
                console.log("User info updated:", data);
                setSuccess(true);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error updating user info:", error);
                setError(error.message);
                setLoading(false);
            });
    };
    // Handle unregister (delete) user
    const handleUnregister = () => {
        if (!confirmDelete) {
            setConfirmDelete(true); // Ask for confirmation
            return;
        }

        setLoading(true);

        // Make the DELETE request to unregister the user
        fetch(`https://movie-flix19-efb939257bd3.herokuapp.com/users/${user.username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error("Failed to unregister.");
                }
                // If the response is empty or not JSON, no need to parse it
                if (response.status === 204 || response.bodyUsed === false) {
                    return null; // No content to parse
                }
                return response.json();
            })
            .then((data) => {
                console.log("User unregistered:", data);
                // Call your handleLogout function to clear the user and token
                handleLogout(); // Reusing your existing logout function
                // Set redirect state to true
                setRedirect(true);
                setLoading(false);
                setConfirmDelete(false); // Reset confirmation
            })
            .catch((error) => {
                console.error("Error unregistering user:", error);
                setError(error.message);
                setLoading(false);
                setConfirmDelete(false); // Reset confirmation in case of error
            });
    };
    if (redirect) {
        // Redirect to the home page after successful unregistration
        return <Navigate to="/signup" />;
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
                                <h5>Favorite Movies:</h5>
                                <Row>
                                    {favoriteMovies.length > 0 ? (
                                        favoriteMovies.map((movie) => {
                                            return (
                                                <div key={movie.id}>
                                                    <img src={movie.imagePath} />
                                                    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                                                        <h4>{movie.title}</h4>
                                                    </Link>
                                                    <Button
                                                        variant="primary"
                                                        className="mt-2"
                                                        onClick={() => handleRemoveFromFavorites(movie.id, movie.title)}
                                                    >
                                                        Remove from Favorite
                                                    </Button>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <p>No favorite movies found.</p>
                                    )}
                                </Row>
                            </div>
                        )}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? "Updating..." : "Update Profile"}
                            </Button>
                        </Form>
                        {/* Unregister Button */}
                        <Button
                            variant="danger"
                            className="mt-3"
                            onClick={handleUnregister}
                        >
                            {confirmDelete ? "Confirm Unregister" : "Unregister Account"}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
