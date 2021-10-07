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
  // create book data
  const bookData = [];
  for (let i = 0; i < 20; i++) {
    const book = {
      title: faker.random.words(),
      author: faker.name.findName(),
      description: faker.lorem.sentence(),
      ISBN: faker.random.number({min: 100000000000, max: 9999999999999}),
      stockCount: faker.random.number({min:1, max:10})
      //category: faker.commerce.department()
    }
    bookData.push(book);
  }
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
  await Book.insertMany(bookData);
  await User.insertMany(userData);
  console.log('all done!');
  process.exit(0);
});