import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (

        <Card>
            <Card.Img variant="top" src={movie.imagePath} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
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
    onMovieClick: PropTypes.func.isRequired
};