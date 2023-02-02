const Developer = require('../models/developer');
const Game = require('../models/game');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.developer_list = (req, res) => {
  Developer.find({}).exec((err, results) => {
    res.render('developers', { data: results });
  });
};

exports.developer_detail = (req, res) => {
  Developer.findById(req.params.id).exec((err, results) => {
    res.render('developer_detail', { developer: results });
  });
};

exports.developer_create_get = (req, res) => {
  res.render('developer_form', { title: 'Create Developer' });
};

exports.developer_create_post = [
  body('name', 'Developer name required').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const developer = new Developer({
      name: req.body.name,
      description: req.body.description,
      image: req.file.filename
    });

    if (!errors.isEmpty()) {
      res.render('developer_form', {
        title: 'Create Developer',
        developer,
        errors: errors.array()
      });
      return;
    } else {
      Developer.findOne({ name: req.body.name }).exec(
        (err, found_developer) => {
          if (err) return next(err);

          if (found_developer) {
            res.redirect(found_developer.url);
          } else {
            developer.save((err) => {
              if (err) return next(err);

              res.redirect(developer.url);
            });
          }
        }
      );
    }
  }
];

exports.developer_delete_get = (req, res) => {
  async.parallel(
    {
      developer(callback) {
        Developer.findById(req.params.id).exec(callback);
      },
      games(callback) {
        Game.find({ developer: req.params.id })
          .populate('developer')
          .populate('publisher')
          .exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (results.developer == null) {
        res.redirect('/developer');
      }

      res.render('developer_delete', {
        title: 'Delete Developer',
        developer: results.developer,
        games: results.games
      });
    }
  );
};

exports.developer_delete_post = (req, res) => {
  async.parallel(
    {
      developer(callback) {
        Developer.findById(req.body.developerid).exec(callback);
      },
      games(callback) {
        Game.find({ developer: req.body.developerid }).exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (results.games.length > 0) {
        res.render('developer_delete', {
          title: 'Delete Developer',
          developer: results.developer,
          games: results.games
        });
        return;
      }

      Developer.findByIdAndRemove(req.body.developerid, (err) => {
        if (err) return next(err);

        res.redirect('/developer');
      });
    }
  );
};

exports.developer_update_get = (req, res) => {
  Developer.findById(req.params.id).exec((err, result) => {
    if (err) {
      res.render('developers');
      return;
    }

    res.render('developer_form', {
      title: 'Edit Developer',
      developer: result
    });
  });
};

exports.developer_update_post = [
  body('name', 'Developer name required').trim().isLength({ min: 1 }).escape(),
  body('description', 'description required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const developer = new Developer({
      name: req.body.name,
      description: req.body.description,
      image: req.file.filename,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      res.render('developer_form', {
        title: 'Edit Developer',
        developer,
        errors: errors.array()
      });
      return;
    } else {
      Developer.findByIdAndUpdate(
        req.params.id,
        developer,
        {},
        function (err, developerResult) {
          if (err) return next(err);

          res.redirect(developerResult.url);
        }
      );
    }
  }
];
