const Platform = require('../models/platform');
const Game = require('../models/game');

const { body, validationResult } = require('express-validator');
const async = require('async');

exports.platform_list = (req, res) => {
  Platform.find({}).exec((err, results) => {
    res.render('platforms', { data: results });
  });
};

exports.platform_detail = (req, res) => {
  Platform.findById(req.params.id).exec((err, results) => {
    res.render('platform_detail', { platform: results });
  });
};

exports.platform_create_get = (req, res) => {
  res.render('platform_form', { title: 'Create Platform' });
};

exports.platform_create_post = [
  body('name', 'Platform name required').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const platform = new Platform({
      name: req.body.name,
      description: req.body.description
    });

    if (!errors.isEmpty()) {
      res.render('platform_form', {
        title: 'Create Platform',
        platform,
        errors: errors.array()
      });
      return;
    } else {
      Platform.findOne({ name: req.body.name }).exec((err, found_platform) => {
        if (err) {
          return next(err);
        }

        if (found_platform) {
          res.redirect(found_platform.url);
        } else {
          platform.save((err) => {
            if (err) {
              return next(err);
            }

            res.redirect(platform.url);
          });
        }
      });
    }
  }
];

exports.platform_delete_get = (req, res) => {
  async.parallel(
    {
      platform(callback) {
        Platform.findById(req.params.id).exec(callback);
      },
      games(callback) {
        Game.find({ platform: req.params.id }).exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (results.platform == null) {
        res.redirect('/platform');
      }

      res.render('platform_delete', {
        title: 'Delete Platform',
        platform: results.platform,
        games: results.games
      });
    }
  );
};

exports.platform_delete_post = (req, res) => {
  async.parallel(
    {
      platform(callback) {
        Platform.findById(req.body.platformid).exec(callback);
      },
      games(callback) {
        Game.find({ platform: req.body.platformid }).exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (results.games.length > 0) {
        res.render('platform_delete', {
          title: 'Delete Platform',
          platform: results.platform,
          games: results.games
        });
        return;
      }

      Platform.findByIdAndRemove(req.body.platformid, (err) => {
        if (err) return next(err);

        res.redirect('/platform');
      });
    }
  );
};

exports.platform_update_get = (req, res) => {
  Platform.findById(req.params.id).exec((err, result) => {
    if (err) {
      res.render('platforms');
      return;
    }

    res.render('platform_form', {
      title: 'Edit Platform',
      platform: result
    });
  });
};

exports.platform_update_post = [
  body('name', 'Platform name required').trim().isLength({ min: 1 }).escape(),
  body('description', 'description required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const platform = new Platform({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      res.render('platform_form', {
        title: 'Edit Platform',
        platform,
        errors: errors.array()
      });
      return;
    } else {
      Platform.findByIdAndUpdate(
        req.params.id,
        platform,
        {},
        function (err, platformResult) {
          if (err) return next(err);

          res.redirect(platformResult.url);
        }
      );
    }
  }
];
