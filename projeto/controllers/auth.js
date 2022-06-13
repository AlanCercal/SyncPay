const localStrategy = require("passport-local").Strategy;
//const bcrypt = require("bcry")

const Usuario = require("../models/Banco")[0];

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "senha" },
      (email, senha, done) => {
        Usuario.findOne({ email: email }).then((usuario) => {
          if (!usuario)
            return done(null, false, { mensage: "está conta não exite" });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    user.findById(id, (err, usuario) => {
      done(err, user);
    });
  });
};
