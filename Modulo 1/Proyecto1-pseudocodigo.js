//Proyecto 1 
// Algoritmo para calcular costo total de un producto con impuestos y descuentos

const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

async function main() {
  const rl = readline.createInterface({ input, output });

  try {
    // Paso 1: Obtener datos del usuario
    const precioBase = parseFloat(await rl.question('Ingrese el precio base del producto: '));
    const porcentajeImpuesto = parseFloat(await rl.question('Ingrese el porcentaje de impuesto (ej. 15 para 15%): '));
    const porcentajeDescuento = parseFloat(await rl.question('Ingrese el porcentaje de descuento (ej. 10 para 10%): '));

    // Paso 2: Calcular descuento
    const descuento = precioBase * (porcentajeDescuento / 100);
    const precioConDescuento = precioBase - descuento;

    // Paso 3: Calcular impuestos
    const impuestos = precioConDescuento * (porcentajeImpuesto / 100);

    // Paso 4: Calcular precio final
    const precioFinal = precioConDescuento + impuestos;

    // Mostrar resultados
    console.log('\nDesglose de costos:');
    console.log(`- Precio base: $${precioBase.toFixed(2)}`);
    console.log(`- Descuento (${porcentajeDescuento}%): $${descuento.toFixed(2)}`);
    console.log(`- Precio con descuento: $${precioConDescuento.toFixed(2)}`);
    console.log(`- Impuestos (${porcentajeImpuesto}%): $${impuestos.toFixed(2)}`);
    console.log(`- Total a pagar: $${precioFinal.toFixed(2)}`);
  } finally {
    rl.close();
  }
}

main();