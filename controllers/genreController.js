const Genre = require('../models/genre');
const Game = require('../models/game');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.genre_list = (req, res) => {
  Genre.find({}).exec((err, results) => {
    res.render('genres', { data: results });
  });
};

exports.genre_detail = (req, res) => {
  Genre.findById(req.params.id).exec((err, results) => {
    res.render('genre_detail', { genre: results });
  });
};

exports.genre_create_get = (req, res) => {
  res.render('genre_form', { title: 'Create Genre' });
};

exports.genre_create_post = [
  body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({
      name: req.body.name,
      description: req.body.description
    });

    if (!errors.isEmpty()) {
      res.render('genre_form', {
        title: 'Create Genre',
        genre,
        errors: errors.array()
      });
      return;
    } else {
      Genre.findOne({ name: req.body.name }).exec((err, found_genre) => {
        if (err) {
          return next(err);
        }

        if (found_genre) {
          res.redirect(found_genre.url);
        } else {
          genre.save((err) => {
            if (err) {
              return next(err);
            }

            res.redirect(genre.url);
          });
        }
      });
    }
  }
];

exports.genre_delete_get = (req, res) => {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      games(callback) {
        Game.find({ genre: req.params.id }).exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (results.genre == null) {
        res.redirect('/genre');
      }

      res.render('genre_delete', {
        title: 'Delete Genre',
        genre: results.genre,
        games: results.games
      });
    }
  );
};

exports.genre_delete_post = (req, res) => {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.body.genreid).exec(callback);
      },
      games(callback) {
        Game.find({ genre: req.body.genreid }).exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (results.games.length > 0) {
        res.render('genre_delete', {
          title: 'Delete Genre',
          genre: results.genre,
          games: results.games
        });
        return;
      }

      Genre.findByIdAndRemove(req.body.genreid, (err) => {
        if (err) return next(err);

        res.redirect('/genre');
      });
    }
  );
};

exports.genre_update_get = (req, res) => {
  Genre.findById(req.params.id).exec((err, result) => {
    if (err) {
      res.render('genres');
      return;
    }

    res.render('genre_form', {
      title: 'Edit Genre',
      genre: result
    });
  });
};

exports.genre_update_post = [
  body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),
  body('description', 'description required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      res.render('genre_form', {
        title: 'Edit Genre',
        genre,
        errors: errors.array()
      });
      return;
    } else {
      Genre.findByIdAndUpdate(
        req.params.id,
        genre,
        {},
        function (err, genreResult) {
          if (err) return next(err);

          res.redirect(genreResult.url);
        }
      );
    }
  }
];
