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

function bloquearCheckboxesUAFE(bloquear) {
    const checks = document.querySelectorAll('#divReporteAdjuntosUafe input[type="checkbox"].uafe-check');
    checks.forEach(chk => {
        chk.disabled = bloquear;
    });
}

function prepararEstadoUAFEInicial(usaUAFE, esNuevo) {
    if (!usaUAFE) {
        habilitarEstadoProveedor(false);
        bloquearCheckboxesUAFE(false);
        return;
    }

    if (esNuevo) {
        if (typeof editar === 'function') {
            editar('PE');
        }
        habilitarEstadoProveedor(true);
        bloquearCheckboxesUAFE(true);
    }
}
