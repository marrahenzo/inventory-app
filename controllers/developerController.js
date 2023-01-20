const Developer = require('../models/developer');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.developer_list = (req, res) => {
  Developer.find({}).exec((err, results) => {
    res.render('developers', { data: results });
  });
};

exports.developer_detail = (req, res) => {
  Developer.findById(req.params.id).exec((err, results) => {
    res.render('developer_detail', { developer: results });
  });
};

exports.developer_create_get = (req, res) => {
  res.send('Developer create get');
};

exports.developer_create_post = (req, res) => {
  res.send('Developer create post');
};

exports.developer_delete_get = (req, res) => {
  res.send('Developer delete get');
};

exports.developer_delete_post = (req, res) => {
  res.send('Developer delete post');
};

exports.developer_update_get = (req, res) => {
  res.send('Developer update get');
};

exports.developer_update_post = (req, res) => {
  res.send('Developer update post');
};
