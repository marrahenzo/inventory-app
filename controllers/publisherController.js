const Publisher = require('../models/publisher');
const Game = require('../models/game');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.publisher_list = (req, res) => {
  Publisher.find({}).exec((err, results) => {
    res.render('publishers', { data: results });
  });
};

exports.publisher_detail = (req, res) => {
  Publisher.findById(req.params.id).exec((err, results) => {
    res.render('publisher_detail', { publisher: results });
  });
};

exports.publisher_create_get = (req, res) => {
  res.render('publisher_form', { title: 'Create Publisher' });
};

exports.publisher_create_post = [
  body('name', 'Publisher name required').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const publisher = new Publisher({
      name: req.body.name,
      description: req.body.description
    });

    if (!errors.isEmpty()) {
      res.render('publisher_form', {
        title: 'Create Publisher',
        publisher,
        errors: errors.array()
      });
      return;
    } else {
      Publisher.findOne({ name: req.body.name }).exec(
        (err, found_publisher) => {
          if (err) {
            return next(err);
          }

          if (found_publisher) {
            res.redirect(found_publisher.url);
          } else {
            publisher.save((err) => {
              if (err) {
                return next(err);
              }

              res.redirect(publisher.url);
            });
          }
        }
      );
    }
  }
];

exports.publisher_delete_get = (req, res) => {
  async.parallel(
    {
      publisher(callback) {
        Publisher.findById(req.params.id).exec(callback);
      },
      games(callback) {
        Game.find({ publisher: req.params.id })
          .populate('developer')
          .populate('publisher')
          .exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (results.publisher == null) {
        res.redirect('/publisher');
      }

      res.render('publisher_delete', {
        title: 'Delete Publisher',
        publisher: results.publisher,
        games: results.games
      });
    }
  );
};

exports.publisher_delete_post = (req, res) => {
  async.parallel(
    {
      publisher(callback) {
        Publisher.findById(req.body.publisherid).exec(callback);
      },
      games(callback) {
        Game.find({ publisher: req.body.publisherid }).exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (results.games.length > 0) {
        res.render('publisher_delete', {
          title: 'Delete Publisher',
          publisher: results.publisher,
          games: results.games
        });
        return;
      }

      Publisher.findByIdAndRemove(req.body.publisherid, (err) => {
        if (err) return next(err);

        res.redirect('/publisher');
      });
    }
  );
};

exports.publisher_update_get = (req, res) => {
  Publisher.findById(req.params.id).exec((err, result) => {
    if (err) {
      res.render('publishers');
      return;
    }

    res.render('publisher_form', {
      title: 'Edit Publisher',
      publisher: result
    });
  });
};

exports.publisher_update_post = [
  body('name', 'Publisher name required').trim().isLength({ min: 1 }).escape(),
  body('description', 'description required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const publisher = new Publisher({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      res.render('publisher_form', {
        title: 'Edit Publisher',
        publisher,
        errors: errors.array()
      });
      return;
    } else {
      Publisher.findByIdAndUpdate(
        req.params.id,
        publisher,
        {},
        function (err, publisherResult) {
          if (err) return next(err);

          res.redirect(publisherResult.url);
        }
      );
    }
  }
];
