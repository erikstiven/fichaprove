// ---------------------------------------------------------
// BLOQUEO UAFE – Función central del módulo proveedor
// ---------------------------------------------------------
function habilitarEstadoProveedor(bloquear) {
    console.log("Ejecutando habilitarEstadoProveedor. bloquear=", bloquear);

    const radios = document.querySelectorAll('input[name="estado"]');
    radios.forEach(r => r.disabled = bloquear);

    if (bloquear) {
        const pe = document.getElementById("PE");
        if (pe) pe.checked = true;
    }

    console.log("Radios " + (bloquear ? "bloqueados" : "habilitados"));
}
