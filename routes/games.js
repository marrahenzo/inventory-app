const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/images/uploads/' });
const gameController = require('../controllers/gameController');

router.get('/', gameController.game_list);

router.get('/create', gameController.game_create_get);

router.post('/create', upload.single('image'), gameController.game_create_post);

router.get('/:id/delete', gameController.game_delete_get);

router.post('/:id/delete', gameController.game_delete_post);

router.get('/:id/update', gameController.game_update_get);

router.post(
  '/:id/update',
  upload.single('image'),
  gameController.game_update_post
);

router.get('/:id', gameController.game_detail);

module.exports = router;
