const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema_movies');
const { mongoose } = require('mongoose');
const cors = require('cors');
const appMovies = express();

// allow cross-origin requests
appMovies.use(cors());

// make sure to replace my db string & creds with your own

mongoose.connect('mongodb+srv://candy-dev:nIcjQAp7LPdpzDhm@cluster0.xaqhzyx.mongodb.net/movie-database?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

// bind express with graphql
// request to /graphql
// graphql middleware

appMovies.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

appMovies.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
