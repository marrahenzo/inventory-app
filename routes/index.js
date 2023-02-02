var express = require('express');
var router = express.Router();
const async = require('async');

const Game = require('../models/game');
const GameCopy = require('../models/gameCopy');
const Genre = require('../models/genre');
const Platform = require('../models/platform');
const Developer = require('../models/developer');
const Publisher = require('../models/publisher');
const AgeRating = require('../models/ageRating');

/* GET home page. */
router.get('/', function (req, res) {
  async.parallel(
    {
      /* UNUSED CODE
      random_game(callback) {
        Game.countDocuments({}, (err, count) => {
          let randomNumber = getRandom(count);
          Game.findOne(callback).skip(randomNumber);
        });
      },
      random_game_copy(callback) {
        GameCopy.countDocuments({}, (err, count) => {
          let randomNumber = getRandom(count);
          GameCopy.findOne(callback).skip(randomNumber).populate('game');
        });
      },
      random_genre(callback) {
        Genre.countDocuments({}, (err, count) => {
          let randomNumber = getRandom(count);
          Genre.findOne(callback).skip(randomNumber);
        });
      },
      random_platform(callback) {
        Platform.countDocuments({}, (err, count) => {
          let randomNumber = getRandom(count);
          Platform.findOne(callback).skip(randomNumber);
        });
      },
      random_developer(callback) {
        Developer.countDocuments({}, (err, count) => {
          let randomNumber = getRandom(count);
          Developer.findOne(callback).skip(randomNumber);
        });
      },
      random_publisher(callback) {
        Publisher.countDocuments({}, (err, count) => {
          let randomNumber = getRandom(count);
          Publisher.findOne(callback).skip(randomNumber);
        });
      },
      random_age_rating(callback) {
        AgeRating.countDocuments({}, (err, count) => {
          let randomNumber = getRandom(count);
          AgeRating.findOne(callback).skip(randomNumber);
        });
      },*/
      game_count(callback) {
        Game.countDocuments({}, callback);
      },
      game_copy_count(callback) {
        GameCopy.countDocuments({}, callback);
      },
      genre_count(callback) {
        Genre.countDocuments({}, callback);
      },
      platform_count(callback) {
        Platform.countDocuments({}, callback);
      },
      developer_count(callback) {
        Developer.countDocuments({}, callback);
      },
      publisher_count(callback) {
        Publisher.countDocuments({}, callback);
      },
      age_rating_count(callback) {
        AgeRating.countDocuments({}, callback);
      }
    },
    (err, results) => {
      res.render('index', { title: 'MarraGames', error: err, data: results });
    }
  );
});

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

module.exports = router;
