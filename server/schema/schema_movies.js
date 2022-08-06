const graphql = require('graphql');
const Movie = require('../models/movie');
const Director = require('../models/director');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: ( ) => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        // Type Relations
        director: {
            type: DirectorType,
            resolve(parent, args){
                // director model is used to interact with the director Collection
                return Director.findById(parent.directorId);
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return Movie.find({ directorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            // expect the user to pass arguments
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db
                return Movie.findById(args.id);
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db
                return Director.findById(args.id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                // code to get data from db
                return Movie.find({});
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args){
                // code to get data from db
                return Director.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                // create local variable director
                let director = new Director({
                    name: args.name,
                    age: args.age
                });
                // update database
                return director.save();
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                // pay attention to NonNull
                title: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                // create local variable movie
                let movie = new Movie({
                    title: args.title,
                    genre: args.genre,
                    directorId: args.directorId
                });
                // update database
                return movie.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
