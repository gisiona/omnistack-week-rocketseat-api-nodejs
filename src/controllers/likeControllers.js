const Post = require('../models/postModel');

module.exports = {
    async create(req,res){
        try{
            console.log(req.params.id)
             // pesquisando todos os registros e ordenando através da data de criacao
            const posts = await Post.findById(req.params.id);

            if(posts){
                return res.status(400).send({error: 'Post não encontrado.'});
            }
            // adicionando +1 like no post
            posts.likes += 1;

            // salvando o post atualizado.
            posts.save();
            
            //adicionado o ultimo post adicionado na requisicao atraves do protoclo io e permitindo que todos os usuarios tenha acesso a esta informacao.
            req.io.emit('like', post);

            // retornando os dados do post atualizado com os likes.
            return res.status(201).send({posts, retorno:'Dados dos posts retornado com sucesso.'})
        }catch{
            return res.status(400).send({error: 'Ocorreu um erro ao retornar os posts, tente novamente mais tarde.'});
        }       
    }
}