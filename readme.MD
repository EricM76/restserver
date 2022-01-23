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
~~~
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};
~~~