const express = require('express');

// lib para permitir e salvar imagem na requisição http
const multer = require('multer');
const uploadConfig = require('./configs/upload');

const router = new express.Router();
const upload = multer(uploadConfig);

const postController = require('./controllers/postController');
const likeController = require('./controllers/likeControllers');

// adicionado o midle do multer para poder receber dados e multiplos formatos ex: imagem
router.post('/posts', upload.single('image'), postController.create);
router.post('/posts/:id/like', likeController.create);
router.get('/posts', postController.index);
module.exports = router;
