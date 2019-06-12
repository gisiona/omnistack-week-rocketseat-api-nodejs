const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/configs');
const app = express();

// CONFIGURACAO DO BODY-PARSER PARA RECEBER OS PARAMETROS PASSADO NO CORPO (BODY) DA REQUISICAO
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURACAO DAS ROTAS DA API
app.use(require('./routers'));

// CONFIGURACAO DA CONEXAO COM O BANCO DE DADOS
const options_bd_connection = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };
mongoose.connect(config.url_bd, options_bd_connection);
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

app.listen(3000, function(){
    console.log('API RODANDO NO SERIDOR LOCAL NA PORTA = ' + 3000);
});

