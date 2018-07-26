#Instrucciones
1. Si estas en Windows, abrir PowerShell como administrador y ejecutar `npm install --global --production windows-build-tools`
2. Ejecutar `npm install -g node-gyp`
3. Ejecuta `npm install`
4. Inicia mongo
5. Si tienes agregado mongorestore a las variables del sistema, ejecuta `npm run initialize`. En caso contrario, copia la carpeta db a donde se encuentra mongorestore (archivos de programa/mongo/x.xx/bin), abre una consola en esa carpeta bin y ejecuta el comando `mongorestore -d ujap db/` para importar la base de datos
6. Ejecutar en el proyecto `npm run development`

