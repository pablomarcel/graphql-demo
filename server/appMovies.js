const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema_movies');
//const schema = require('./schema/schema_movies');
const { mongoose } = require('mongoose');
const cors = require('cors');

const appMovies = express();

// allow cross-origin requests
appMovies.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
// mongoose.connect('mongodb://ninja:test@ds161148.mlab.com:61148/graphql-ninja')

// mongodb+srv://candy-dev:nIcjQAp7LPdpzDhm@cluster0.xaqhzyx.mongodb.net/movie-database?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://candy-dev:nIcjQAp7LPdpzDhm@cluster0.xaqhzyx.mongodb.net/movie-database?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

// MongoDB atlas automatically sets database name as 'test'

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
