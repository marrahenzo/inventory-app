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
      // Populate all necessary attributes in need of display
      populate: {
        path: 'platform developer publisher genre rating'
      }
    })
    .exec((err, results) => {
      res.render('game_copy_detail', { data: results });
    });
};

exports.game_copy_create_get = (req, res) => {
  Game.find({}).exec((err, results) => {
    if (results)
      res.render('game_copy_form', {
        title: 'Create Game copy',
        data: { games: results }
      });
    // No games exist, redirect to game creation page
    else res.redirect('/game/create');
  });
};

exports.game_copy_create_post = [
  body('game', 'Game required').trim().isString().escape(),
  body('price').isNumeric().escape(),
  body('format', 'Format was not selected').exists(),
  body('condition', 'Condition was not selected').exists(),
  (req, res, next) => {
    const errors = validationResult(req);

    const copy = new GameCopy({
      game: req.body.game,
      price: req.body.price,
      format: req.body.format,
      condition: req.body.condition
    });

    if (!errors.isEmpty()) {
      // Redo query to fill game select
      Game.find({}).exec((err, results) => {
        if (err) res.redirect('/gamecopy/create');
        res.render('game_copy_form', {
          title: 'Create Game copy',
          data: { gamecopy: copy, games: results },
          errors: errors.array()
        });
      });
      return;
    } else {
      copy.save((err) => {
        if (err) return next(err);

        res.redirect(copy.url);
      });
    }
  }
];

exports.game_copy_delete_get = (req, res) => {
  GameCopy.findById(req.params.id)
    .populate('game')
    .exec((err, results) => {
      res.render('game_copy_delete', {
        title: 'Delete Game Copy',
        copy: results
      });
    });
};

exports.game_copy_delete_post = (req, res, next) => {
  GameCopy.findByIdAndRemove(req.body.copyid, (err) => {
    if (err) return next(err);

    res.redirect('/gamecopy');
  });
};

exports.game_copy_update_get = (req, res) => {
  async.parallel(
    {
      games(callback) {
        Game.find({}).exec(callback);
      },
      copy(callback) {
        GameCopy.findById(req.params.id).exec(callback);
      }
    },
    (err, results) => {
      if (err) res.redirect('/gamecopy');

      // Url id doesn't match anything
      if (results.copy == null) {
        res.redirect('/gamecopy');
      }

      res.render('game_copy_form', {
        title: 'Edit Game Copy',
        data: { gamecopy: results.copy, games: results.games }
      });
    }
  );
};

exports.game_copy_update_post = [
  body('game', 'Game required').trim().isString().escape(),
  body('price').isNumeric().escape(),
  body('format', 'Format was not selected').exists(),
  body('condition', 'Condition was not selected').exists(),
  (req, res, next) => {
    const errors = validationResult(req);

    const copy = new GameCopy({
      game: req.body.game,
      price: req.body.price,
      format: req.body.format,
      condition: req.body.condition,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      Game.find({}).exec((err, results) => {
        if (err) res.redirect(copy.url);
        res.render('game_copy_form', {
          title: 'Edit Game copy',
          data: { gamecopy: copy, games: results },
          errors: errors.array()
        });
      });
      return;
    } else {
      GameCopy.findByIdAndUpdate(
        req.params.id,
        copy,
        {},
        function (err, copyResult) {
          if (err) return next(err);

          res.redirect(copy.url);
        }
      );
    }
  }
];
