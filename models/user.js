const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const user = function(){
    const userSchema = new Schema({
        firstname: {
            type:String,	
            required: true
        },
        lastname: {
            type:String,	
            required: true
        },
		email: {
            type:String,	
            required: true
        },
        password: {
            type:String,	
            required: true
        },
        addedBooks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Book'
            }
        ]
	},
	{
    	versionKey: false
	});
	
    userSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    
    // checking if password is valid
    userSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.password);
    };
	
	return mongoose.model('User', userSchema);
};

module.exports = user();