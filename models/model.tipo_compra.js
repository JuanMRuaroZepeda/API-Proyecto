const db = require('../config/db');

const Compras = function (compra) {
    this.nombre_compra = compra.nombre_compra;
};

//Crear Tipo Compra
Compras.create = (newCompra, result) =>{
    db.query('INSERT INTO tipo_compra SET ?', newCompra, (err, res) =>{
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newCompra });
    });
};

//Eliminar Tipo Compra
Compras.remove = (id, result) => {
    db.query("DELETE FROM tipo_compra WHERE id = ?", id, (err, res) => {
        if(err) {
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

//Consultar TODOS los tipos de compras
Compras.findAll = (result) => {
    db.query('SELECT * FROM tipo_compra', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//Actualizar tipo compra
Compras.updateById = (id, newCompra, result) => {
    db.query(
        `UPDATE tipo_compra SET nombre_compra = ? WHERE id = ?`,
        [newCompra.nombre_compra, id],
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
            result(null, { id: id, ...newCompra });
        }
    );
};

module.exports = Compras;