const Game = require('../models/game');
const GameCopy = require('../models/gameCopy');
const Genre = require('../models/genre');
const Platform = require('../models/platform');
const Developer = require('../models/developer');
const Publisher = require('../models/publisher');
const AgeRating = require('../models/ageRating');

const { body, validationResult } = require('express-validator');
const async = require('async');
const mongoose = require('mongoose');

exports.game_list = (req, res, next) => {
  Game.find({})
    .populate('platform')
    .populate('developer')
    .populate('publisher')
    .populate('genre')
    .populate('summary')
    .populate('rating')
    .exec((err, results) => {
      res.render('games', { data: results });
    });
};

exports.game_detail = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  Game.findById(id)
    .populate('platform')
    .populate('developer')
    .populate('publisher')
    .populate('genre')
    .populate('summary')
    .populate('rating')
    .exec((err, results) => {
      if (err) {
        res.render('index', { message: 'An error has ocurred', error: 'A' });
        return;
      }
      res.render('game_detail', { game: results });
    });
};

exports.game_create_get = (req, res) => {
  async.parallel(
    {
      platforms(callback) {
        Platform.find({}).exec(callback);
      },
      developers(callback) {
        Developer.find({}).exec(callback);
      },
      publishers(callback) {
        Publisher.find({}).exec(callback);
      },
      genres(callback) {
        Genre.find({}).exec(callback);
      },
      ratings(callback) {
        AgeRating.find({}).exec(callback);
      }
    },
    (err, results) => {
      if (err) res.redirect('/game');
      res.render('game_form', { title: 'Create Game', data: results });
    }
  );
};

exports.game_create_post = [
  body('title').trim().isLength({ min: 1 }).escape(),
  body('summary').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    Genre.find({ _id: { $in: req.body.genre } }).exec((err, results) => {
      if (err) res.redirect('/game/create');

      const game = new Game({
        title: req.body.title,
        platform: req.body.platform,
        developer: req.body.developer,
        publisher: req.body.publisher,
        genre: results.map((a) => a.id),
        summary: req.body.summary,
        rating: req.body.rating,
        image: req.file.filename
      });

      if (!errors.isEmpty()) {
        res.redirect('/game/create');
        return;
      } else {
        game.save((err) => {
          if (err) return next(err);

          res.redirect(game.url);
        });
      }
    });
  }
];

exports.game_delete_get = (req, res) => {
  async.parallel(
    {
      copies(callback) {
        GameCopy.find({ game: req.params.id }).exec(callback);
      },
      game(callback) {
        Game.findById(req.params.id).exec(callback);
      }
    },
    (err, results) => {
      if (err) {
        res.redirect('back');
        return;
      }

      res.render('game_delete', {
        title: 'Delete game',
        data: results
      });
    }
  );
};

exports.game_delete_post = (req, res, next) => {
  async.parallel(
    {
      copies(callback) {
        GameCopy.find({ game: req.params.id }).exec(callback);
      },
      game(callback) {
        Game.findById(req.params.id).exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (
        results.copies.length > 0 ||
        req.body.password !== process.env.SECRET
      ) {
        res.render('game_delete', {
          title: 'Delete Game',
          data: results,
          error: true
        });
        return;
      }

      Game.findByIdAndDelete(req.body.gameid, (err) => {
        if (err) return next(err);

        res.redirect('/game');
      });
    }
  );
};

exports.game_update_get = (req, res) => {
  async.parallel(
    {
      platforms(callback) {
        Platform.find({}).exec(callback);
      },
      developers(callback) {
        Developer.find({}).exec(callback);
      },
      publishers(callback) {
        Publisher.find({}).exec(callback);
      },
      genres(callback) {
        Genre.find({}).exec(callback);
      },
      ratings(callback) {
        AgeRating.find({}).exec(callback);
      },
      game(callback) {
        Game.findById(req.params.id)
          .populate('platform')
          .populate('developer')
          .populate('publisher')
          .populate('genre')
          .populate('rating')
          .exec(callback);
      }
    },
    (err, results) => {
      if (err) res.redirect('/game');
      res.render('game_form', { title: 'Edit Game', data: results });
    }
  );
};

exports.game_update_post = [
  body('title').trim().isLength({ min: 1 }).escape(),
  body('summary').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const game = new Game({
      _id: req.params.id,
      title: req.body.title,
      platform: req.body.platform,
      developer: req.body.developer,
      publisher: req.body.publisher,
      genre: req.body.genre,
      summary: req.body.summary,
      rating: req.body.rating,
      image: req.file.filename
    });

    if (!errors.isEmpty() || req.body.password !== process.env.SECRET) {
      async.parallel(
        {
          platforms(callback) {
            Platform.find({}).exec(callback);
          },
          developers(callback) {
            Developer.find({}).exec(callback);
          },
          publishers(callback) {
            Publisher.find({}).exec(callback);
          },
          genres(callback) {
            Genre.find({}).exec(callback);
          },
          ratings(callback) {
            AgeRating.find({}).exec(callback);
          },
          game(callback) {
            Game.findById(req.params.id)
              .populate('platform')
              .populate('developer')
              .populate('publisher')
              .populate('genre')
              .populate('rating')
              .exec(callback);
          }
        },
        (err, results) => {
          if (err) res.redirect('/game');
          res.render('game_form', {
            title: 'Edit Game',
            data: results,
            error: true
          });
        }
      );
      return;
    } else {
      Game.findByIdAndUpdate(
        req.params.id,
        game,
        {},
        function (err, gameResult) {
          if (err) return next(err);

          res.redirect(game.url);
        }
      );
    }
  }
];
