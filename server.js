const axios = require('axios');
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});


passport.use(
    new GitHubStrategy(
      {
        clientID: 'SEU_CLIENT_ID',
        clientSecret: 'SEU_CLIENT_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );
  
  app.use(passport.initialize());

  
  app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);


app.get('/pacientes', (req, res) => {
    const pacientes = [
      { id: 1, nome: 'João', idade: 30 },
      { id: 2, nome: 'Maria', idade: 25 },
      { id: 3, nome: 'José', idade: 40 },
    ];
    res.json(pacientes);
  });


  passport.use(new GitHubStrategy({
    clientID: '62d6eeced82cb471dcb3',
    clientSecret: 'seu-client-secret',
    callbackURL: 'http://localhost:3000/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // Aqui você pode verificar se o usuário existe no banco de dados e criar um novo usuário, se necessário
    return done(null, { accessToken, profile });
  }
));


app.use(cookieParser());
app.use(session({
  secret: 'seu-segredo',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Salva o token de acesso do Github em um cookie ou em um armazenamento local do navegador
    req.session.accessToken = req.user.accessToken;
    res.redirect('/');
  });


  app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Salva o token de acesso do Github em um cookie ou em um armazenamento local do navegador
    req.session.accessToken = req.user.accessToken;
    res.redirect('/');
  });


//   axios.get('/api/pacientes', {
//     headers: { Authorization: `Bearer ${accessToken}` }
//   })

  // faz a autenticação do usuário e armazena o token de acesso do Github em um cookie ou armazenamento local
// ...

// define a variável accessToken com o valor do token de acesso do Github
// const accessToken = /* valor do token de acesso do Github */;

// faz uma chamada GET para o endpoint '/api/pacientes' do servidor
axios.get('/api/pacientes', {
  headers: { Authorization: `Bearer ${accessToken}` }
})
  .then(response => {
    // processa a resposta do servidor
    console.log(response.data);
  })
  .catch(error => {
    // trata o erro da chamada ao servidor
    console.error(error);
  });

  