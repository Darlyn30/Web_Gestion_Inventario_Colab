const Usuario = {
    Id : Number,
    Nombre : String,
    UserName : String,
    Password  : String
}

function registrarUsuario(obj) {
    console.log("Objeto recibido en registrarUsuario:", obj);
    const isValid = (
        typeof obj.Id === 'number' &&
        typeof obj.Nombre === 'string' &&
        typeof obj.UserName === 'string' &&
        typeof obj.Password === 'string'
    );
    console.log("Resultado de la validación:", isValid);
    console.log("Tipos detectados:", {
        Id: typeof obj.Id,
        Nombre: typeof obj.Nombre,
        UserName: typeof obj.UserName,
        Password: typeof obj.Password
    });
    return isValid;
}

module.exports = { Usuario, registrarUsuario };