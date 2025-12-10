// ---------------------------------------------------------
// BLOQUEO UAFE – Función central del módulo proveedor
// ---------------------------------------------------------
function habilitarEstadoProveedor(bloquear) {
    const bloquearEstado = bloquear === true || bloquear === 'true' || bloquear === 1 || bloquear === '1';
    console.log("Ejecutando habilitarEstadoProveedor. bloquear=", bloquearEstado);

    const radios = ['AC', 'PE', 'SU']
        .map((id) => document.getElementById(id))
        .filter((r) => r && r.type === 'radio');
    radios.forEach((r) => {
        r.disabled = bloquearEstado;
    });

    if (bloquearEstado) {
        const algunoMarcado = Array.from(radios).some((r) => r.checked);
        if (!algunoMarcado) {
            const pe = document.getElementById("PE");
            if (pe) pe.checked = true;
        }
    }

    console.log("Radios " + (bloquearEstado ? "bloqueados" : "habilitados"));
}
