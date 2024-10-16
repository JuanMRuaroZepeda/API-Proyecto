const db = require('../config/db');

const Estados = function (estado) {
    this.nombre_estado = estado.nombre_estado;
};

//Crear Estado
Estados.create = (newEstado, result) => {
    db.query('INSERT INTO estados SET ?', newEstado, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        result(null, { id: res.inserId, ...newEstado });
    });
};

//Eliminar Estado
Estados.remove = (id, result) => {
    db.query('DELETE FROM estados WHERE id = ?', [id], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found"}, null);
            return;
        }
        result(null, res);
    });
};

//Consultar TODOS los Estados
Estados.findAll = (result) => {
    db.query('SELECT * FROM estados', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//Actualizar Estado
Estados.updateById = (id, estado, result) => {
    db.query(
        "UPDATE estados SET nombre_estado = ? WHERE id = ?",
        [estado.nombre_estado, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...estado });
        }
    );
};

module.exports = Estados;