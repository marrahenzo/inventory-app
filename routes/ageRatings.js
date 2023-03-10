const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/images/uploads/' });
const ageRatingController = require('../controllers/ageRatingController');

router.get('/', ageRatingController.age_rating_list);

router.get('/create', ageRatingController.age_rating_create_get);

router.post(
  '/create',
  upload.single('image'),
  ageRatingController.age_rating_create_post
);

router.get('/:id/delete', ageRatingController.age_rating_delete_get);

router.post('/:id/delete', ageRatingController.age_rating_delete_post);

router.get('/:id/update', ageRatingController.age_rating_update_get);

router.post(
  '/:id/update',
  upload.single('image'),
  ageRatingController.age_rating_update_post
);

router.get('/:id', ageRatingController.age_rating_detail);

module.exports = router;
