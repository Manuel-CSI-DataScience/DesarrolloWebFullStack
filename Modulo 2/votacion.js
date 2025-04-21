// Sistema simple de votación en JavaScript

/**************************************
 * 1. Definición de variables globales *
 **************************************/
const encuestas = []; // Array que almacenará todas las encuestas creadas
let encuestaActual = null; // Referencia a la encuesta que está activa actualmente

/**************************************
 * 2. Función para crear una encuesta  *
 **************************************/
/**
 * Crea una nueva encuesta y la añade al sistema
 * @param {string} pregunta - Texto de la pregunta de la encuesta
 * @param {Array<string>} opciones - Array de strings con las opciones de respuesta
 * @returns {Object} Devuelve el objeto encuesta creado
 */
function crearEncuesta(pregunta, opciones) {
    // Creamos el objeto encuesta con:
    const nuevaEncuesta = {
        pregunta: pregunta, // La pregunta recibida como parámetro
        opciones: opciones.map(opcion => ({ // Mapeamos las opciones a objetos con votos
            texto: opcion, // Texto de la opción
            votos: 0       // Contador de votos inicializado a 0
        })),
        totalVotos: 0 // Contador total de votos para esta encuesta
    };
    
    encuestas.push(nuevaEncuesta); // Añadimos la nueva encuesta al array
    return nuevaEncuesta; // Devolvemos la encuesta creada
}

/**************************************
 * 3. Función para registrar un voto   *
 **************************************/
/**
 * Registra un voto para una opción específica de la encuesta actual
 * @param {number} indiceOpcion - Índice de la opción a votar (basado en 0)
 */
function votar(indiceOpcion) {
    // Validamos que haya una encuesta seleccionada
    if (!encuestaActual) {
        console.log("No hay encuesta seleccionada.");
        return;
    }
    
    // Verificamos que el índice esté dentro del rango de opciones
    if (indiceOpcion >= 0 && indiceOpcion < encuestaActual.opciones.length) {
        encuestaActual.opciones[indiceOpcion].votos++; // Incrementamos votos de la opción
        encuestaActual.totalVotos++; // Incrementamos contador total
        console.log("¡Voto registrado!");
    } else {
        console.log("Opción no válida.");
    }
}

/**************************************
 * 4. Función para mostrar resultados  *
 **************************************/
/**
 * Muestra por consola los resultados de la encuesta actual
 */
function mostrarResultados() {
    // Validamos que haya una encuesta seleccionada
    if (!encuestaActual) {
        console.log("No hay encuesta seleccionada.");
        return;
    }
    
    // Mostramos encabezado y pregunta
    console.log("\nResultados de la encuesta:");
    console.log(encuestaActual.pregunta);
    
    // Iteramos sobre cada opción para mostrar sus resultados
    encuestaActual.opciones.forEach((opcion, index) => {
        // Calculamos el porcentaje (evitamos división por cero)
        const porcentaje = encuestaActual.totalVotos > 0 
            ? (opcion.votos / encuestaActual.totalVotos * 100).toFixed(1) 
            : 0;
        // Mostramos: posición, texto, votos y porcentaje
        console.log(`${index + 1}. ${opcion.texto}: ${opcion.votos} votos (${porcentaje}%)`);
    });
}

/**************************************
 * 5. Ejemplo de uso del sistema       *
 **************************************/
console.log("=== Sistema de Votación ===");

// Creamos una encuesta de ejemplo
const encuesta1 = crearEncuesta(
    "¿Cuál es tu lenguaje de programación favorito?", 
    ["JavaScript", "Python", "Java", "C++"]
);

// Establecemos esta encuesta como la actual
encuestaActual = encuesta1;

// Simulamos varios votos (los índices empiezan en 0)
votar(0); // Vota por JavaScript (índice 0)
votar(0); // Segundo voto para JavaScript
votar(1); // Vota por Python (índice 1)
votar(3); // Vota por C++ (índice 3)

// Mostramos los resultados finales
mostrarResultados();

