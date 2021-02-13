import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const initialState = {
	title: '',
	director: '',
	metascore: '',
	stars: [],
};

export default UpdatMovieForm = () => {
	const [movieData, setMovieData] = useState({ initialState });
	const { id } = useParams();

	useEffect(() => {
		axios.get(`https://localhost:5000/api/movies/${id}`)
			.then((res) => {
				setMovieData(res.data);
			})
			.catch((err) =>
				console.error('ERROR PULLING MOVIE DATA', err.message)
			);
	}, []);

	return (
		<div>
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
			</form>
		</div>
	);
};
