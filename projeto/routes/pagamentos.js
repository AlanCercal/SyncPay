var express = require("express");
var router = express.Router();

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("pagamentos/pagamentos", {
//     title: "SyncPay - Pagamentos",
//     style: "stylesheets/Pagamentos.css",
//   });
// });

const PagamentosController = require('../controllers/OperacoesController');

router.get('/add', PagamentosController.createOperacao);
router.post('/add', PagamentosController.createOperacaoSave);
router.post('/remove', PagamentosController.removeOperacao);
router.get('/edit/:id', PagamentosController.updateOperacao);
router.post('/edit', PagamentosController.updateOperacaoPost);
router.get('/user=:user', PagamentosController.showOperacoes);

router.post('/updatestatus', PagamentosController.changeStatus);

module.exports = router;
