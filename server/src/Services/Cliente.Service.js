const fs = require('fs');
const path = require('path');
const rutaDb = path.join(__dirname, '../Migrations/DbFile.json');


function leerDb(){
    const content = fs.readFileSync(rutaDb, 'utf-8');
    return JSON.parse(content);
}

function escribirDb(data){
    fs.writeFileSync(rutaDb, JSON.stringify(data, null, 2));
}

//este servicio estara enfocado, para las facturas, solo tendra el metodo de crear,obtener y borrar clientes
class ClienteService {
    async obtenerClientes(){
        const data = leerDb();
        const clientes = data.Clients;
        return clientes;
    }

    async obtenerClientePorId(id){
        const data = leerDb();
        const cliente = data.Clients.find(cliente => cliente.Id === Number(id));
        return cliente;
    }

    async crearCliente(){
        const data = leerDb();

        const nuevoCliente = {Id, Name, LastName};

        //validamos unnicidad

        data.Clients.push(nuevoCliente);
        escribirDb(data);

        return nuevoCliente;
    }

    async borrarCliente(id){
        const data = leerDb();
        const clientesActualizados = data.Clients.filter(u => u.Id !== Number(id));

        if(clientesActualizados.length === data.Clients.length)
            throw new Error("Usuario no encontrado");

        //como estoy trabajando con un json y no una db, tengo que volver a escribir el json al eliminar el
        // archivo
        data.Clients = clientesActualizados;
        escribirDb(data);

        return {mensaje: `Usuario con el id ${id} eliminado`};
    }
}

module.exports = new ClienteService();