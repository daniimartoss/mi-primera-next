const red = document.querySelector(".rojo");
const green = document.querySelector(".verde");
const yellow = document.querySelector(".amarillo");
const blue = document.querySelector(".azul");
const btn = document.querySelector(".empezar");

const colores = ["red", "blue", "green", "yellow"];
let usuario = []; // ✅ Cambiar const por let para poder modificar
let secuenciaActual = []; // ✅ Variable global para la secuencia

const colorRamdon = () => {
    let secuencia = [];
    for (let i = 0; i < 3; i++) {
        const indice = Math.floor(Math.random() * 4);
        secuencia.push(colores[indice]);
    }
    return secuencia;
}

const mostrarColor = (color) => {
    if (color === "red") {
        red.classList.add("activo"); 
    } else if (color === "blue") {
        blue.classList.add("activo"); 
    } else if (color === "green") {
        green.classList.add("activo"); 
    } else if (color === "yellow") {
        yellow.classList.add("activo"); 
    }
}

const deshabilitarBotones = () => {
    red.disabled = true;
    blue.disabled = true;
    green.disabled = true;
    yellow.disabled = true;
}

const habilitarBotones = () => {
    red.disabled = false;
    blue.disabled = false;
    green.disabled = false;
    yellow.disabled = false;
}

btn.addEventListener("click", () => {
    usuario = []; // vaciamos el array
    deshabilitarBotones();
    
    secuenciaActual = colorRamdon();
    console.log("Secuencia a memorizar:", secuenciaActual); // ✅ Debug
    
    secuenciaActual.forEach((color, index) => {
        setTimeout(() => {
            mostrarColor(color);
            
            setTimeout(() => {
                red.classList.remove("activo");
                blue.classList.remove("activo"); 
                green.classList.remove("activo");
                yellow.classList.remove("activo");
                
                // ✅ Habilitar después del último color
                if (index === secuenciaActual.length - 1) {
                    setTimeout(() => {
                        habilitarBotones();
                        console.log("¡Ahora puedes hacer clic!"); // ✅ Debug
                    }, 500);
                }
            }, 1000);
            
        }, index * 1500);
    });
});

// ✅ Event listeners para los botones de colores
red.addEventListener("click", () => {
    if (!red.disabled) {
        usuario.push("red");
        red.classList.add("activo");
        setTimeout(() => red.classList.remove("activo"), 200);
        verificarSecuencia();
    }
});

blue.addEventListener("click", () => {
    if (!blue.disabled) {
        usuario.push("blue");
        blue.classList.add("activo");
        setTimeout(() => blue.classList.remove("activo"), 200);
        verificarSecuencia();
    }
});

green.addEventListener("click", () => {
    if (!green.disabled) {
        usuario.push("green");
        green.classList.add("activo");
        setTimeout(() => green.classList.remove("activo"), 200);
        verificarSecuencia();
    }
});

yellow.addEventListener("click", () => {
    if (!yellow.disabled) {
        usuario.push("yellow");
        yellow.classList.add("activo");
        setTimeout(() => yellow.classList.remove("activo"), 200);
        verificarSecuencia();
    }
});

// ✅ Función para verificar si el usuario acertó
const verificarSecuencia = () => {
    console.log("Usuario:", usuario);
    console.log("Secuencia:", secuenciaActual);
    
    // Verificar si hay error
    for (let i = 0; i < usuario.length; i++) {
        if (usuario[i] !== secuenciaActual[i]) {
            alert("❌ ¡Error! Secuencia incorrecta");
            usuario = [];
            return;
        }
    }
    
    // Si completó la secuencia correctamente
    if (usuario.length === secuenciaActual.length) {
        alert("✅ ¡Perfecto! Secuencia correcta");
        usuario = [];
    }
}