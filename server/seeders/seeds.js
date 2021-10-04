 //Code by Sindhu
 const faker = require('faker');

 const db = require('../config/connection');
 const {
   Book,
   User
 } = require('../models');

 db.once('open', async () => {

   await User.deleteMany({});
   await Book.deleteMany({});

   // create user data
   const userData = [];
   for (let i = 0; i < 20; i += 1) {
     const user = {
       username: faker.internet.userName(),
       email: faker.internet.email(),
       password: faker.internet.password()
     }
     userData.push(user);
   }
   // create book data
   const bookData = [];

   for (let i = 0; i < 20; i++) {
     const book = {
       title: faker.company.catchPhrase(),
       author: faker.name.findName(),
       description: faker.lorem.sentence(),
       ISBN: faker.random.alphaNumeric(),
       stockCount: faker.random.number(),
       //  category: faker.commerce.department()
     }
     bookData.push(book);
   }

   await Book.insertMany(bookData);
   await User.insertMany(userData);
   console.log('all done!');
   process.exit(0);
 });


 // -----------------------------------------------------------

 // for (let i = 0; i < 20; i++) {
 //     const title = faker.company.catchPhrase();
 //     const author = faker.name.findName();
 //     const description = faker.lorem.sentence()
 //     const ISBN = faker.datatype.string();
 //     const stockCount = faker.datatype.number();
 //     const category = faker.commerce.department();

 //     bookData.push({ title, author, description, ISBN,stockCount, category  });
 // End of code by Sindhu