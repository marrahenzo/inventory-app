const Game = require('../models/game');
const GameCopy = require('../models/gameCopy');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.game_copy_list = (req, res) => {
  res.send('Game copies list');
};

exports.game_copy_detail = (req, res) => {
  res.send('Game copy detail');
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
