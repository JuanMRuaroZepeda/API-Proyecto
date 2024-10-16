const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const Estados = require('../models/model.estados');
const Roles = require('../models/model.roles');
const Compra = require('../models/model.tipo_compra');
const Usuarios = require('../models/model.usuarios');
const Ventas = require('../models/model.ventas');
const TipoAgua = require('../models/model.tipo_agua');

dotenv.config();

//Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log('Email:', email); // Verificar que se reciba el email
    console.log('Password:', password); // Verificar que se reciba la contraseña

    if (!email || !password) {
        return res.status(400).send({
            message: 'Usuario y contrasena son incorrectos'
        });
    }

    try {
        const usuario = await Usuarios.findByEmail(email);

        if (!usuario) {
            return res.status(404).send({
                message: `Usuario no encontrado: ${email}.`
            });
        }

        console.log('Usuario encontrado:', usuario); // Verificar si el usuario es encontrado

        // Comparar contraseña
        const passwordIsValid = bcrypt.compareSync(password, usuario.password);
        console.log('Contraseña válida:', passwordIsValid); // Verificar si la comparación es correcta

        if (!passwordIsValid) {
            return res.status(401).send({
                message: 'Contrasena Invalida'
            });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
            expiresIn: 86400 // Token válido por 24 horas
        });

        return res.status(200).send({
            message: "Acceso a Cuenta",
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono,
            imagen: usuario.imagen,
            id_rol: usuario.id_rol,
            id_estado: usuario.id_estado,
            accessToken: token
        });
    } catch (err) {
        console.error('Error en la búsqueda de usuario:', err);
        return res.status(500).send({
            message: "Error encontrando el usuario " + email
        });
    }
};

//Crear 
exports.crearEstado = (req, res) => {
    const { nombre_estado } = req.body;

    if(!nombre_estado) {
        return res.status(400).send({
            message: "All fields are required."
        });
    }

    const newEstado = new Estados({
        nombre_estado
    });

    Estados.create(newEstado, (err, estado) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Status."
            });
        }
        res.send({ message: "Estado creado exitosamente!", estado});
    });
};

exports.crearRol = (req, res) => {
    const { nombre_rol } = req.body;

    if(!nombre_rol) {
        return res.status(400).send({
            message: "All fields are required."
        });
    }

    const newRol = new Roles({
        nombre_rol
    });

    Roles.create(newRol, (err, rol) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Role."
            });
        }
        res.send({ message: "Rol creado exitosamente!", rol});
    });
};

exports.crearTipo_Compra = (req, res) => {
    const { nombre_compra } = req.body;

    if(!nombre_compra) {
        return res.status(400).send({
            message: "All fields are required."
        });
    }

    const newCompra = new Compra({
        nombre_compra
    });

    Compra.create(newCompra, (err, compra) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Purchase Type."
            });
        }
        res.send({ message: "Tipo de compra creado exitosamente!", compra});
    });
};

exports.crearTipo_Agua = (req, res) => {
    const { nombre_agua } = req.body;

    if(!nombre_agua) {
        return res.status(400).send({
            message: "All fields are required."
        });
    }

    const newAgua  = new TipoAgua({
        nombre_agua
    });

    TipoAgua.create(newAgua, (err, gas) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Water Type."
            });
        }
        res.send({ message: "Tipo de Agua creado exitosamente!", gas});
    });    
};

exports.crearUsuario = (req, res) => {
    const { nombre, apellido, email, password, telefono, id_rol, id_estado} = req.body;
    const imagen = req.file;

    if( !nombre || !apellido || !email || !password || !imagen || !telefono || !id_rol || !id_estado){
        return res.status(400).send({
            message: 'All fields are required.'
        });
    }

    const hashedPassword = bcrypt.hashSync(password,8);
    const imagenpath = imagen.path;

    const newUsuario = new Usuarios({
        nombre,
        apellido,
        email,
        password: hashedPassword,
        imagen: imagenpath,
        telefono,
        id_rol,
        id_estado,
    });

    Usuarios.create(newUsuario, (err, usuario) => {
        if (err) {
            return res.status(500).send({
                message: err.message || 'Ocurrio un error mientras se creaba el usuario'
            });
        }
        res.send({ message: "Usuario creado exitosamente", usuario });
    });
};

