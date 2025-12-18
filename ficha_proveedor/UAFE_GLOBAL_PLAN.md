# Propuesta de ubicación para la opción GLOBAL de Validación UAFE

## Estructura actual del módulo de Proveedores
- Las pestañas se definen en `ficha_proveedor.php` dentro del `<div id="pestanas">` y se controlan con la función `cambiarPestanna`. El listado actual (INFORMACION, CONTACTOS, DATO FISCAL, CASH MANAGEMENT, PLANILLA, PRODUCTOS, LINEA DE NEGOCIO, ADJUNTOS) está pensado para trabajar **sobre el proveedor activo** porque el contenido de cada `tpestana#` se llena con datos del `codigoCliente` seleccionado.
- El script `cambiarPestanna` oculta y muestra únicamente los contenedores `cpestana1`–`cpestana8` y `tpestana1`–`tpestana8`, lo que evidencia que el sistema de pestañas es cerrado y acoplado a ese rango fijo de pestañas contextuales.
- El tab de **Adjuntos** ya contiene bloques UAFE, pero son por proveedor: los botones `consultarAdjuntosUafe` y `guardarAdjuntosUAFE` envían el `codigoCliente` al servidor y la tabla UAFE se renderiza en `divReporteAdjuntosUafe`, todo dentro de `tpestana8`.
- En el servidor, las validaciones UAFE (`validarEstadoUAFEProveedor`) y la sincronización de adjuntos se ejecutan por proveedor (`id_clpv`), y se disparan después de cargar un proveedor en la ficha.

## Conclusiones sobre los tabs contextuales
- **Todo el contenido dentro de `contenidopestanas` está atado al proveedor actual**: cada sección consulta o actualiza información con `codigoCliente`/`id_clpv`. Por ello, **no se debe reutilizar** esa estructura para la opción GLOBAL.
- La función `cambiarPestanna` está escrita para un set cerrado de IDs. Extenderla para un tab global la haría depender del mismo ciclo de ocultar/mostrar que asume contenido por proveedor.

## Ubicación recomendada para el tab GLOBAL
- **Lugar físico**: inmediatamente después del `<div id="pestanas">` pero **fuera** del contenedor `contenidopestanas`. Mantener un contenedor separado (por ejemplo, `#pestanaGlobalUafe` + `#contenidoPestanaGlobalUafe`) evita que herede el toggle y el estilo de las pestañas contextuales.
- **Activación**: usar un handler propio (click simple o `cambiarPestannaGlobal`) que no consulte `codigoCliente` y no interactúe con la lista `#lista`. Esto garantiza independencia del proveedor seleccionado.
- **Contenido**: un layout de ancho completo con un llamado a la acción claro para recalcular estados UAFE de todos los proveedores, un botón "Recalcular estados UAFE (GLOBAL)" y un texto de advertencia fijo que explique que la ejecución no depende del proveedor activo.

## Diferenciación visual mínima
- Etiqueta explícita: "GLOBAL UAFE" o "Recalculo GLOBAL UAFE" en mayúsculas.
- Color/ícono: usar un color de sistema (ej. `btn-warning` / fondo ámbar) o un ícono de globo/planeta que refuerce el alcance global. El objetivo es que no se confunda con pestañas azules normales.
- Texto aclaratorio obligatorio: bloque destacado (alert-warning) indicando "Esta acción se ejecuta para todos los proveedores. No depende del proveedor seleccionado en la ficha".

## Comportamiento y desac acoplamiento
- **No reutilizar**: `contenidopestanas`, IDs `cpestana#`/`tpestana#`, ni la función `cambiarPestanna` porque su lista de IDs está codificada y está pensada para tabs por proveedor.
- **Patrón técnico sugerido**: crear un contenedor de navegación paralelo (por ejemplo, una pestaña de nivel superior o un botón tipo pill) con su propia rutina de mostrar/ocultar (`toggle` simple o clase `active`). Mantener su HTML y JS fuera del bloque que depende de `codigoCliente` asegura que no se intente leer `codigoCliente` al abrirlo.
- **Integración con UAFE existente**: la acción global debe invocar un endpoint dedicado al recálculo masivo (o reutilizar lógica de estado pero pasando un identificador "global"), sin llamar a `validarEstadoUAFEProveedor` ni a funciones que esperan un `id_clpv` específico.

## Ajustes mínimos al diseño actual
1. Añadir el nuevo disparador visual (tab/botón global) junto al grupo de pestañas pero fuera de `#contenidopestanas`.
2. Crear un contenedor de contenido global separado que no dependa de `codigoCliente` y que pueda mostrar progreso y resultado del recálculo.
3. Incluir el mensaje aclaratorio y un estilo distinto para remarcar el alcance global.

## Resultado esperado
Con esta ubicación y separación, la opción GLOBAL de Validación UAFE vive dentro del módulo de Proveedores pero:
- no hereda comportamientos ni dependencias del proveedor activo,
- mantiene la semántica de las pestañas contextuales intacta,
- y presenta de forma clara que se trata de una acción de alcance total.
