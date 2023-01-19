const Publisher = require('../models/publisher');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.publisher_list = (req, res) => {
  res.send('Publishers list');
};

exports.publisher_detail = (req, res) => {
  res.send('Publisher detail');
};

exports.publisher_create_get = (req, res) => {
  res.send('Publisher create get');
};

exports.publisher_create_post = (req, res) => {
  res.send('Publisher create post');
};

exports.publisher_delete_get = (req, res) => {
  res.send('Publisher delete get');
};

exports.publisher_delete_post = (req, res) => {
  res.send('Publisher delete post');
};

exports.publisher_update_get = (req, res) => {
  res.send('Publisher update get');
};

exports.publisher_update_post = (req, res) => {
  res.send('Publisher update post');
};
