const cliente = {
    id: Number,
    Name: String,
    LastName: String,
    
}

function registrarCliente(obj) {
    console.log("Objeto recibido en registrarCliente:", obj); // Log para depurar
    const isValid = (
        typeof obj.Id === 'number' &&
        typeof obj.Name === 'string' &&
        typeof obj.LastName === 'string'
    );
    
    return isValid;
}