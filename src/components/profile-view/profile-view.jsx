import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardGroup, Spinner, Alert, Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { UserInfo } from "./user-info";
import "./profile-view.scss";

export const UserProfile = ({ user, movies, handleLogout, handleRemoveUpdate }) => {
    const [userData, setUserData] = useState(user);
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
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const favoriteMovies = movies.filter((movie) =>
        userData.favorites.includes(movie.id)
    );



    const handleRemoveFromFavorites = (movieId, movieTitle) => {
        if (!userData) {
            return;
        }

        const updatedFavorites = userData.favorites.filter(id => id !== movieId);
        const updatedUser = { ...userData, favorites: updatedFavorites };
        // setUserData(updatedUser);
        // localStorage.setItem("user", JSON.stringify(updatedUser));

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
                handleRemoveUpdate();
                setUserData(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;
        if (!email || !password) {
            setError("Email and Password are mandatory.");
            return;
        }

        setLoading(true);
        setError(null);

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
                setSuccess(true);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error updating user info:", error);
                setError(error.message);
                setLoading(false);
            });
    };

    const handleUnregister = () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }

        setLoading(true);

        fetch(`https://movie-flix19-efb939257bd3.herokuapp.com/users/${user.username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to unregister.");
                }
                if (response.status === 204 || response.bodyUsed === false) {
                    return null;
                }
                return response.json();
            })
            .then((data) => {
                handleLogout();
                setRedirect(true);
                setLoading(false);
                setConfirmDelete(false);
            })
            .catch((error) => {
                console.error("Error unregistering user:", error);
                setError(error.message);
                setLoading(false);
                setConfirmDelete(false);
            });
    };

    if (redirect) {
        return <Navigate to="/signup" />;
    }

    return (
        <Container>
            <Row className="justify-content-center mt-4">
                {/* User Info and Update Form Row */}
                <Col md={6}>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <UserInfo name={userData.username} email={userData.email} />
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
                <Col md={6}>
                    <CardGroup>
                        <Card>
                            <Card.Body>
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
                                        />
                                    </Form.Group>

                                    <Button variant="secondary" type="submit" disabled={loading}>
                                        {loading ? "Updating..." : "Update Profile"}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>

            {/* Favorite Movies Section */}
            <Row className="justify-content-center mt-4">
                <Col md={12}>
                    <h5 style={{ color: 'white' }}>Favorite Movies:</h5>
                    <Row>
                        {favoriteMovies.length > 0 ? (
                            favoriteMovies.map((movie) => {
                                return (
                                    <Col md={4} sm={6} key={movie.id} className="mb-3">
                                        <Card>
                                            <Card.Img className="movie-card-image" variant="top" src={movie.imagePath} />
                                            <Card.Body>
                                                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                                                    <h5>{movie.title}</h5>
                                                </Link>
                                                <Button
                                                    variant="secondary"
                                                    className="mt-2"
                                                    onClick={() => handleRemoveFromFavorites(movie.id, movie.title)}
                                                >
                                                    Remove from Favorite
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                        ) : (
                            <p>No favorite movies found.</p>
                        )}
                    </Row>
                </Col>
            </Row>

            {/* Unregister Button */}
            <Row className="justify-content-center mt-3">
                <Col md={4}>
                    <Button
                        variant="danger"
                        onClick={handleUnregister}
                    >
                        {confirmDelete ? "Confirm Unregister" : "Unregister Account"}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};
