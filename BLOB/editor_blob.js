const btnDescargar = document.getElementById('btnDescargar');
const areaTexto = document.getElementById('miTexto');

btnDescargar.addEventListener('click', () => {
    const contenido = areaTexto.value;
    const archivoBlob = new Blob([contenido], { type: 'text/plain' });
    const urlParaDescargar = URL.createObjectURL(archivoBlob);
    const enlace = document.createElement('a'); 
    enlace.href = urlParaDescargar;             
    enlace.download = 'mi_nota.txt';            
    enlace.click();
    URL.revokeObjectURL(urlParaDescargar);
});