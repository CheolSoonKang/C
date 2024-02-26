import { useState, useEffect } from 'react';
import Movie from './Movie';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const loadingFetch = async () => {
        const res = await (
            await fetch(
                `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
            )
        ).json();
        setMovies(res.data.movies);
        setLoading(false);
        console.log(res);
    };

    useEffect(() => {
        loadingFetch();
    }, []);

    return (
        <div className="App">
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <ul>
                    {movies.map((movie) => {
                        return (
                            <Movie
                                key={movie.id}
                                coverImg={movie.medium_cover_image}
                                title={movie.title}
                                summary={movie.summary}
                                genres={movie.genres}
                            />
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
export default Home;
