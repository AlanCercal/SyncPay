const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const conn = require("./db/conn");

const Aluno = require("./models/Aluno");

const alunoRoutes = require("./routes/alunosRoutes");
const principalRoutes = require("./routes/principal");
const loginRoutes = require("./routes/login");
const cartoesRoutes = require("./routes/cartoes");
const pagamentosRoutes = require("./routes/pagamentos");
const usersRoutes = require("./routes/users");

app.engine("handlebars", exphbs( {
  extname: 'handlebars', 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//exphbs.registerPartials(__dirname + "/views/partials");

app.use("/alunos", alunoRoutes);
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
