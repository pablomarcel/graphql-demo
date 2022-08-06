import { gql } from 'apollo-boost';

const getDirectorsQuery = gql`
    {
        directors {
            name
            id
        }
    }
`;

// these are the kind of queries done in GraphiQL

const getMoviesQuery = gql`
    {
        movies {
            title
            id
        }
    }
`;

const addMovieMutation = gql`
    mutation AddMovie($title: String!, $genre: String!, $directorId: ID!){
        addMovie(title: $title, genre: $genre, directorId: $directorId){
            title
            id
        }
    }
`;

const getMovieQuery = gql`
    query GetMovie($id: ID){
        movie(id: $id) {
            id
            title
            genre
            director {
                id
                name
                age
                movies {
                    title
                    id
                }
            }
        }
    }
`;

export { getDirectorsQuery, getMoviesQuery, addMovieMutation, getMovieQuery };
