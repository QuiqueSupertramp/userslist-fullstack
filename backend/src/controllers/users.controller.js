const mongoose = require('mongoose');
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
      res.status(500).send({ error });
   } finally {
      mongoose.connection.close();
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
      if (error.name === 'CastError') return res.status(404).send({ error: 'User not exists' });
      res.status(500).send({ error });
   } finally {
      mongoose.connection.close();
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
      console.log('error', error);
      if (error.code === 11000)
         return res.status(409).send({ error: `El usuario ${error.keyValue.username} ya existe` });
      if (error.name === 'ValidationError')
         return res.status(404).send({
            error: {
               name: error.name,
               message: error.message,
            },
         });
      res.status(500).send({ error });
   } finally {
      mongoose.connection.close();
   }
};

const updateUser = async (req, res) => {
   try {
      const userUpdated = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).send({ userUpdated });
   } catch (error) {
      if (error.code === 11000)
         return res.status(409).send({ error: `El usuario ${error.keyValue.username} ya existe` });
      if (error.name === 'CastError') return res.status(404).send({ error: 'User not exists' });
      res.status(500).send({ error });
   } finally {
      mongoose.connection.close();
   }
};

const deleteUser = async (req, res) => {
   try {
      const userDeleted = await userModel.findByIdAndDelete(req.params.id);
      res.status(200).send({ userDeleted });
   } catch (error) {
      if (error.name === 'CastError') return res.status(404).send({ error: 'User not exists' });
      res.status(500).send({ error });
   } finally {
      mongoose.connection.close();
   }
};

module.exports = { getAllUsers, createUser, deleteUser, getUserById, updateUser };
