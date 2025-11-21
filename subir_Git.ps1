write-host "Iniciando proceso de subida a Git"

Write-Host "1. Agregando todos los archivos modificados al staging..."
git add .

Write-Host "Dime el comentario que le quieres añadir: "
$comentario= Read-Host
Write-Host "2. Creando el commit con mensaje: '$comentario'..."
git commit -m $comentario

Write-Host "Dime el nombre de la rama a la que lo quieres subir: "
$NombreRama= Read-Host
Write-Host "3. Subiendo cambios a la rama '$NombreRama'..."
git push origin $NombreRama

Write-Host "Presiona enter para salir"