// Deepa Krishnan
const router = require('express').Router();

// import middleware
const { authMiddleware } = require('../../utils/auth');

const { 
    deleteBook,
    checkoutBook,
    addNewbook
  } = require('../../controllers/user-controller');
    
// remove a book from wish list 
router.route('/books/:bookId').delete(authMiddleware, deleteBook);

// Include a checkout books
router.route('/books/:bookId').post(authMiddleware, checkoutBook);
    
// Add new book 
router.route('/books').post(authMiddleware, addNewbook);