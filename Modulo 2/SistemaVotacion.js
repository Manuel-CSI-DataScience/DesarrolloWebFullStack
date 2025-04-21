// Sistema simple de votación en JavaScript

// 1. Definimos las variables iniciales
const encuestas = []; // Array para guardar las encuestas
let encuestaActual = null; // Encuesta seleccionada actualmente

// 2. Función para crear una nueva encuesta
function crearEncuesta(pregunta, opciones) {
    const nuevaEncuesta = {
        pregunta: pregunta,
        opciones: opciones.map(opcion => ({
            texto: opcion,
            votos: 0
        })),
        totalVotos: 0
    };
    
    encuestas.push(nuevaEncuesta); // Añadimos la encuesta al array
    return nuevaEncuesta;
}

// 3. Función para votar en una encuesta
function votar(indiceOpcion) {
    if (!encuestaActual) {
        console.log("No hay encuesta seleccionada.");
        return;
    }
    
    if (indiceOpcion >= 0 && indiceOpcion < encuestaActual.opciones.length) {
        encuestaActual.opciones[indiceOpcion].votos++;
        encuestaActual.totalVotos++;
        console.log("¡Voto registrado!");
    } else {
        console.log("Opción no válida.");
    }
}

// 4. Función para mostrar resultados
function mostrarResultados() {
    if (!encuestaActual) {
        console.log("No hay encuesta seleccionada.");
        return;
    }
    
    console.log("\nResultados de la encuesta:");
    console.log(encuestaActual.pregunta);
    
    encuestaActual.opciones.forEach((opcion, index) => {
        const porcentaje = encuestaActual.totalVotos > 0 
            ? (opcion.votos / encuestaActual.totalVotos * 100).toFixed(1) 
            : 0;
        console.log(`${index + 1}. ${opcion.texto}: ${opcion.votos} votos (${porcentaje}%)`);
    });
}

// 5. Ejemplo de uso
console.log("=== Sistema de Votación ===");

// Crear una encuesta
const encuesta1 = crearEncuesta("¿Cuál es tu lenguaje de programación favorito?", 
    ["JavaScript", "Python", "Java", "C++"]);

// Seleccionar esta encuesta como la actual
encuestaActual = encuesta1;

// Simular algunos votos
votar(0); // Vota por JavaScript
votar(0); // Otro voto por JavaScript
votar(1); // Vota por Python
votar(3); // Vota por C++

// Mostrar resultados
mostrarResultados();
