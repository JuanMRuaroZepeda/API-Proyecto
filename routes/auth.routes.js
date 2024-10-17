const nodemailer = require('nodemailer');
const express = require('express');
const authController = require('../controladores/auth.controlador');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = (uploadPerfil) => {
    const Rutas = express.Router(); // Definir las rutas

    //Login
    Rutas.post('/login', authController.login);

    //Crear
    Rutas.post('/nuevo-estado', authController.crearEstado);
    Rutas.post('/nuevo-rol', authController.crearRol);
    Rutas.post('/nuevo-tipo_compra', authController.crearTipo_Compra);
    Rutas.post('/nuevo-tipo_agua', authController.crearTipo_Agua);
    Rutas.post('/nuevo-usuario', uploadPerfil.single('imagen'), authController.crearUsuario);
    Rutas.post('/nueva-venta', authController.crearVenta);

    //Consultar
    Rutas.get('/obtener-estados', authController.consultarEstados);
    Rutas.get('/obtener-roles', authController.consultarRoles);
    Rutas.get('/obtener-tipo_compras', authController.consultarTipo_Compra);
    Rutas.get('/obtener-tipo_agua', authController.consultarTipo_Agua);
    Rutas.get('/obtener-usuarios', authController.consultarUsuarios);
    Rutas.get('/obtener-ventas', authController.consultarVentas);

    //Actualizar
    Rutas.put('/actualizar-estado/:id', authController.actualizarEstado);
    Rutas.put('/actualizar-rol/:id', authController.actualizarRol);
    Rutas.put('/actualizar-tipo_compra/:id', authController.actualizarTipo_Compra);
    Rutas.put('/actualizar-tipo_agua/:id', authController.actualizarTipo_Agua);
    Rutas.put('/actualizar-usuario/:id', uploadPerfil.single('imagen'), authController.actualizarUsuarioById);
    Rutas.put('/actualizar-venta/:id', authController.actualizarVenta);

    //Eliminar
    Rutas.delete('/eliminar-estado/:id', authController.eliminarEstado);
    Rutas.delete('/eliminar-rol/:id', authController.eliminarRol);
    Rutas.delete('/eliminar-tipo_compra/:id', authController.eliminarTipo_Compra);
    Rutas.delete('/eliminar-tipo_agua/:id', authController.eliminarTipo_Agua);
    Rutas.delete('/eliminar-usuario/:id', authController.eliminarUsuario);
    Rutas.delete('/eliminar-venta/:id', authController.eliminarVenta);

    //Exportar base de datos y enviarlo por correo electronico
    Rutas.get('/respaldar-base-datos', (req, res) => {
        exec('node backup.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al realizar el respaldo: ${error.message}`);
                return res.status(500).send(`Error al realizar el respaldo: ${error.message}`);
            }
            if (stderr) {
                console.error(`Error: ${stderr}`);
                return res.status(500).send(`Error: ${stderr}`);
            }
    
            const backupFile = stdout.trim(); // Obtener solo la ruta del archivo de respaldo
            console.log(`Ruta del archivo de respaldo: ${backupFile}`); // Log adicional
    
            // Verificar si el archivo existe
            if (!fs.existsSync(backupFile)) {
                console.error(`El archivo de respaldo no se encontró: ${backupFile}`);
                return res.status(404).send('El archivo de respaldo no se encontró.');
            }
    
            // Configura el transportador de nodemailer
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true para 465, false para otros puertos
                auth: {
                    user: 'al222210649@@gmail.com', // Cambia esto por tu correo
                    pass: 'hzcb mpfq zeee qfoy', // Cambia esto por tu contraseña
                },
            });
    
            // Configura el correo
            const mailOptions = {
                from: 'al2222106492@gmail.com', // Cambia esto por tu correo
                to: 'al222210649@gmail.com, al222111538@gmail.com, al222210557@gmail.com, alu222210663@gmail.com, al222210723@gmail.com, al222210758@gmail.com, al222111277@gmail.com', // Correo del destinatario
                subject: 'Respaldo de base de datos',
                text: 'Adjunto el respaldo de la base de datos, esta copia se manda desde la API (Servidor), considerando que se guarda una copia en el mismo servidor y se envia una copia solo a los correos permitidos.',
                attachments: [
                    {
                        filename: path.basename(backupFile),
                        path: backupFile,
                    },
                ],
            };
    
            // Envía el correo
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error(`Error al enviar el correo: ${err.message}`);
                    return res.status(500).send('Error al enviar el correo.');
                }
                console.log(`Correo enviado: ${info.response}`);
                res.send('El archivo de respaldo se ha enviado al correo electrónico.');
            });
        });
    });  

    return Rutas; // Retornar las rutas
};