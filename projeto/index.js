const express = require("express");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

// require("./controllers/auth")(passport);
// app.use(
//   session({
//     secret: "chave secreta grande",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(flash());
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash("success_msg");
//   res.locals.error_msg = req.flash("error_msg");
//   res.locals.error = req.flash("error");
//   next();
// });

const conn = require("./db/conn");

const Usuario = require("./models/Banco");

const usuarioRoutes = require("./routes/usuariosRoutes");
const principalRoutes = require("./routes/principal");
const loginRoutes = require("./routes/login");
const cartoesRoutes = require("./routes/cartoes");
const pagamentosRoutes = require("./routes/pagamentos");
const usersRoutes = require("./routes/users");

app.engine(
  "handlebars",
  exphbs({
    extname: "handlebars",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//exphbs.registerPartials(__dirname + "/views/partials");

app.use("/usuarios", usuarioRoutes);
app.use("/", principalRoutes);
app.use("/login", loginRoutes);
app.use("/cartoes", cartoesRoutes);
app.use("/pagamentos", pagamentosRoutes);
app.use("/users", usersRoutes);

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
