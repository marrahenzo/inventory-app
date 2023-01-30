const AgeRating = require('../models/ageRating');
const Game = require('../models/game');

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
  res.render('agerating_form', { title: 'Create Age Rating' });
};

exports.age_rating_create_post = [
  body('name', 'Age rating name required').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const rating = new AgeRating({
      name: req.body.name,
      description: req.body.description
    });

    if (!errors.isEmpty()) {
      res.render('agerating_form', {
        title: 'Create Age Rating',
        agerating: rating,
        errors: errors.array()
      });
      return;
    } else {
      AgeRating.findOne({ name: req.body.name }).exec((err, found_rating) => {
        if (err) {
          return next(err);
        }

        if (found_rating) {
          res.redirect(found_rating.url);
        } else {
          rating.save((err) => {
            if (err) {
              return next(err);
            }

            res.redirect(rating.url);
          });
        }
      });
    }
  }
];

exports.age_rating_delete_get = (req, res, next) => {
  async.parallel(
    {
      rating(callback) {
        AgeRating.findById(req.params.id).exec(callback);
      },
      games(callback) {
        Game.find({ rating: req.params.id }).exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (results.rating == null) {
        res.redirect('/rating');
      }

      res.render('agerating_delete', {
        title: 'Delete Age rating',
        agerating: results.rating,
        games: results.games
      });
    }
  );
};

exports.age_rating_delete_post = (req, res, next) => {
  async.parallel(
    {
      rating(callback) {
        AgeRating.findById(req.body.ratingid).exec(callback);
      },
      games(callback) {
        Game.find({ rating: req.body.ratingid }).exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (results.games.length > 0) {
        res.render('agerating_delete', {
          title: 'Delete Age rating',
          agerating: results.rating,
          games: results.games
        });
        return;
      }

      AgeRating.findByIdAndRemove(req.body.ratingid, (err) => {
        if (err) return next(err);

        res.redirect('/rating');
      });
    }
  );
};

exports.age_rating_update_get = (req, res) => {
  AgeRating.findById(req.params.id).exec((err, result) => {
    if (err) {
      res.render('ageratings');
      return;
    }

    res.render('agerating_form', {
      title: 'Edit Age Rating',
      agerating: result
    });
  });
};

exports.age_rating_update_post = [
  body('name', 'Age rating name required').trim().isLength({ min: 1 }).escape(),
  body('description', 'description required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const rating = new AgeRating({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      res.render('agerating_form', {
        title: 'Edit Age Rating',
        agerating: rating,
        errors: errors.array()
      });
      return;
    } else {
      AgeRating.findByIdAndUpdate(
        req.params.id,
        rating,
        {},
        function (err, agerating) {
          if (err) return next(err);

          res.redirect(agerating.url);
        }
      );
    }
  }
];
