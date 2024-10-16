const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Configurar variables de entorno
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Configuración de almacenamiento para subir archivos
const storagePerfil = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'perfil/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Middleware para subir archivos
const uploadPerfil = multer({ storage: storagePerfil });

// Importar las rutas y pasar el middleware si es necesario
const Rutas = require('./routes/auth.routes');
app.use('/api/serverlab', Rutas(uploadPerfil));

// Configurar el puerto
const PORT = process.env.PORT || 3003;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://192.168.100.115:${PORT}/api/serverlab.`);
});
