const AgeRating = require('../models/ageRating');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.age_rating_list = (req, res) => {
  AgeRating.find({}).exec((err, results) => {
    res.render('ageratings', { data: results });
  });
};

exports.age_rating_detail = (req, res) => {
  AgeRating.findById(req.params.id).exec((err, results) => {
    res.render('agerating_detail', { agerating: results });
  });
};

exports.age_rating_create_get = (req, res) => {
  res.send('Age Rating create get');
};

exports.age_rating_create_post = (req, res) => {
  res.send('Age Rating create post');
};

exports.age_rating_delete_get = (req, res) => {
  res.send('Age Rating delete get');
};

exports.age_rating_delete_post = (req, res) => {
  res.send('Age Rating delete post');
};

exports.age_rating_update_get = (req, res) => {
  res.send('Age Rating update get');
};

exports.age_rating_update_post = (req, res) => {
  res.send('Age Rating update post');
};
