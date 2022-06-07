var express = require("express");
var router = express.Router();

const CartaoController = require('../controllers/CartoesController');

router.get('/add', CartaoController.createCartao);
router.post('/add', CartaoController.createCartaoSave);
router.post('/remove', CartaoController.removeCartao);
router.get('/edit/:id', CartaoController.updateCartao);
router.post('/edit', CartaoController.updateCartaoPost);
router.get('/', CartaoController.showCartoes);

router.post('/updatestatus', CartaoController.changeStatus);

module.exports = router;
