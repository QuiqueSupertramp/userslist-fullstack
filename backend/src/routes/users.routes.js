const express = require('express');
const {
   getAllUsers,
   createUser,
   deleteUser,
   getUserById,
   updateUser,
} = require('../controllers/users.controller.js');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);

module.exports = usersRouter;
