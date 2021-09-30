// Deepa Krishnan
const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  checkoutBook,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveBook);
// login route 
router.route('/login').post(login);
// get a user 
router.route('/me').get(authMiddleware, getSingleUser);
// remove a book from wish list 
router.route('/books/:bookId').delete(authMiddleware, deleteBook);

// Include a checkout books 
router.route('/books/:bookId').post(authMiddleware, checkoutBook);

module.exports = router;