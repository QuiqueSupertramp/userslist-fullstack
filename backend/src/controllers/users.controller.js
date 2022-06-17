const userModel = require('../models/user.model.js');

const getAllUsers = async (req, res) => {
   try {
      const users = await userModel.find({});

      const response = {
         totalUsers: users.length,
         users: users.map(user => {
            return {
               name: user.name,
               username: user.username,
               role: user.role,
               active: user.active,
               url: `${process.env.DIR}/users/${user._id}`,
            };
         }),
      };
      res.status(200).send(response);
   } catch (error) {
      handleErrors(res, error);
   }
};

const getUserById = async (req, res) => {
   try {
      const user = await userModel.findById(req.params.id);
      res.status(200).send({
         name: user.name,
         username: user.username,
         role: user.role,
         active: user.active,
      });
   } catch (error) {
      handleErrors(res, error);
   }
};

const createUser = async (req, res) => {
   try {
      const newUser = await userModel.create(req.body);
      res.status(201).send({
         newUser,
         message: `${newUser.name} ha sido creado correctamente`,
         url: `http://localhost:${process.env.PORT}/users/${newUser._id}`,
      });
   } catch (error) {
      handleErrors(res, error);
   }
};

const updateUser = async (req, res) => {
   try {
      const userUpdated = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).send({ userUpdated });
   } catch (error) {
      handleErrors(res, error);
   }
};

const deleteUser = async (req, res) => {
   try {
      const userDeleted = await userModel.findByIdAndDelete(req.params.id);
      if (userDeleted === null) throw new Error('User not exists');
      res.status(200).send({ userDeleted });
   } catch (error) {
      handleErrors(res, error);
   }
};

const handleErrors = (res, error) => {
   if (error.name === 'ValidationError')
      return res.status(404).send({
         error: { name: error.name, message: error.message },
      });
   if (error.name === 'CastError') return res.status(404).send({ error: 'User not exists' });
   if (error.code === 11000)
      return res.status(409).send({
         error: { name: error.name, message: `El usuario ${error.keyValue.username} ya existe` },
      });

   res.status(500).send({ error: { name: error.name, message: error.message } });
};

module.exports = { getAllUsers, createUser, deleteUser, getUserById, updateUser };
