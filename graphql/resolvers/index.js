const usersResolver = require('./users');
const booksResolver = require('./books');

const rootResolver = {
    ...usersResolver,
    ...booksResolver
};

module.exports = rootResolver;