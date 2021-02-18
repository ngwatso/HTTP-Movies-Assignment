import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

// ?? Set initialState
const initialState = {
	id: Date.now(),
	title: '',
	director: '',
	metascore: '',
	stars: [],
};

const UpdateMovieForm = (props) => {
	const [movieData, setMovieData] = useState(initialState);
	const { id } = useParams();
	const { push } = useHistory();

	// ?? useEffect, axios
	useEffect(() => {
		axios.get(`https://localhost:5000/api/movies/${id}`)
			.then((res) => {
				setMovieData(res.data);
			})
			.catch((err) =>
				console.error(
					`unable to get movie: ${movieData.title}`,
					err.message
				)
			);
	}, [id]);

	const handleChanges = (e) => {
		e.persist();
		setMovieData({
			...movieData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newMovieData = {
			...movieData,
			title: movieData.title,
			director: movieData.director,
			metascore: movieData.metascore,
			stars: movieData.stars.split(', '),
		};

		axios.put(`http://localhost:5000/api/movies/${id}`, newMovieData)
			.then((res) => {
				props.getMovieList();
				push('/');
			})
			.catch((err) =>
				console.error(`error saving movie: ${movieData.title}`)
			);
	};

	return (
		<div>
			<h4>Edit Movie</h4>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					name="title"
					placeholder="Movie Title"
					onChange={handleChanges}
					value={movieData.title}
				/>

				<input
					type="text"
					name="director"
					name="director"
					placeholder="Director"
					onChange={handleChanges}
					value={movieData.director}
				/>

				<input
					type="text"
					name="metascore"
					name="metascore"
					placeholder="Metascore"
					onChange={handleChanges}
					value={movieData.metascore}
				/>

				<input
					type="text"
					name="stars"
					name="stars"
					placeholder="Stars"
					onChange={handleChanges}
					value={movieData.stars}
				/>

				<button>Save Movie</button>
			</form>
		</div>
	);
};

export default UpdateMovieForm;
