const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const book = function(){
    const bookSchema = new Schema({
		title: {
            type:String,	
            required: true
        },
        description: {
            type:String,	
            required: true
        },
        author: {
            type:String,	
            required: true
        },
        publisher: {
            type:String,	
            required: true
        },
        price: {
            type:Number,	
            required: true
        },
        quantity: {
            type:Number,	
            required: true
        },
        addedby: {
            type: Schema.Types.ObjectId,
            ref: 'User' 
        },
        bookId: {
            type:String,	
            required: true
        },
	},
	{
    	versionKey: false
	});
	 
	// Shorten text
	bookSchema.methods.truncateText = function(length){
		return this.description.substring(0,length);
	};
	
	return mongoose.model('Book', bookSchema);
};

module.exports = book();