exports.crearVenta = (req, res) => {
    const { cantidad, id_tipoagua, id_tipocompra, id_usuario } = req.body;

    // Verificar si los campos obligatorios están presentes
    if (!cantidad || !id_tipoagua || !id_tipocompra) {
        return res.status(400).send({
            message: 'All fields are required.'
        });
    }

    // Si id_usuario es undefined, null o vacío, asignar el valor 4
    const usuario = (id_usuario && id_usuario.trim()) ? id_usuario : 4;

    // Generar la fecha actual
    const fechaActual = new Date();

    const newVenta = new Ventas({
        cantidad,
        id_tipoagua,
        id_tipocompra,
        id_usuario: usuario, // Asignar id_usuario o 5
        fecha: fechaActual, // Asignar la fecha actual
    });

    // Crear la nueva venta en la base de datos
    Ventas.create(newVenta, (err, venta) => {
        if (err) {
            return res.status(500).send({
                message: err.message || 'Ocurrió un error mientras se creaba la venta'
            });
        }
        res.send({ message: "Venta creada exitosamente", venta });
    });
};

//Consultar
exports.consultarEstados = (req, res) => {
    Estados.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocurrio un error mientras se recuperaban los estados."
            });
        } else {
            res.send(data);
        }
    });
};

exports.consultarRoles = (req, res) => {
    Roles.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocurrio un error mientras se recuperaban los roles."
            });
        } else {
            res.send(data);
        }
    });
};

exports.consultarTipo_Compra = (req, res) => {
    Compra.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocurrio un error mientras se recuperaban los tipos de compra."
            });
        } else {
            res.send(data);
        }
    });
};

exports.consultarTipo_Agua = (req, res) => {
    TipoAgua.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocurrio un error mientras se recuperaban los tipos de agua."
            });
        } else {
            res.send(data);
        }
    });
};

exports.consultarUsuarios = (req, res) => {
    Usuarios.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocurrio un error mientras se recuperaban los usuarios."
            });
        } else {
            res.send(data);
        }
    });
};

exports.consultarVentas = (req, res) => {
    Ventas.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocurrio un error mientras se recuperaban las ventas."
            });
        } else {
            res.send(data);
        }
    });
};

//Actualizar
exports.actualizarEstado = (req, res) => {
    const {id} = req.params;
    const {nombre_estado} = req.body;

    const updateById = {
        nombre_estado: nombre_estado
    };

    Estados.updateById(id, updateById, (err, data) =>{
        if (err) {
            if(err.kind === "not_found") {
                return res.status(404).send({
                    message: `Estado con ID ${id} no encontrado.`
                });
            }
            return res.status(500).send({
                message: `Error al actualizar el estado con ID ${id}.`
            });
        }
        res.send({ message: `Estado actualizado exitosamente!`, data});
    });
};

exports.actualizarRol = (req, res) => {
    const {id} = req.params;
    const {nombre_rol} = req.body;

    const updateById = {
        nombre_rol: nombre_rol
    };

    Roles.updateById(id, updateById, (err, data) =>{
        if (err) {
            if(err.kind === "not_found") {
                return res.status(404).send({
                    message: `Rol con ID ${id} no encontrado.`
                });
            }
            return res.status(500).send({
                message: `Error al actualizar el rol con ID ${id}.`
            });
        }
        res.send({ message: `Rol actualizado exitosamente!`, data});
    });
};

exports.actualizarTipo_Compra = (req, res) => {
    const {id} = req.params;
    const {nombre_compra} = req.body;

    const updateById = {
        nombre_compra: nombre_compra
    };

    Compra.updateById(id, updateById, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                return res.status(404).send({
                    message: `Tipo de compra con ID ${id} no encontrado.`
                });
            }
            return res.status(500).send({
                message: `Error al actualizar el tipo de compra con ID ${id}.`
            });
        }
        res.send({ message: `Tipo Compra actualizado exitosamente!`, data });
    });
};

exports.actualizarTipo_Agua = (req, res) => {
    const {id} = req.params;
    const {nombre_agua} = req.body;

    const updateById = {
        nombre_agua: nombre_agua
    };

    TipoAgua.updateById(id, updateById, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                return res.status(404).send({
                    message: `Tipo de agua con ID ${id} no encontrado.`
                });
            }
            return res.status(500).send({
                message: `Error al actualizar el tipo de agua con ID ${id}.`
            });
        }
        res.send({ message: `Tipo de Agua actualizado exitosamente!`, data });
    });
};

