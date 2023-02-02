const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/images/uploads/' });
const platformController = require('../controllers/platformController');

router.get('/', platformController.platform_list);

router.get('/create', platformController.platform_create_get);

router.post(
  '/create',
  upload.single('image'),
  platformController.platform_create_post
);

router.get('/:id/delete', platformController.platform_delete_get);

router.post('/:id/delete', platformController.platform_delete_post);

router.get('/:id/update', platformController.platform_update_get);

router.post(
  '/:id/update',
  upload.single('image'),
  platformController.platform_update_post
);

router.get('/:id', platformController.platform_detail);

module.exports = router;
