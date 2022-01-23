const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const productCtrl = require('../controllers/sauces');

router.get('/', auth, productCtrl.getAllSauces);
router.post('/', auth, multer, productCtrl.addSauce);
router.post('/:id/like', auth, productCtrl.likeSauces);
router.get('/:id', auth, productCtrl.getOneSauce);
router.put('/:id', auth, multer, productCtrl.modifySauce);
router.delete('/:id', auth, productCtrl.deleteSauce);



module.exports = router;