const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         minLength: [3, 'NAME must be at least 3 characters'],
         maxLength: [25, 'NAME must not exceed 25 characters'],
         required: [true, 'NAME is required'],
      },
      username: {
         type: String,
         minLength: [6, 'USERNAME must be at least 6 characters'],
         maxLength: [15, 'USERNAME must not exceed 15 characters'],
         required: [true, 'USERNAME is required'],
         unique: [true, 'USERNAME alredy exists'],
      },
      role: {
         type: String,
         enum: { values: ['teacher', 'student', 'other'], message: '{VALUE} is not supported' },
         required: [true, 'ROLE is required'],
      },
      active: {
         type: Boolean,
         default: false,
      },
   },
   { versionKey: false }
);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
