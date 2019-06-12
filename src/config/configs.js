const env = process.env.NODE_ENV || 'dev';



const config = () => {
    switch(env){
        case 'dev':
        return {
            url_bd: `SUA_STRING_DE_CONEXAO`,
            jwt_pass: 'SUA_SENHA_SECRETA',
            jwt_expired_in: '7d'            
        }     
    }
}

module.exports = config();
