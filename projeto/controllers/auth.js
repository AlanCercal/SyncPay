const localStrategy = require("passport-local").Strategy;

const banco = require("../models/Banco");
const Usuario = banco[0];

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "senha" },
      (email, senha, done) => {
        Usuario.findOne({ raw: true, where: { email: email } }).then(
          (usuario) => {
            if (!usuario) {
              return done(null, false, { mensage: "esta conta não existe" });
            }
            let batem = senha === usuario.senha;
              console.log(batem);
              if (batem) {
                return done(null, usuario);
              } else {
                return done(null, false, { mensage: "senha incorreta!!!" });
              }
            
          }
        );
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Usuario.findOne({where: {id: id}}).then((err, user) => {
      done(err, user);
    });
  });

};

// module.exports = function (passport) {
//   function findUser(email) {
//     return Usuario.find((user) => user.email === email);
//   }
//   function findUserById(id) {
//     return Usuario.find((user) => user.id === id);
//   }

//   passport.use(
//     new localStrategy(
//       { usernameField: "email", passwordField: "senha" },
//       (email, senha, done) => {
//         // Usuario.findOne({ email: email }).then((usuario) => {
//         //   if (!usuario)
//         //     return done(null, false, { mensage: "está conta não exite" });
//         // });
//         console.log("PASSOU AQUI 1\n\n");
//         try {
//           const user = findUser(email);
//           if (!user) {
//             console.log("PASSOU AQUI 1\n\n");
//             return done(null, false);
//           }
//           const isValid = senha === user.senha; //bcrypt.compareSync(senha, user.senha);
//           if (!isValid) {
//             console.log("PASSOU AQUI 2\n\n");
//             return done(null, false);
//           }
//           console.log("PASSOU AQUI 3\n\n");
//           return done(null, user);
//         } catch (err) {
//           done(err, false);
//         }
//       }
//     )
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
//   passport.deserializeUser((id, done) => {
//     // user.findById(id, (err, usuario) => {
//     //   done(err, user);
//     // });
//     try {
//       const user = findUserById(id);
//       done(null, user);
//     } catch (err) {
//       done(err, null);
//     }
//   });
// };
