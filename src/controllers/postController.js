const Post = require('../models/postModel');
const sharp = require('sharp'); // lib para redimencionar o tamanho da imagem
const path = require('path');
const fs = require('fs');


module.exports = {
    async index(req,res){
        try{
             // pesquisando todos os registros e ordenando através da data de criacao
            const posts = await Post.find().sort('-createdAt');
            return res.status(200).send({posts, retorno:'Dados dos posts retornado com sucesso.'})
        }catch{
            return res.status(401).send({error: 'Ocorreu um erro ao retornar os posts, tente novamente mais tarde.'});
        }       
    },

    
    async create(req,res){
        console.log(req.file);
        try{
            const { autor, place, description,hashtags } = req.body;
            const { filename: image } = req.file;
            const [name] = image.split('.');

            // adicionando uma extensão unica para todos os arquivos
            const fileName = `${name}.jpg`; 

            // diminuindo o tamanho da imagem original 
            await sharp(req.file.path)
                        .resize(500)
                        .jpeg({quality: 70})
                        .toFile(path.resolve(req.file.destination, 'resized', fileName)
            );

            //deletando aquirvo original
            fs.unlinkSync(req.file.path);

            const post  = await Post.create({
                autor,
                place,
                description,
                hashtags,
                fileName
            });

            // adicionado o ultimo post adicionado na requisicao atraves do protoclo io e permitindo que todos os usuarios tenha acesso a esta informacao.
            req.io.emit('post', post);

            return res.json({post, retorno: 'Post criado com sucesso'});
        }catch{
            return res.status(401).send({error: 'Ocorreu um erro ao criar o post, tente novamente mais tarde.'});
        }  
    }
}