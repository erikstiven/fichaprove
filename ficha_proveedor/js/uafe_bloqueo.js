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
}

function habilitarCumplimientoUafe(habilitar) {
    const checks = document.querySelectorAll('.chkCumplimientoUafe');
    checks.forEach(c => c.disabled = !habilitar);
}
