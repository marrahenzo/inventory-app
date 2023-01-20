const Platform = require('../models/platform');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.platform_list = (req, res) => {
  Platform.find({}).exec((err, results) => {
    res.render('platforms', { data: results });
  });
};

exports.platform_detail = (req, res) => {
  Platform.findById(req.params.id).exec((err, results) => {
    res.render('platform_detail', { platform: results });
  });
};

exports.platform_create_get = (req, res) => {
  res.send('Platform create get');
};

exports.platform_create_post = (req, res) => {
  res.send('Platform create post');
};

exports.platform_delete_get = (req, res) => {
  res.send('Platform delete get');
};

exports.platform_delete_post = (req, res) => {
  res.send('Platform delete post');
};

exports.platform_update_get = (req, res) => {
  res.send('Platform update get');
};

exports.platform_update_post = (req, res) => {
  res.send('Platform update post');
};
