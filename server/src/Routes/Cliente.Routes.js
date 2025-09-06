const express = require("express");
const router = express.Router();
const ClienteService = require("../Services/Cliente.Service");

router.get("/obtener-todos", async (req, res) => {
    const result = await ClienteService.obtenerClientes();
    return res.status(200).json(result);
})

module.exports = router;