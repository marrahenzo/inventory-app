const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/images/uploads/' });
const developerController = require('../controllers/developerController');

router.get('/', developerController.developer_list);

router.get('/create', developerController.developer_create_get);

router.post(
  '/create',
  upload.single('image'),
  developerController.developer_create_post
);

router.get('/:id/delete', developerController.developer_delete_get);

router.post('/:id/delete', developerController.developer_delete_post);

router.get('/:id/update', developerController.developer_update_get);

router.post(
  '/:id/update',
  upload.single('image'),
  developerController.developer_update_post
);

router.get('/:id', developerController.developer_detail);

module.exports = router;