exports.actualizarUsuarioById = (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, email, password, telefono, id_rol, id_estado } = req.body;
    const imagen = req.file;

    const usuario = { // Corrige el error tipográfico de "usuairo"
        nombre,
        apellido,
        email,
        password,
        telefono,
        id_rol,
        id_estado,
    };

    if (password) {
        usuario.password = bcrypt.hashSync(password, 8); // Hashear contraseña si es proporcionada
    }

    if (imagen) {
        usuario.imagen = imagen.path || "perfil\\shadow.png"; // Guardar ruta de la imagen
    }

    Usuarios.updateById(id, usuario, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Usuario con ID ${id} no encontrado.`,
                });
            } else {
                return res.status(500).send({
                    message: `Error al actualizar el usuario con ID ${id}.`,
                });
            }
        } else {
            res.json({ success: true, data }); // Enviar respuesta con campo success
        }
    });
};

exports.actualizarVenta = (req, res) => {
    const {id} = req.params;
    const {cantidad, id_tipoagua, id_tipocompra, id_usuario, fecha} = req.body;

    const updateById = {
        cantidad:cantidad,
        id_tipoagua:id_tipoagua,
        id_tipocompra:id_tipocompra,
        id_usuario:id_usuario,
        fecha:fecha || new Date(),
    };

    Ventas.updateById(id, updateById, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                return res.status(400).send({
                    message: `Venta con ID ${id} no encontrado.`
                });
            }
            return res.status(500).send({
                message: `Error al actualizar la venta con ID ${id}`
            });
        }
        res.send({ message: `Venta actualzada exitosamente! `, data});
    });
};

//Eliminar
exports.eliminarEstado = (req, res) => {
    const id = req.params.id;

    Estados.remove(id, (err, data) =>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message: `No se encontro el estado con el ID ${id}.`
                });
            } else {
                res.status(500).send({
                    message: `No se pudo elmiminar el estado con el ID ${id}.`
                });
            }
        } else res.send({ message: `Estado eliminado exitosamente!`});
    });
};

exports.eliminarRol = (req, res) => {
    const id = req.params.id;

    Roles.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Rol con ID ${id} no encontrado.`
                });
            } else {
                return res.status(500).send({
                    message: `Error al eliminar el rol con ID ${id}.`
                });
            }
        } else res.send({ message: `Rol eliminado exitosamente!`});
    });
};

exports.eliminarTipo_Compra = (req, res) => {
    const id = req.params.id;

    Compra.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Tipo Compra con ID ${id} no encontrado.`
                });
            } else {
                return res.status(500).send({
                    message: `Error al eliminar el Tipo Compra con ID ${id}.`
                });
            };
        } else res.send({ message: `Tipo Compra eliminado exitosamente!` });
    });
};

exports.eliminarTipo_Agua = (req, res) => {
    const id = req.params.id;

    TipoAgua.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Tipo Agua con ID ${id} no encontrado.`
                });
            } else {
                return res.status(500).send({
                    message: `Error al eliminar el Tipo Agua con ID ${id}.`
                });
            };
        } else res.send({ message: `Tipo Agua eliminada exitosamente!` });
    })
}

exports.eliminarUsuario = (req, res) => {
    const id = req.params.id;
    Usuarios.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Usuario con ID ${id} no encontrado.`
                });
            } else {
                return res.status(500).send({
                    message: `Error al eliminar el Usuario con ID ${id}.`
                });
            };
        } else res.send({ message: `Usuario eliminado exitosamente!` });
    });
};

exports.eliminarVenta = (req, res) => {
    const id = req.params.id;
    Ventas.remove(id, (err, data) => {
        if(err) {
            if( err.kind === "not_found" ){
                return res.status(404).send({
                    message: `Venta con ID ${id} no encontrada.`
                });
            } else {
                return res.status(500).send({
                    message: `Error al eliminar la Venta con ID ${id}.`
                });
            };
        } else res.send({ message: `Venta elminada exitosamente!`});
    });
};