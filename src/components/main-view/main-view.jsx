import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://movie-flix19-efb939257bd3.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,                                  // Unique identifier
                        title: movie.title,                             // Title of the movie
                        description: movie.description,                 // Description of the movie
                        imagePath: movie.imagePath,                     // Path to the movie image
                        featured: movie.featured,                       // Featured status
                        genre: {
                            name: movie.genre.name,                    // Genre name
                            description: movie.genre.description       // Genre description
                        },
                        director: {
                            name: movie.director.name,                  // Director's name
                            bio: movie.director.bio,                    // Director's bio
                            birthdate: movie.director.birthdate,      // Director's birthdate
                            deathdate: movie.director.deathdate        // Director's deathdate
                        }
                    };
                });

                setMovies(moviesFromApi);
            });
    }, [token]);


    return (
        <Container>
            <BrowserRouter>
                <Row className="justify-content-md-center">
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <SignupView />
                                        </Col>
                                    )}
                                </>

                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <LoginView onLoggedIn={(user) => setUser(user)} />
                                        </Col>
                                    )}
                                </>

                            }
                        />
                        <Route
                            path="/movies/:movieId"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ) : (
                                        <Col md={8}>
                                            <MovieView movies={movies} />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ) : (
                                        <>
                                            {movies.map((movie) => (
                                                <Col className="mb-4" key={movie.id} md={3}>
                                                    <MovieCard movie={movie} />
                                                </Col>
                                            ))}
                                        </>
                                    )}
                                </>
                            }
                        />
                    </Routes>
                </Row>
            </BrowserRouter>
        </Container>
    );
};