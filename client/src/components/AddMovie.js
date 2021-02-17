import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddMovie = (props) => {
	const history = useHistory();

	const initialState = {
		id: Date.now(),
		title: '',
		director: '',
		metascore: '',
		starts: [],
	};

	const [newMovie, setNewMovie] = useState(initialState);

	const handleChange = (e) => {
		e.persist();
		setNewMovie({
			...newMovie,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const movieWithStars = {
			...newMovie,
			stars: newMovie.stars.split(', '),
		};
		axios.post('http://localhost:5000/api/movies', movieWithStars).then(
			(res) => {
				props.getMovieList();
				history.push('/');
			}
		);
	};

	return (
		<div className="add-movie-container">
			<form onSubmit={handleSubmit}>
				<input
					htmlFor="title"
					id="title"
					name="title"
					type="text"
					placeholder="title"
					value={newMovie.title}
					onChange={handleChange}
				/>
				<input
					htmlFor="director"
					id="director"
					name="director"
					type="text"
					placeholder="director"
					value={newMovie.director}
					onChange={handleChange}
				/>
				<input
					htmlFor="metascore"
					id="metascore"
					name="metascore"
					type="number"
					placeholder="metascore"
					value={newMovie.metascore}
					onChange={handleChange}
				/>
				<input
					htmlFor="stars"
					id="stars"
					name="stars"
					type="text"
					placeholder="stars"
					value={newMovie.stars}
					onChange={handleChange}
				/>
				<button>Add Movie</button>
			</form>
		</div>
	);
};

export default AddMovie;
