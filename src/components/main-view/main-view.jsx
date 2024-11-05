import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
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
                console.log(data);
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
        <Row className="justify-content-md-center">
            {!user ? (

                <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                    or
                    <SignupView />
                </Col>

            ) : selectedMovie ? (
                <Col md={8} style={{ border: "1px solid black" }}>
                    <MovieView
                        style={{ border: "1px solid green" }}
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}

                    <Col md={12} className="text-center mt-3"> {/* Center the button below movies */}
                        <Button
                            onClick={() => {
                                setUser(null);
                                setToken(null);
                                localStorage.clear();
                            }}
                            className="logout-button"
                        >
                            Logout
                        </Button>
                    </Col>

                </>
            )}
        </Row>
    );
};