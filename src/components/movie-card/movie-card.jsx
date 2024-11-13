import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onAddToFavorites }) => {
    const handleAddToFavorites = () => {
        onAddToFavorites(movie); // Trigger the function passed down to parent
    };
    return (

        <Card style={{ color: 'white' }} className="h-100">
            <Card.Img variant="top" src={movie.imagePath} className="movie-card-image" />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
                {/* Add to Favorites Button */}
                <Button
                    variant="primary"
                    className="mt-2"
                    onClick={handleAddToFavorites}
                >
                    Add to Favorite
                </Button>
            </Card.Body>
        </Card>
    );
};


// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            birthdate: PropTypes.string
        }).isRequired,
        featured: PropTypes.bool.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string
        }).isRequired,
        imagePath: PropTypes.string.isRequired
    }).isRequired,
    onAddToFavorites: PropTypes.func.isRequired // This prop will be a function passed from parent
};