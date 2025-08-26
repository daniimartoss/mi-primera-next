import { promises as fs } from 'fs';

const [, , filePath = 'README.md'] = process.argv;

async function main() {
try {
    const content = await fs.readFile(filePath, 'utf-8');
    console.log(`✅ Archivo leído: ${filePath}`);
    console.log(`📏 Tamaño: ${content.length} caracteres`);
    console.log('📖 Primeras 200 chars:');
    console.log(content.slice(0, 200));
} catch (err) {
    console.error(`❌ Error leyendo archivo ${filePath}:`, err.message);
    process.exit(1);
}
}

main();
