const db = require('../config/db');

const TipoAgua = function (gas) {
    this.nombre_agua = gas.nombre_agua;
};

//Crear Tipo Agua
TipoAgua.create = (newAgua, result) => {
    db.query('INSERT INTO tipo_agua SET ?', newAgua, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newAgua });
    });
};

//Eliminar Tipo Agua
TipoAgua.remove = (id, result) => {
    db.query("DELETE FROM tipo_agua WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

//Consultar TODOS los tipo de Agua
TipoAgua.findAll = (result) => {
    db.query('SELECT * FROM tipo_agua', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//Actualizar tipo agua
TipoAgua.updateById = (id, newAgua, result) => {
    db.query(
        `UPDATE tipo_agua SET nombre_agua = ? WHERE id = ?`,
        [newAgua.nombre_agua, id],
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
            result(null, { id: id, ...newAgua });
        }
    );
};

module.exports = TipoAgua;