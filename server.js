const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const isAuthorized = require('./middleware/auth');

const dotenv = require('dotenv');

const expressWinston = require('express-winston');
const winston = require('winston');

const app = express();

app.use(express.json());

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if ( req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();

});

app.use(isAuthorized);

// Log http requests to server for debugging...
// app.use(expressWinston.logger({
//     transports: [
//       new winston.transports.Console()
//     ],
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json()
//     )
//   }));

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));

app.get('/', (req, res, err) => {
    res.send('Try heading for /graphql.... that should help!');
})

dotenv.config();

const port = process.env.PORT || 3000;

//
// Old connection string for mLab
//
// mongoose.connect(
//     "mongodb://" + 
//     process.env.MONGO_USER + ":" + 
//     process.env.MONGO_PASSWORD + 
//     "@ds057538.mlab.com:57538/bookz-graphql",
//     {useNewUrlParser: true}
//     ).then(() => {
//         app.listen(port);
//         console.log(`app listening on port ${port}`)
//     })
//     .catch(err => {
//         console.log(err);
//     });  

//
// New connection string for mongodb.com
//
mongoose.connect(
    "mongodb+srv://" + 
    process.env.MONGO_USER + ":" + 
    process.env.MONGO_PASSWORD + 
    "@bookz-graphql.4khyl.mongodb.net/bookz-graphql?retryWrites=true&w=majority",
    {useNewUrlParser: true}
    ).then(() => {
        app.listen(port);
        console.log(`app listening on port ${port}`)
    })
    .catch(err => {
        console.log(err);
    });  


