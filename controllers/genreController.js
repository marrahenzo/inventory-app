const Genre = require('../models/genre');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.genre_list = (req, res) => {
  res.send('Genres list');
};

exports.genre_detail = (req, res) => {
  res.send('Genre detail');
};

exports.genre_create_get = (req, res) => {
  res.send('Genre create get');
};

exports.genre_create_post = (req, res) => {
  res.send('Genre create post');
};

exports.genre_delete_get = (req, res) => {
  res.send('Genre delete get');
};

exports.genre_delete_post = (req, res) => {
  res.send('Genre delete post');
};

exports.genre_update_get = (req, res) => {
  res.send('Genre update get');
};

exports.genre_update_post = (req, res) => {
  res.send('Genre update post');
};
