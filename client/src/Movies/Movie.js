import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props) {
	const [movie, setMovie] = useState(null);
	const { id } = useParams();
	const history = useHistory();

	const fetchMovie = (id) => {
		axios.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => setMovie(res.data))
			.catch((err) => console.log(err.response));
	};

	const saveMovie = () => {
		props.addToSavedList(movie);
	};

	useEffect(() => {
		fetchMovie(id);
	}, [id]);

	if (!movie) {
		return <div>Loading movie information...</div>;
	}

	const deleteMovie = (e) => {
		e.preventDefault();
		axios.delete(`http://localhost:5000/api/movies/${id}`)
			.then((res) => {
				props.getMovieList();
				history.push('/');
			})
			.catch((err) =>
				console.error(`unable to delete movie: ${movie.title}`)
			);
	};

	return (
		<div className="save-wrapper">
			<MovieCard movie={movie} />

			<div className="save-button" onClick={saveMovie}>
				Save
			</div>
			<button onClick={() => history.push(`/update-movie/${id}`)}>
				Edit Movie
			</button>
			<button onClick={deleteMovie}>Delete Movie</button>
		</div>
	);
}

export default Movie;
