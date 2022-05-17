var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("principal");
});

router.get("/cartoes.hbs", function(req, res, next) {
  res.render("catoes");
});

router.post("/", function (req, res, next) {
  console.log(req.body.typeEmailX);
  console.log(req.body.typePasswordX);
  if (
    req.body.typeEmailX === "gab@gmail.com" &&
    req.body.typePasswordX === "123"
  ) {
    console.log("login aceito");
    res.render("index", {
      title: "formulário entregue",
      email: req.body.typeEmailX,
      senha: req.body.typePasswordX,
    });
  } else {
    res.render("error", {
      message: "FOI ENCONTRADO UM ERRO",
    });
  }
});

/*
router.post('/', function(req, res, next) {
var n1 = +req.body.n1;
var n2 = +req.body.n2;
var soma = n1+n2;
//res.json({soma: soma})
//res.json({req: req.body})
//res.json({req: req.method})
res.json({req: req.headers})
});
*/

// router.post("/", function (req, res, next) {
//   let dados = [];
//   for (let i = 0; i < 999999; i++) {
//     dados.push({
//       nome: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa corporis atque, praesentium sapiente nam eligendi voluptatem earum possimus adipisci doloremque neque necessitatibus cumque. Quis enim iste dolorem praesentium quisquam incidunt sunt corrupti fuga veniam",
//     });
//   }
//   //res.json({dados: dados})
//   //res.render('result', {title: 'resultado', dados: dados});

//   //res.send(dados);
//   res.render("result", { title: "Gabriel", dados: dados });
// });

module.exports = router;
