const db = require('../config/db');

const Ventas = function (venta) {
    this.cantidad = venta.cantidad;
    this.id_tipoagua = venta.id_tipoagua;
    this.id_tipocompra = venta.id_tipocompra;
    this.id_usuario = venta.id_usuario;
    this.fecha = venta.fecha || new Date();
};

//Crear Venta
Ventas.create = (newVenta, result) => {
    db.query('INSERT INTO venta SET ?', newVenta, (err, res) =>{
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }
        result(null, { id: res.insertId, ...newVenta });
    });
};

//Eliminar Venta
Ventas.remove = (id, result) => {
    db.query('DELETE FROM venta WHERE id = ?', id, (err, res) =>{
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        result(null, res);
    });
};

//Consultar TODAS las ventas
Ventas.findAll = (result) =>{
    db.query('SELECT * FROM venta', (err, res) =>{
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Ventas.updateById = (id, venta, result) => {
    db.query(
        "UPDATE venta SET cantidad = ?, id_tipoagua = ?, id_tipocompra = ?, id_usuario = ?, fecha = ? WHERE id = ?",
        [venta.cantidad, venta.id_tipoagua, venta.id_tipocompra, venta.id_usuario, venta.fecha, id],
        (err, res) => {
            if (err) {
                console.log(err);
                result(null, err);
                return;
            }
            if(res.affectedRows == 0){
                result({ kind: 'not_found' }, null);
                return;
            }
            result(null, { id: id,...venta });
        }
    );
};

module.exports = Ventas;