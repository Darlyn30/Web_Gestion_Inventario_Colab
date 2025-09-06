const express = require('express');
const router = express.Router();
const UsuarioService = require('../Services/Usuario.Service');


router.post('/crear-usuario', async(req, res) => {
    try {
        console.log("Datos recibidos en req.body:", req.body); // Log para depurar
        const {Nombre, UserName, Password } = req.body;
        if (!Nombre || !UserName || !Password) {
            return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
        }

        const usuario = await UsuarioService.crearUsuario(Nombre, UserName, Password);
        res.status(201).json({ mensaje: 'usuario creado', usuario });
    } catch (error) {
        console.error("Error en POST /usuario/create:", error.message);
        res.status(500).json({ mensaje: 'Error interno: ' + error.message });
    }
});

router.get('/obtener-todos', async (req, res) => {
    try {
        const result = await UsuarioService.obtenerUsuarios();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error en GET /usuario:", error.message);
        res.status(500).json({ mensaje: 'Error interno: ' + error.message });
    }
});

router.get("/obtener-por-id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await UsuarioService.obtenerUsuariosPorId(id);
        res.status(200).json(result);
    } catch(err){
        console.error(err);
        res.status(500).json({mensaje: "Error interno " + err.message});
    }
})

router.put("/editar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const nuevosDatos = req.body;

        const usuarioActualizado = await UsuarioService.editarUsuario(id, nuevosDatos);
        res.status(200).json(usuarioActualizado);
    } catch(err){
        res.status(500).json({mensaje: `Error interno ${err.message}`});
    }
})

router.delete("/eliminar/:id", async (req, res) => {
    // PENDIENTE
    try {
        const id = req.params.id;
        const result = await UsuarioService.borrarUsuario(id);
        res.status(200).json(result);
    } catch(err){
        res.status(500).json({ mensaje: 'Error interno: ' + err.message });
    }
})

module.exports = router;