const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configura tus credenciales de la base de datos
const dbUser = 'root'; // Usuario por defecto en XAMPP
const dbPassword = ''; // Contraseña por defecto (generalmente vacía)
const dbName = 'nodeappdb'; // Cambia esto al nombre de tu base de datos
const backupFolder = path.join(__dirname, 'backups');

// Asegúrate de que la carpeta de backups exista
if (!fs.existsSync(backupFolder)) {
    fs.mkdirSync(backupFolder);
}

// Genera el nombre del archivo de respaldo
const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
const backupFile = path.join(backupFolder, `${dbName}_${timestamp}.sql`);

// Comando para realizar el respaldo
const command = `"C:\\xampp\\mysql\\bin\\mysqldump.exe" -u ${dbUser} -p${dbPassword} ${dbName} > "${backupFile}"`;

// Ejecuta el comando
// Ejecuta el comando
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error al hacer el respaldo: ${error.message}`);
        process.exit(1); // Salir con error
    }
    if (stderr) {
        console.error(`Error: ${stderr}`);
        process.exit(1); // Salir con error
    }
    // Solo imprime la ruta del archivo sin texto adicional
    process.stdout.write(backupFile); // Esta línea se encarga de enviar solo la ruta del archivo
});
