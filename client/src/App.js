import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import axios from 'axios';
import UpdateMovieForm from './components/UpdateMovieForm';
import AddMovie from './components/AddMovie';

const App = () => {
	const [savedList, setSavedList] = useState([]);
	const [movieList, setMovieList] = useState([]);

	const getMovieList = () => {
		axios.get('http://localhost:5000/api/movies')
			.then((res) => setMovieList(res.data))
			.catch((err) => console.log(err.response));
	};

	const addToSavedList = (movie) => {
		setSavedList([...savedList, movie]);
	};

	useEffect(() => {
		getMovieList();
	}, [getMovieList]);

	return (
		<>
			<SavedList list={savedList} />

			<Route exact path="/">
				<MovieList movies={movieList} getMovieList={getMovieList} />
			</Route>
			<Route
				path="/update-movie/:id"
				render={() => (
					<UpdateMovieForm
						movieList={movieList}
						setMovieList={setMovieList}
						getMovieList={getMovieList}
					/>
				)}
			/>
			<Route
				path="/add-movie"
				render={() => (
					<AddMovie
						movieList={movieList}
						setMovieList={setMovieList}
						getMovieList={getMovieList}
					/>
				)}
			/>

			<Route path="/movies/:id">
				<Movie
					addToSavedList={addToSavedList}
					getMovieList={getMovieList}
				/>
			</Route>
		</>
	);
};

export default App;
