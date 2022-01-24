# Restserver

## Descripción

Servidor api REST creado con express utilizando clases

---

## Módulos utilizados

### Express

Framework web minimalista, rápido y sin opiniones para node.

- Link: https://www.npmjs.com/package/express
- Homepage : https://expressjs.com/

### CORS

CORS es un paquete de node.js para proporcionar un middleware Connect/Express que se puede usar para habilitar CORS con varias opciones.

- Link: https://www.npmjs.com/package/cors
- Homepage: https://github.com/expressjs/cors#readme

### BcryptJS

**bcrypt** optimizado en JavaScript con cero dependencias. Compatible con el enlace bcrypt de C++ en node.js y también funciona en el navegador.

- Link: https://www.npmjs.com/package/bcryptjs
- Homepage : https://github.com/dcodeIO/bcrypt.js#readme

### Express validator

Un middleware express.js para el validador.

- Link: https://www.npmjs.com/package/express-validator
- Homepage: https://express-validator.github.io/docs/

### JSON Web Token

Esto fue desarrollado contra draft-ietf-oauth-json-web-token-08. Hace uso de node-jws.

- Link : https://www.npmjs.com/package/jsonwebtoken
- Homepage : https://github.com/auth0/node-jsonwebtoken#readme

## Recursos | Base de datos

### MongoDB Atlas

**MongoDB Atlas.** La plataforma de datos de aplicaciones multinube. An integrated suite of cloud database and data services to accelerate and simplify how you build with data.

- Link: https://www.mongodb.com/atlas

### MongoDB Compass

**Compass** es una herramienta interactiva para consultar, optimizar y analizar sus datos de MongoDB. Obtenga información clave, arrastre y suelte para crear canalizaciones y más.

- Link: https://www.mongodb.com/products/compass

### Mongoose

Elegante modelador de objetos (ODM: Objet Data Model) mongodb para node.js. Seamos realistas, escribir la validación, la conversión y la lógica empresarial de MongoDB es una lata. Por eso escribimos Mongoose.

- Link : https://mongoosejs.com/

### Conexión con MongoDB

