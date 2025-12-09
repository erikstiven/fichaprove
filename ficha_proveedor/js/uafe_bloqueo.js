// ---------------------------------------------------------
// BLOQUEO UAFE – Función central del módulo proveedor
// ---------------------------------------------------------
function habilitarEstadoProveedor(bloquear) {
    console.log("Ejecutando habilitarEstadoProveedor. bloquear=", bloquear);

    const radios = document.querySelectorAll('input[name="estado"]');
    radios.forEach(r => {
        r.disabled = bloquear;
    });

    console.log("Radios " + (bloquear ? "bloqueados" : "habilitados"));
}
