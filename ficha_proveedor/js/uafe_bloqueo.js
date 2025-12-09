// ---------------------------------------------------------
// BLOQUEO UAFE – Funciones de apoyo
// ---------------------------------------------------------
var usaUAFE = 'f';

function setParametroUafe(valor) {
    usaUAFE = (valor === 't') ? 't' : 'f';
}

function habilitarEstadoProveedor(bloquear) {
    const radios = document.querySelectorAll('input[name="estado"]');
    radios.forEach(r => r.disabled = bloquear);

    if (bloquear) {
        const pe = document.getElementById("PE");
        if (pe) pe.checked = true;
    }
}

function habilitarCumplimientoUafe(habilitar) {
    const checks = document.querySelectorAll('.chkCumplimientoUafe');
    checks.forEach(c => c.disabled = !habilitar);
}
