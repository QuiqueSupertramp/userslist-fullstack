const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const usersRouter = require('./src/routes/users.routes.js');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);

const bootstrap = () => {
   try {
      mongoose.connect(process.env.MONGODB_URL);
      console.log('conectado a MONGO DB');
      app.listen(process.env.PORT, () =>
         console.log(`Servidor en http://localhost:${process.env.PORT}`)
      );
   } catch (error) {
      mongoose.connection.close();
      if (error.code === 8000) return console.log('error url', error.name);
      console.log('error', error.name)
   }
};

bootstrap();
