// const mongoose = require('mongoose');

// const termsSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     default: 'Terms and Conditions'
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   version: {
//     type: String,
//     default: '1.0'
//   },
//   effectiveDate: {
//     type: Date,
//     default: Date.now
//   },
//   lastUpdated: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true
// });

// // Update lastUpdated on save
// termsSchema.pre('save', function(next) {
//   this.lastUpdated = new Date();
//   next();
// });

// module.exports = mongoose.model('Terms', termsSchema);

const mongoose = require("mongoose");

const termsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports =  mongoose.model("Terms", termsSchema);
