const express = require('express');
const router = express.Router();
const gameCopyController = require('../controllers/gameCopyController');

router.get('/', gameCopyController.game_copy_list);

router.get('/create', gameCopyController.game_copy_create_get);

router.post('/create', gameCopyController.game_copy_create_post);

router.get('/:id/delete', gameCopyController.game_copy_delete_get);

router.post('/:id/delete', gameCopyController.game_copy_delete_post);

router.get('/:id/update', gameCopyController.game_copy_update_get);

router.post('/:id/update', gameCopyController.game_copy_update_post);

router.get('/:id', gameCopyController.game_copy_detail);

module.exports = router;
