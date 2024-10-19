import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([

        {
            id: 1,
            title: 'Twilight',
            description: 'vampire inlove with human',
            director: 'Catherine Hardwicke',
            genre: 'Romantic',
            image: 'https://en.wikipedia.org/wiki/Twilight_(2008_film)#/media/File:Twilight_(2008_film)_poster.jpg'
        },
        {
            id: 2,
            title: 'Princess Diaries',
            description: 'an ordenary teenager who later found out she was indeed a princess',
            director: 'Garry Marshall',
            genre: 'comedy',
            image: 'https://en.wikipedia.org/wiki/The_Princess_Diaries_(film)#/media/File:Princess_diaries_ver1.jpg'
        },
        {
            id: 3,
            title: "The Matrix",
            description: "A computer hacker learns the truth about reality and joins a rebellion against machines.",
            director: 'Wachowskis',
            genre: 'Actio',
            image: "/images/thematrix.jpg",
        },
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