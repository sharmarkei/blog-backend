'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
  title: { type: String, required: true},
  content: { type: String, required: true},
  userID: { type: Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('post', postSchema);