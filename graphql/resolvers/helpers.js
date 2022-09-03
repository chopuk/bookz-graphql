const Book = require('../../models/book.js');
const User = require('../../models/user.js');

const user = async userId => {
    try {
        const user = await User.findById(userId);
        return { 
            ...user._doc, 
            _id: user.id,
            addedBooks: books.bind(this, user._doc.addedBooks)
        };
    } catch (err) {
        throw err;
    }
}

const books = async bookIds => {
    try {
        const books = await Book.find({ _id: { $in: bookIds } });
        return books.map(book => {
            return transformBook(book);    
        }); 
    } catch (err) {
        throw err;
    }
};

const transformBook = book => {
    return {
        ...book._doc, 
        _id: book.id,
        addedby: user.bind(this, book.addedby)
    }
}

exports.transformBook = transformBook;

const transformUser = user => {
    return {
        ...user._doc, 
        _id: user.id,
        addedBooks: books.bind(this, user._doc.addedBooks)
    }
}

exports.transformUser = transformUser;