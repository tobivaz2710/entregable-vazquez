// Constantes para los IDs de los elementos en la página
const ID_REGISTRO = "register-section";
const ID_LOGIN = "login-section";
const ID_PRESUPUESTO = "budget-app";
const ID_USUARIO = "username-display";

// Objeto para almacenar información de los usuarios
const usuarios = {};

// Registrar un nuevo usuario
document.getElementById("register-btn").addEventListener("click", function() {
    const nombreUsuario = document.getElementById("register-username").value.trim();
    const contrasena = document.getElementById("register-password").value.trim();

    if (!nombreUsuario || !contrasena) {
        alert("Por favor, llena todos los campos.");
        return;
    }

    if (usuarios[nombreUsuario]) {
        alert("Este nombre de usuario ya está registrado.");
    } else {
        usuarios[nombreUsuario] = { contrasena, ingresos: 0, gastos: 0 };
        alert("¡Registro completado con éxito!");
    }
});

// Iniciar sesión
document.getElementById("login-btn").addEventListener("click", function() {
    const nombreUsuario = document.getElementById("login-username").value.trim();
    const contrasena = document.getElementById("login-password").value.trim();

    if (usuarios[nombreUsuario] && usuarios[nombreUsuario].contrasena === contrasena) {
        document.getElementById(ID_LOGIN).style.display = "none";
        document.getElementById(ID_REGISTRO).style.display = "none";
        document.getElementById(ID_PRESUPUESTO).style.display = "block";
        document.getElementById(ID_USUARIO).textContent = nombreUsuario;
        actualizarPresupuesto(nombreUsuario);
    } else {
        alert("Nombre de usuario o contraseña incorrectos.");
    }
});

// Agregar ingresos o gastos
document.getElementById("add-btn").addEventListener("click", function() {
    const cantidad = parseFloat(document.getElementById("amount").value);
    const tipo = document.getElementById("type").value;
    const nombreUsuario = document.getElementById(ID_USUARIO).textContent;

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, introduce una cantidad válida.");
        return;
    }

    let mensaje = "";
    if (tipo === "income") {
        usuarios[nombreUsuario].ingresos += cantidad;
        mensaje = `¿Quieres agregar ${cantidad} a tus ingresos?`;
    } else if (tipo === "expense") {
        usuarios[nombreUsuario].gastos += cantidad;
        mensaje = `¿Quieres agregar ${cantidad} a tus gastos?`;
    }

    if (confirm(mensaje)) {
        actualizarPresupuesto(nombreUsuario);
    }
});

// Actualizar el resumen del presupuesto
function actualizarPresupuesto(nombreUsuario) {
    const ingresos = usuarios[nombreUsuario].ingresos;
    const gastos = usuarios[nombreUsuario].gastos;
    const balance = ingresos - gastos;

    document.getElementById("total-income").textContent = ingresos.toFixed(2);
    document.getElementById("total-expense").textContent = gastos.toFixed(2);
    document.getElementById("balance").textContent = balance.toFixed(2);
}

// Ejemplo opcional de uso de prompt
function mostrarPrompt() {
    const nombreUsuario = prompt("Introduce tu nombre:");
    if (nombreUsuario) {
        alert(`Hola, ${nombreUsuario}!`);
    } else {
        alert("No ingresaste un nombre.");
    }
}
