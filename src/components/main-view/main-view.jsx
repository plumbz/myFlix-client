import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { UserProfile } from "../profile-view/profile-view";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [triggerMe, setTriggerMe] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setTriggerMe(false);
        if (!token) return; // Don't fetch if there's no user
        fetch(`https://movie-flix19-efb939257bd3.herokuapp.com/users`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        })
            .then((users) => {
                // Find and return the user object matching the username
                const loggedInUser = users.find(u => u.username === user.username);
                setUser(loggedInUser);
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                if (!loggedInUser) {
                    throw new Error('User not found');
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                throw error;
            });
    }, [triggerMe]);

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
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Update search query state
    };
    // Filter movies based on search query (title or genre)
    const filteredMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.genre.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleRemoveUpdate = () => {
        setTriggerMe(true);

    };
    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token"); // Remove the token from local storage (if stored there)
        localStorage.removeItem("user"); // Remove the user from local storage (if stored there)
    };
    const handleRemoveFromFavorites = (movie) => {
        if (!user) {
            return;
        }

        const updatedFavorites = user.favorites.filter(id => id !== movie._id);
        const updatedUser = { ...user, favorites: updatedFavorites };
        // setUserData(updatedUser);
        // localStorage.setItem("user", JSON.stringify(updatedUser));

        fetch(`https://movie-flix19-efb939257bd3.herokuapp.com/users/${user.username}/favorites/${encodeURIComponent(movie.title)}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                handleRemoveUpdate();
                localStorage.setItem("user", JSON.stringify(updatedUser));
            })
            .catch((error) => {
                console.error("Error updating favorites:", error);
            });
    };

    const handleAddToFavorites = (movie) => {
        if (!user) return; // Ensure the user is logged in

        // Prevent adding a movie that's already in the favorites list
        if (user.favorites.includes(movie.id)) {
            console.log("Movie is already in favorites.");
            return;
        }
        const updatedFavorites = [...user.favorites, movie.id];

        // Update the user locally first
        const updatedUser = { ...user, favorites: updatedFavorites };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        // URL encode the movie title
        const encodedMovieTitle = encodeURIComponent(movie.title);
        // Send the updated favorites list to the backend
        fetch(`https://movie-flix19-efb939257bd3.herokuapp.com/users/${user.username}/favorites/${encodedMovieTitle}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ favorites: updatedFavorites }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update favorites on the server.");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Favorites updated:", data);
            })
            .catch((error) => {
                console.error("Error updating favorites:", error);
                // Optionally, revert the local state change if the update fails
                const revertedFavorites = user.favorites;
                setUser({ ...user, favorites: revertedFavorites });
                localStorage.setItem("user", JSON.stringify(user));
            });
    };
    return (
        <Container>
            <BrowserRouter>
                <NavigationBar user={user} onLoggedOut={handleLogout} /> {/* Render NavigationBar here */}
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
                                            <LoginView onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }} />
                                        </Col>
                                    )}
                                </>

                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : (
                                        <Col md={8}>
                                            <UserProfile user={user} movies={movies} handleLogout={handleLogout} onRemoveFromFavorites={handleRemoveFromFavorites} /> {/* Pass movies data to UserProfile */}
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
                                            <MovieView movies={movies} user={user} onRemoveFromFavorites={handleRemoveFromFavorites} onAddToFavorites={handleAddToFavorites} />
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
                                            {/* New Row for Search Input */}
                                            <Row className="justify-content-end mb-3">
                                                <Col xs={12} sm={4} md={2}>
                                                    <input
                                                        type="text"
                                                        placeholder="Search by title or genre"
                                                        value={searchQuery}
                                                        onChange={handleSearchChange} // Update the search query state
                                                        style={{
                                                            width: "150%",
                                                            padding: "8px",
                                                            fontSize: "16px",
                                                        }}

                                                    />

                                                </Col>
                                            </Row>

                                            {/* Display filtered movies */}
                                            {filteredMovies.length > 0 ? (
                                                filteredMovies.map((movie) => (
                                                    <Col className="mb-4" key={movie.id} md={3}>
                                                        <MovieCard user={user} onRemoveFromFavorites={handleRemoveFromFavorites} movie={movie} onAddToFavorites={handleAddToFavorites} />
                                                    </Col>
                                                ))
                                            ) : (
                                                <Col>No movies found matching your search</Col>
                                            )}
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