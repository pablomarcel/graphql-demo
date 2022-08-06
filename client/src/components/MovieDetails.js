import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMovieQuery } from '../queries/queriesMovies';

class MovieDetails extends Component {
    displayMovieDetails(){
        const { movie } = this.props.data;
        if(movie){
            return(
                <div>
                    <h2>{ movie.title }</h2>
                    <p>{ movie.genre }</p>
                    <p>{ movie.director.name }</p>
                    <p>All movies by this director:</p>
                    <ul id="details-list">
                        { movie.director.movies.map(item => {
                            return <li key={item.id}>{ item.title }</li>
                        })}
                    </ul>
                </div>
            );
        } else {
            return( <div>No Movie selected...</div> );
        }
    }
    render(){
        return(
            <div id="movie-details">
                { this.displayMovieDetails() }
            </div>
        );
    }
}

export default graphql(getMovieQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.movieId
            }
        }
    }
})(MovieDetails);
