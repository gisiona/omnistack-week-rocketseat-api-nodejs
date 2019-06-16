const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./configs/configs');
const path = require('path');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// CONFIGURACAO DO BODY-PARSER PARA RECEBER OS PARAMETROS PASSADO NO CORPO (BODY) DA REQUISICAO
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CONFIGURACAO DA CONEXAO COM O BANCO DE DADOS
const URL = config.url_bd;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(URL, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (erro) => {
    console.log('ERRO NA CONEXÃO COM O BANCO DE DADOS ' + erro);
});

mongoose.connection.on('connected', () => {
    console.log('APLICAÇÃO CONECTADA COM SUCESSO DO BANCO DE DADOS ');
});

mongoose.connection.on('disconnected', () => {
    console.log('APLICAÇÃO DISCONECTADA COM SUCESSO DO BANCO DE DADOS ');
});


app.use((req, res, next) => {
    req.io = io;
    next();
})
// permitindo que a API seja acessada de qualquer dominio que nao seja o proprio da aplicacao.
app.use(cors());

// permitindo acessar as imagens atraves de uma rota http.
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));


// CONFIGURACAO DAS ROTAS
app.use(require('./router'));


server.listen(3000, function(){
    console.log('API RODANDO NO SERVIDOR LOCAL NA PORTA = ' + 3000);
});
