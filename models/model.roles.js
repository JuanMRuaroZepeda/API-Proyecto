const db = require('../config/db');

const Roles = function (rol) {
    this.nombre_rol = rol.nombre_rol;
};

//Crear Rol
Roles.create = (newRol, result) =>{
    db.query('INSERT INTO roles SET ?', newRol, (err, res) =>{
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newRol});
    });
};

//Eliminar Rol
Roles.remove = (id, result) => {
    db.query("DELETE FROM roles WHERE id = ?", id, (err, res) => {
        if(err) {
            console.log('error', err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }
        result(null, res);
    });
};

//Consultar TODOS los roles
Roles.findAll = (result) => {
    db.query('SELECT * FROM roles', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//Actualizar Rol
Roles.updateById = (id, rol, result) => {
    db.query(
        `UPDATE roles SET nombre_rol = ? WHERE id = ?`,
        [rol.nombre_rol, id],
        (err, res) => {
            if (err) {
                console.log('Error: ', err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...rol});
        }
    );
};

module.exports = Roles;