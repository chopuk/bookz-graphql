const User = require('../../models/user.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { transformUser } = require('./helpers')

module.exports = {
    getUser: async (args) => {
        try {
            const user = await User.findById(args.id);
            return transformUser(user);
        } catch(err) {
             throw err;   
        }
    },
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({email: args.userInput.email});
            if (existingUser) {
                throw new Error('User already exists!')
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password,12);
            const userToAdd = new User({
                firstname: args.userInput.firstname,
                lastname: args.userInput.lastname,
                email: args.userInput.email,
                password: hashedPassword,
            })
            const result = await userToAdd.save();
            return { ...result._doc, password: null, _id: result._doc._id.toString() }
        } catch(err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        try {
            const user = await User.findOne({ email: email});
            if (!user) {
                throw new Error('User does not existttt');
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error('Password is incorrect');
            }
            const token = jwt.sign({ userId: user.id, email: user.email }, 
                'mysimplekey', 
                {
                    expiresIn: '1h' 
                }
            );
            return { userId: user.id, token: token, tokenExpiration: 1 };
        } catch(err) {
            throw err;
        }
    }
};