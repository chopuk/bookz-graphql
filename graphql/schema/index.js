const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Book {
    _id: ID!
    title: String!
    description: String!
    author: String!
    publisher: String!
    price: Float!
    quantity: Int!
    addedby: User!
}
input BookInput {
    title: String!
    description: String!
    author: String!
    publisher: String!
    price: Float!
    quantity: Int!
    userId: String!
}
input BookUpdate {
    id: String!
    title: String!
    description: String!
    author: String!
    publisher: String!
    price: Float!
    quantity: Int!
}
type BookDetails {
    _id: String!
    title: String!
}
type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String
    addedBooks: [Book!]
}
type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}
input UserInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
}
type RootQuery {
    books: [Book!]!
    getBook(id: String!): Book!
    getUser(id: String!): User!
    login(email: String!, password: String!): AuthData
}
type RootMutation {
    createBook(bookInput: BookInput): Book!
    updateBook(bookUpdate: BookUpdate): BookDetails!
    deleteBook(id: String!): Boolean
    createUser(userInput: UserInput): User!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)