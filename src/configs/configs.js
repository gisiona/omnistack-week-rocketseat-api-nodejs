const env = process.env.NODE_ENV || 'dev';
const pass_bd_dev = 'SENHA_PROD';
const pass_bd_hml = 'senha_hml';
const pass_bd_prod = 'senha_prod';

const config = () => {
    switch(env){
        case 'dev':
        return {
            url_bd: `STRING CONNECTION`,
            jwt_pass: 'SUA_SENHA_SECRETA',
            jwt_expired_in: '7d'
        }

        case 'hml':
        return {
            url_bd: `STRING CONNECTION`,
            jwt_pass: 'SUA_SENHA_SECRETA',
            jwt_expired_in: '7d'
        }

        case 'prod': 
        return{
            url_bd: `STRING CONNECTION`,
            jwt_pass: 'SUA_SENHA_SECRETA',
            jwt_expired_in: '7d'
        }        
    }
}

console.log(`API ESTÁ RODANDO NO AMBIENTE : ${ env.toUpperCase() }`);

module.exports = config();
