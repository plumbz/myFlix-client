import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([

        {
            id: 1,
            title: 'Twilight',
            director: 'Catherine Hardwicke',
            image: 'https://en.wikipedia.org/wiki/Twilight_(2008_film)#/media/File:Twilight_(2008_film)_poster.jpg'
        },
        {
            id: 2,
            title: 'Princess Diaries',
            director: 'Garry Marshall',
            image: 'https://en.wikipedia.org/wiki/The_Princess_Diaries_(film)#/media/File:Princess_diaries_ver1.jpg'
        }
    ]);



    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
}