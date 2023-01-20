const Game = require('../models/game');
const GameCopy = require('../models/gameCopy');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.game_copy_list = (req, res) => {
  GameCopy.find({})
    .populate('game')
    .exec((err, results) => {
      res.render('game_copies', { data: results });
    });
};

exports.game_copy_detail = (req, res) => {
  GameCopy.findById(req.params.id)
    .populate({
      path: 'game',
      populate: {
        path: 'platform developer publisher genre rating'
      }
    })
    .exec((err, results) => {
      res.render('game_copy_detail', { data: results });
    });
};

exports.game_copy_create_get = (req, res) => {
  res.send('Game copy create get');
};

exports.game_copy_create_post = (req, res) => {
  res.send('Game copy create post');
};

exports.game_copy_delete_get = (req, res) => {
  res.send('Game copy delete get');
};

exports.game_copy_delete_post = (req, res) => {
  res.send('Game copy delete post');
};

exports.game_copy_update_get = (req, res) => {
  res.send('Game copy update get');
};

exports.game_copy_update_post = (req, res) => {
  res.send('Game copy update post');
};
