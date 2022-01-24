const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//recibe el idToken capturado en el frontend
const googleVerify = async (idToken) => {

    //verificar que el idToken sea válido
    const ticket = await client.verifyIdToken({
        idToken,
        audience : process.env.GOOGLE_CLIENT_ID
    })

    //extraer los datos necesarios que provee google
    const {name, picture : img, email} = ticket.getPayload();

    //retorna los datos capturados de google
    return {
        name,
        img,
        email
    };

}

module.exports = {
    googleVerify
}