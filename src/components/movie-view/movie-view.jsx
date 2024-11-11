import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);


    return (
        <div>
            <div>
                <img className="w-100" src={movie.imagePath} alt={movie.title} /> {/* Adjusted to use imagePath */}
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.name}</span> {/* Access director's name */}
                <div>{movie.director.bio}</div> {/* Access director's bio */}
                <div>Born: {new Date(movie.director.birthdate).toLocaleDateString()}</div> {/* Format birthdate */}
                {movie.director.deathdate && (
                    <div>Died: {new Date(movie.director.deathdate).toLocaleDateString()}</div> // Display deathdate if available
                )}
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span> {/* Access genre name */}
                <div>{movie.genre.description}</div> {/* Access genre description */}
            </div>

            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};
