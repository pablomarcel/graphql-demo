import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMoviesQuery } from '../queries/queriesMovies';

// components
import MovieDetails from './MovieDetails';

class MovieList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }
    displayMovies(){
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading movies...</div> );
        } else {
            return data.movies.map(movie => {
                return(
                    <li key={ movie.id } onClick={ (e) => this.setState({ selected: movie.id }) }>{ movie.title }</li>
                );
            })
        }
    }
    render(){
        return(
            <div>
                <ul id="movie-list">
                    { this.displayMovies() }
                </ul>
                <MovieDetails movieId={ this.state.selected } />
            </div>
        );
    }
}

// bind query to component
// access to the data that comes back from the query
// data stored in the props

export default graphql(getMoviesQuery)(MovieList);
