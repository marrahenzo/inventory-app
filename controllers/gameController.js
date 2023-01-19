const Game = require('../models/game');
const GameCopy = require('../models/gameCopy');
const Genre = require('../models/genre');
const Platform = require('../models/platform');
const Developer = require('../models/developer');
const Publisher = require('../models/publisher');
const AgeRating = require('../models/ageRating');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.game_list = (req, res) => {
  res.send('Games list');
};

exports.game_detail = (req, res) => {
  res.send('Games detail');
};

exports.game_create_get = (req, res) => {
  res.send('Game create get');
};

exports.game_create_post = (req, res) => {
  res.send('Game create post');
};

exports.game_delete_get = (req, res) => {
  res.send('Game delete get');
};

exports.game_delete_post = (req, res) => {
  res.send('Game delete post');
};

exports.game_update_get = (req, res) => {
  res.send('Game update get');
};

exports.game_update_post = (req, res) => {
  res.send('Game update post');
};
