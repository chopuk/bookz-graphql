// example of client call to add book
mutation {
    createBook(bookInput: {
        title: "Sapphire The Youtuber",
        description: "Saph is beautiful",
        author: "Big Chopper",
        publisher: "Harris Productions",
        price: 9.99,
        quantity: 101
    }) { 
        title
    }
} 