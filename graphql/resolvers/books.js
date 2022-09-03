const mongoose = require('mongoose');

const Book = require('../../models/book.js');
const User = require('../../models/user.js');

const { transformBook } = require('./helpers')

module.exports = {

    books: async (args, req) => {
        if (!req.isAuthorized) {
            console.log("User not Authorized");
            throw new Error("Authorization failure");
        }
        console.log("User IS Authorized");
        try {
            const books = await Book.find();
            return books.map(book => {
                return transformBook(book);
            })
        } catch(err) {
             throw err;   
        }
    },
    getBook: async (args) => {
        try {
            const book = await Book.findById(args.id);
            return transformBook(book);
        } catch(err) {
             throw err;   
        }
    },
    createBook: async (args) => {
        try {
            const book = new Book({
                title: args.bookInput.title,
                description: args.bookInput.description,
                author: args.bookInput.author,
                publisher: args.bookInput.publisher,
                price: +args.bookInput.price,
                quantity: +args.bookInput.quantity,
                addedby: args.bookInput.userId
            })
            let createdBook;
            const result = await book.save();
            createdBook = transformBook(result);
            const addedbyUser = await User.findById(args.bookInput.userId);
            if (!addedbyUser) {
                throw new Error('User does NOT exist!')
            }
            addedbyUser.addedBooks.push(book);
            await addedbyUser.save();
            return createdBook;
        } catch (err) {
            throw err;
        }
    },
    updateBook: async (args, req ) => {
        try {
            const book = new Book({
                title: args.bookUpdate.title,
                description: args.bookUpdate.description,
                author: args.bookUpdate.author,
                publisher: args.bookUpdate.publisher,
                price: +args.bookUpdate.price,
                quantity: +args.bookUpdate.quantity
            })
            
            const result = await Book.updateOne( { _id: args.bookUpdate.id},
                {
                    $set:
                        {title: args.bookUpdate.title,
                         author: args.bookUpdate.author,
                         description: args.bookUpdate.description,
                         publisher: args.bookUpdate.publisher,
                         price: args.bookUpdate.price,
                         quantity: args.bookUpdate.quantity
                        }
                });
            return {_id: args.bookUpdate.id, title: args.bookUpdate.title};
        } catch (err) {
            throw err;
        }
    },
    deleteBook: async (args) => {
        try {
            const result = await Book.deleteOne( { _id: args.id} );
            console.log("deletedCount=" + result.deletedCount);
        } catch(err) {
             throw err;   
        }
    }
};