const path = require('path');
const {registrarUsuario} = require('../Interfaces/Usuario.Interface');
const fs = require('fs');
const rutaDb = path.join(__dirname, '../Migrations/DbFile.json');

function leerDb(){
    const content = fs.readFileSync(rutaDb, 'utf-8');
    return JSON.parse(content);
}

function escribirDb(data){
    fs.writeFileSync(rutaDb, JSON.stringify(data, null, 2));
}

class UsuarioService {
    async crearUsuario(Nombre, UserName, Password){
        console.log("Datos recibidos en crearUsuario", {Nombre, UserName, Password});

        const nuevoUsuario = {Nombre, UserName, Password};
        console.log("Objeto nuevoUsuario antes de validar: ", nuevoUsuario);

        //validamos los tipos de la funcion de la interfaz
        if(!registrarUsuario({Id: 0, ...nuevoUsuario})){
            throw new Error("Datos del usuario invalidos");
        }

        try {
            const data = leerDb();
            const usuarios = data.Users;

            //generamos nuevo ID incrementado
            const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].Id + 1 : 1;

            const usuarioInsertado = {
                Id: nuevoId,
                Nombre,
                UserName,
                Password
            }
            usuarios.push(usuarioInsertado);
            escribirDb(data);

            return usuarioInsertado;
        } catch (error) {
            throw new Error('Error al guardar el usuario en el archivo JSON: ' + error.message);
        }
    }

    async obtenerUsuarios(){
        
        const data = leerDb();
        return data.Users;
    }

    async obtenerUsuariosPorId(id){

        const data = leerDb();
        const usuario = data.Users.find(item => item.Id === Number(id))
        return usuario;
    }

    async editarUsuario(id, nuevosDatos){
        try {
            const data = leerDb();
    
            // Buscar el usuario
            const index = data.Users.findIndex(u => u.Id === Number(id));
            if (index === -1) {
                throw new Error(`Usuario con id ${id} no encontrado`);
            }
    
            // Actualizar los datos del usuario
            data.Users[index] = { ...data.Users[index], ...nuevosDatos };
    
            // Guardar cambios
            escribirDb(data);
    
            return { mensaje: `Usuario con id ${id} actualizado`, usuario: data.Users[index] };
        } catch (err) {
            throw new Error("Error al editar usuario: " + err.message);
        }
    }

    async borrarUsuario(id){
        try {
            const data = leerDb();
            const usuariosActualizados = data.Users.filter(u => u.Id !== Number(id));

            if(usuariosActualizados.length === data.Users.length)
                throw new Error("Usuario no encontrado");

            //como estoy trabajando con un json y no una db, tengo que volver a escribir el json al eliminar el
            // archivo
            data.Users = usuariosActualizados;
            escribirDb(data);

            return {mensaje: `Usuario con el id ${id} eliminado`};
        } catch(err){
            throw new Error("Error al eliminar usuario: " + err.message);
        }
    }
}

module.exports = new UsuarioService();