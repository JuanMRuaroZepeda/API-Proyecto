const db = require('../config/db');

const Usuarios = function (usuario) {
    this.nombre = usuario.nombre;
    this.apellido = usuario.apellido;
    this.email = usuario.email;
    this.password = usuario.password;
    this.telefono = usuario.telefono;
    this.imagen = usuario.imagen || "perfil\\shadow.png";
    this.id_rol = usuario.id_rol;
    this.id_estado = usuario.id_estado;
};

//Crear Usuario
Usuarios.create = (newUsuario, result) => {
    db.query('INSERT INTO usuarios SET ?', newUsuario, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newUsuario });
    });
};

//Buscar usuario por email
Usuarios.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res[0]);
        });
    });
};

//Buscar usuario por Invitado (rol = 4)
Usuarios.findByRole4 = (result) => {
    db.query('SELECT * FROM usuarios WHERE id_rol = 4', (err, res) => {
        if (err) {
            console.log("Error: ",err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
        result({ kind:"not_found" }, null);
    });
};

//Obtener TODOS los usuarios
Usuarios.findAll = (result) => {
    db.query('SELECT * FROM usuarios', (err, res) => {
        if (err) {
            console.log("Error: ",err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

//Eliminar Usuario
Usuarios.remove = (id, result) => {
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, res) => {
        if (err) {
            console.log("Error: ",err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

//Actualizar usuario por ID
Usuarios.updateById = (id, usuario, result) => {
    db.query(
        `UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, password = ?, telefono = ?, imagen = ?, id_rol = ?, id_estado = ? WHERE id = ?`,
        [usuario.nombre, usuario.apellido, usuario.email, usuario.password, usuario.telefono, usuario.imagen || "perfil\\shadow.png", usuario.id_rol, usuario.id_estado, id],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if(res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...usuario });
        }
    );
};

module.exports = Usuarios;