1. Registrarse o iniciar sesión en [MongoDB Atlas](https://account.mongodb.com/account/login)
2. Crear un nuevo **Cluster**
3. Crear un nuevo **Database Access**
4. Instalar [MongoDB Compass](https://www.mongodb.com/products/compass)
5. Crear una conexión utilizando los datos de **MongoDB Atlas** Ej: `mongodb+srv://<username>:<password>@cluster0.83pxm.mongodb.net/test`
6. Cambiar _username_ y _password_ por las credenciales obtenidas en **MongoDB Atlas**
7. Conectar con **MongoDB Compass**
8. Instalar, requerir y configurar **Mongoose**

```
const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('db connected success')

    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la base de datos')
    }

}
```

- Requerir la conexión `dbConnection()` y crear el método `connectionDB()`:

```
    async connectionDB(){
        await dbConnection();
    }
```

- Añadir al `constructor()`:

```
    this.connectionDB();
```

### Crear el modelo de la base de datos

- Modelo Usuario:

```
const {Schema, model} =require('mongoose');

const UserSchema = Schema({

    name : {
        type : String,
        required : [true, 'El nombre es obligatorio'],
    },
    email : {
        type : String,
        required : [true, 'El correo es obligatorio'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'La contraseña es obligatoria'],
    },
    img : {
        type : String,
    },
    rol : {
        type : String,
        required : true,
         enum: {
            values : ['ADMIN_ROL','USER_ROL'],
            message: '{VALUE} no es soportado'
        }
    },
    state : {
        type : Boolean,
        default : true
    },
    google : {
        type : Boolean,
        default : false
    }
});

module.exports = model('User',UserSchema);
```

### Crear un usuario en la base de datos

1. **Requerir** el _modelo_ en el _controlador_: `const User = require('../models/user');`
2. En el _método_ `usesrPost()` **crear** una instancia del modelo pasandole el body recibido por parámetro: `const user = new User(body);`
3. **Guardar** el documento con la siguiente línea: `await user.save()`, procurando que el método sea asíncrono.

## Recursos | Autenticación - Auth - Login

### JWT

Los tokens web JSON son un método RFC 7519 estándar de la industria abierto para representar reclamos de forma segura entre dos partes.

- Link : https://jwt.io/
- Función para desencriptar JWT:

```
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};
```

### Google Sign-In for Website

Google Sign-In administra el flujo de OAuth 2.0 y el ciclo de vida del token, lo que simplifica su integración con las API de Google. Un usuario siempre tiene la opción de revocar el acceso a una aplicación en cualquier momento.

- Documentación: https://developers.google.com/identity/sign-in/web/sign-in

### Configuración Frontend

1. Crear credenciales de autorización

- Ir a la [Página de credenciales](https://console.cloud.google.com/apis/credentials?project=ultimate-bit-264109).
- Haga clic en Crear credenciales> ID de cliente de OAuth.
- Seleccione el tipo de aplicación de la **aplicación web**.
- Nombre su cliente OAuth 2.0 y haga clic en **Crear**.

2. Cargar la biblioteca de Google Platform

Debe incluir la biblioteca de Google Platform en sus páginas web que integran el inicio de sesión de Google.

```
<script src="https://apis.google.com/js/platform.js" async defer></script>
```

3. Especifique el ID de cliente de su aplicación

Especifique el ID de cliente que creó para su aplicación en Google Developers Console con el meta elemento google-signin-client_id .

```
<meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">
```

4. Agregar un botón de inicio de sesión de Google

Para crear un botón de inicio de sesión de Google que utilice la configuración predeterminada, agregue un elemento div con la clase `g-signin2` a su página de inicio de sesión:

```
<div class="g-signin2" data-onsuccess="onSignIn"></div>
```

5. Obtener información de perfil

Para recuperar información de perfil de un usuario, use el método `getBasicProfile()`.

```
<script>
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
</script>

```

_**Importante**: No utilice los ID de Google devueltos por getId() o la información del perfil del usuario para comunicar el usuario que ha getId() actualmente con su servidor backend. En su lugar, envíe tokens de identificación , que se pueden validar de forma segura en el servidor._

6. Cerrar sesión como usuario

Para crear un enlace de `GoogleAuth.signOut()` sesión, adjunte una función que llame al método `GoogleAuth.signOut()` al evento onclick del enlace.

```
<a href="#" onclick="signOut();">Sign out</a>

<script>
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
</script>

```

### Configuraciones Backend

1. Crear el método que reciba `id_token` generado por google:

```
const googleSignin = (req, res = response) => {

    const {id_token} = req.body;

    return res.json({
        ok : true,
        msg : 'Google Signin OK',
    })
}
```

2. Crear la ruta, preferentemente por `POST` que valide la existencia de este `id_token`

```
   .post('/google',[
        check('id_token','El id_token es obligatorio').notEmpty(),
        validateFiels
    ],googleSignin)
```

3. Obtener el `id_token` y enviarlo por **fetch** al **backend**

```
 var id_token = googleUser.getAuthResponse().id_token;
    //console.log(id_token)

    try {

        let response = await fetch(url, {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                id_token
            })
        })
        let result = await response.json();
        console.log(result)

    } catch (error) {
        console.error(error)
    }
```
4. Instalar el paquete de Google para validar el _id_token_ en el **backend**: `npm install google-auth-library`
5. Crear un **helper** que verifique la cuenta de google con el siguiente código:
~~~
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (idToken) => {

    //verificar la autenticidad del id_token
    const ticket = await client.verifyIdToken({
        idToken,
        audience : process.env.GOOGLE_CLIENT_ID
    })

    //extraer los datos necesarios que provee google
    const {name, picture : img, email} = ticket.getPayload();

    //retornar los datos extraidos
    return {
        name,
        img,
        email
    };

}

module.exports = {
    googleVerify
}
~~~
6. Completar el método `googleSignin` obteniendo los datos del **helper**
~~~
const googleSignin = async (req, res = response) => {

    //recibir el id_token desde el frontend
    const {id_token} = req.body;

    try {

        //recibir los datos de google
        const googleUser = await googleVerify(id_token);

        //console.log(googleUser)

        return res.json({
            ok : true,
            msg : 'Google Signin OK',
        })
        
    } catch (error) {
        
        return res.status(400).json({
            ok : false,
            msg : ' Token no válido'
        })
    }  
}
~~~
7. Guardar en la base de datos la información si el usuario no está registrado y generar el  token
~~~
const googleSignin = async (req, res = response) => {

    //recibir el id_token desde el frontend
    const {id_token} = req.body;

    try {

        //recibir los datos de google
        const {email, name, img} = await googleVerify(id_token);
        //console.log(googleUser)

        //buscar si el email está registrado
        let user = await User.findOne({email});
        //console.log(user)

        //crear el usuario si este no existe en la base de datos
        if(!user){

            const data = {
                name,
                email,
                password : 'es indistinto!',
                img,
                google : true
            }

            user = new User(data);
            await user.save()
            
        }

        //validar que el usuario esté activo
        if(!user.state){
            return res.status(400).json({
                ok: false,
                msg : 'Usuario bloqueado, hable con el adminsitrador'
            })
        }

        //Generar el JWT
        const token = await jwtGenerator(user.id);

        //retornar la información
        return res.json({
            ok : true,
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok : false,
            msg : ' Token no válido'
        })
    }
    
}
~~~