import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Movie = ({ coverImg, title, summary, genres }) => {
    return (
        <div>
            <img src={coverImg} alt={title} />
            <Link to="/movie">
                <h2>{title}</h2>
            </Link>
            <p>{summary}</p>
            <ul>
                {genres.map((g) => {
                    return <li key={g}>{g}</li>;
                })}
            </ul>
        </div>
    );
};

Movie.propTypes = {
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movie;
