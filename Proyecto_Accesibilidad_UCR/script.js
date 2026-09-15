/* =========================================================
   ACCESIBILIDAD UCR - MAPA INTERACTIVO
   VERSIÓN FINAL CORREGIDA
   ========================================================= */

console.log("script.js - versión final corregida");


/* =========================================================
   1. SUPABASE
   ========================================================= */

const SUPABASE_URL =
    "https://opkizcctkfpzwnumiicl.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_02JCD0H2XOMhgnJQDsSAcA_yHmtBnID";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* =========================================================
   2. UBICACIONES UCR
   ========================================================= */

const ubicacionesUCR = [

    {
        id: "F1-001",
        finca: "Finca 1",
        nombre: "Artes Dramáticas",
        sigla: "AD",
        lat: 9.93426,
        lng: -84.05038
    },

    {
        id: "F1-002",
        finca: "Finca 1",
        nombre: "Agroalimentarias",
        sigla: "AG",
        lat: 9.93855,
        lng: -84.04865
    },

    {
        id: "F1-003",
        finca: "Finca 1",
        nombre: "Artes Musicales",
        sigla: "AM",
        lat: 9.93743,
        lng: -84.04823
    },

    {
        id: "F1-004",
        finca: "Finca 1",
        nombre: "Artes Plásticas",
        sigla: "AP",
        lat: 9.93715,
        lng: -84.04900
    },

    {
        id: "F1-005",
        finca: "Finca 1",
        nombre: "Arquitectura",
        sigla: "AQ",
        lat: 9.93478,
        lng: -84.05261
    },

    {
        id: "F1-006",
        finca: "Finca 1",
        nombre: "Aulas",
        sigla: "AU",
        lat: 9.93673,
        lng: -84.05076
    },

    {
        id: "F1-007",
        finca: "Finca 1",
        nombre: "Bellas Artes",
        sigla: "BA",
        lat: 9.93708,
        lng: -84.04817
    },

    {
        id: "F1-008",
        finca: "Finca 1",
        nombre: "Biología",
        sigla: "BI",
        lat: 9.93761,
        lng: -84.04951
    },

    {
        id: "F1-009",
        finca: "Finca 1",
        nombre: "Bibliotecología",
        sigla: "BL",
        lat: 9.93849,
        lng: -84.05350
    },

    {
        id: "F1-010",
        finca: "Finca 1",
        nombre: "Ciencias Económicas",
        sigla: "CE",
        lat: 9.93720,
        lng: -84.05196
    },

    {
        id: "F1-011",
        finca: "Finca 1",
        nombre: "Derecho",
        sigla: "DE",
        lat: 9.93637,
        lng: -84.05391
    },

    {
        id: "F1-012",
        finca: "Finca 1",
        nombre: "Estudios Generales",
        sigla: "EG",
        lat: 9.93617,
        lng: -84.05045
    },

    {
        id: "F1-013",
        finca: "Finca 1",
        nombre: "Edificio Saprissa",
        sigla: "ES",
        lat: 9.93492,
        lng: -84.05048
    },

    {
        id: "F1-014",
        finca: "Finca 1",
        nombre: "Facultad de Educación",
        sigla: "ED",
        lat: 9.93579,
        lng: -84.04871
    },

    {
        id: "F1-015",
        finca: "Finca 1",
        nombre: "Farmacia",
        sigla: "FA",
        lat: 9.93869,
        lng: -84.04979
    },

    {
        id: "F1-016",
        finca: "Finca 1",
        nombre: "Física Matemática",
        sigla: "FM",
        lat: 9.93649,
        lng: -84.05159
    },

    {
        id: "F1-017",
        finca: "Finca 1",
        nombre: "Geología",
        sigla: "GE",
        lat: 9.93803,
        lng: -84.05230
    },

    {
        id: "F1-018",
        finca: "Finca 1",
        nombre: "Informática",
        sigla: "IF",
        lat: 9.93774,
        lng: -84.05205
    },

    {
        id: "F1-019",
        finca: "Finca 1",
        nombre: "Facultad de Letras",
        sigla: "LE",
        lat: 9.93859,
        lng: -84.05286
    },

    {
        id: "F1-020",
        finca: "Finca 1",
        nombre: "Facultad de Medicina",
        sigla: "ME",
        lat: 9.93859,
        lng: -84.05059
    },

    {
        id: "F1-021",
        finca: "Finca 1",
        nombre: "Microbiología",
        sigla: "MI",
        lat: 9.93790,
        lng: -84.04920
    },

    {
        id: "F1-022",
        finca: "Finca 1",
        nombre: "Química",
        sigla: "QU",
        lat: 9.93800,
        lng: -84.04890
    },

    {
        id: "F1-023",
        finca: "Finca 1",
        nombre: "Tecnología de Alimentos",
        sigla: "TA",
        lat: 9.93910,
        lng: -84.04860
    },

    {
        id: "F1-024",
        finca: "Finca 1",
        nombre: "Tecnologías en Salud",
        sigla: "TS",
        lat: 9.93856,
        lng: -84.05388
    },

    {
        id: "F1-POI-001",
        finca: "Finca 1",
        nombre: "Biblioteca Carlos Monge Alfaro",
        sigla: "BCMA",
        lat: 9.93568,
        lng: -84.05084
    },

    {
        id: "F2-001",
        finca: "Finca 2",
        nombre: "Ciencias Sociales",
        sigla: "CS",
        lat: 9.93767,
        lng: -84.04231
    },

    {
        id: "F2-002",
        finca: "Finca 2",
        nombre: "Enfermería",
        sigla: "EE",
        lat: 9.93870,
        lng: -84.04520
    },

    {
        id: "F2-003",
        finca: "Finca 2",
        nombre: "Facultad de Ciencias",
        sigla: "FC",
        lat: 9.93840,
        lng: -84.04570
    },

    {
        id: "F2-004",
        finca: "Finca 2",
        nombre: "Ingeniería Eléctrica",
        sigla: "IE",
        lat: 9.93700,
        lng: -84.04393
    },

    {
        id: "F2-005",
        finca: "Finca 2",
        nombre: "Ingeniería",
        sigla: "IN",
        lat: 9.93747,
        lng: -84.04487
    },

    {
        id: "F2-006",
        finca: "Finca 2",
        nombre: "Nutrición",
        sigla: "NU",
        lat: 9.93911,
        lng: -84.04485
    },

    {
        id: "F2-007",
        finca: "Finca 2",
        nombre: "Salud Pública",
        sigla: "SA",
        lat: 9.93883,
        lng: -84.04581
    },

    {
        id: "F3-001",
        finca: "Finca 3",
        nombre: "Educación Física",
        sigla: "EF",
        lat: 9.94417,
        lng: -84.04526
    },

    {
        id: "F3-002",
        finca: "Finca 3",
        nombre: "Odontología",
        sigla: "OD",
        lat: 9.94360,
        lng: -84.04480
    }

];


/* =========================================================
   3. NORMALIZAR TEXTO
   ========================================================= */

function normalizarTexto(valor) {

    if (
        valor === null ||
        valor === undefined
    ) {

        return "";

    }

    return String(valor)
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase()
        .trim();

}


/* =========================================================
   4. TIPO DE EDIFICIO
   ========================================================= */

function determinarTipo(ubicacion) {

    const nombre =
        normalizarTexto(
            ubicacion.nombre
        );

    if (
        nombre.includes("biblioteca")
    ) {

        return "Biblioteca";

    }

    if (
        nombre.includes("facultad")
    ) {

        return "Facultad";

    }

    if (
        nombre.includes("escuela")
    ) {

        return "Escuela";

    }

    if (
        nombre.includes("educacion fisica")
    ) {

        return "Instalación deportiva";

    }

    if (
        nombre.includes("medicina") ||
        nombre.includes("farmacia") ||
        nombre.includes("enfermeria") ||
        nombre.includes("nutricion") ||
        nombre.includes("salud")
    ) {

        return "Instalación de salud";

    }

    return "Edificio universitario";

}


ubicacionesUCR.forEach(
    ubicacion => {

        ubicacion.tipo =
            determinarTipo(
                ubicacion
            );

    }
);


/* =========================================================
   5. MAPA
   ========================================================= */

const elementoMapa =
    document.getElementById(
        "map"
    );


if (
    !elementoMapa
) {

    console.error(
        "No se encontró el elemento #map en la página."
    );

} else {

    const map =
        L.map(
            "map"
        ).setView(
            [
                9.9370,
                -84.0507
            ],
            16
        );


    /* =====================================================
       6. MAPA BASE
       ===================================================== */

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(
        map
    );


    /* =====================================================
       7. CAPAS
       ===================================================== */

    const capaEdificios =
        L.layerGroup().addTo(
            map
        );

    const capaReportes =
        L.layerGroup().addTo(
            map
        );


    /*
       Los reportes estarán debajo
       de los edificios.
    */

    map.createPane(
        "reportesPane"
    );

    map.getPane(
        "reportesPane"
    ).style.zIndex =
        450;


    /* =====================================================
       8. NORMALIZAR ESTADOS
       ===================================================== */

    function normalizarEstado(
        estado
    ) {

        const valor =
            normalizarTexto(
                estado
            );


        if (
            valor === "requiere" ||
            valor === "requiere atencion"
        ) {

            return "requiere";

        }


        if (
            valor === "proceso" ||
            valor === "en proceso" ||
            valor === "mantenimiento" ||
            valor === "en mantenimiento"
        ) {

            return "proceso";

        }


        if (
            valor === "resuelto" ||
            valor === "solucionado"
        ) {

            return "resuelto";

        }


        return "requiere";

    }


    /* =====================================================
       9. ICONO DE EDIFICIO
       ===================================================== */

    function crearIconoEdificio(
        estado
    ) {

        const estadoNormalizado =
            normalizarEstado(
                estado
            );


        let color =
            "#6c8ead";


        if (
            estadoNormalizado ===
            "requiere"
        ) {

            color =
                "#d62828";

        }


        if (
            estadoNormalizado ===
            "proceso"
        ) {

            color =
                "#f4a261";

        }


        if (
            estadoNormalizado ===
            "resuelto"
        ) {

            color =
                "#2a9d8f";

        }


        return L.divIcon({

            className:
                "icono-edificio-estado",

            html: `
                <div style="
                    width:34px;
                    height:34px;
                    background:${color};
                    border:3px solid white;
                    border-radius:50%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    box-shadow:0 3px 8px rgba(0,0,0,.35);
                    font-size:18px;
                ">
                    🏢
                </div>
            `,

            iconSize: [
                40,
                40
            ],

            iconAnchor: [
                20,
                20
            ],

            popupAnchor: [
                0,
                -20
            ]

        });

    }


    /* =====================================================
       10. ICONO DE REPORTE
       ===================================================== */

    function crearIconoReporte(
        estado
    ) {

        const estadoNormalizado =
            normalizarEstado(
                estado
            );


        let color =
            "#d62828";


        if (
            estadoNormalizado ===
            "proceso"
        ) {

            color =
                "#f4a261";

        }


        if (
            estadoNormalizado ===
            "resuelto"
        ) {

            color =
                "#2a9d8f";

        }


        return L.divIcon({

            className:
                "icono-reporte",

            html: `
                <div style="
                    background:${color};
                    width:22px;
                    height:22px;
                    border-radius:50%;
                    border:3px solid white;
                    box-shadow:0 2px 6px rgba(0,0,0,.35);
                "></div>
            `,

            iconSize: [
                28,
                28
            ],

            iconAnchor: [
                14,
                14
            ]

        });

    }


    /* =====================================================
       11. TEXTO DEL ESTADO
       ===================================================== */

    function obtenerTextoEstado(
        estado
    ) {

        const normalizado =
            normalizarEstado(
                estado
            );


        if (
            normalizado ===
            "proceso"
        ) {

            return "🟠 En mantenimiento";

        }


        if (
            normalizado ===
            "resuelto"
        ) {

            return "🟢 Solucionado";

        }


        return "🔴 Requiere atención";

    }


    /* =====================================================
       12. OBTENER TODOS LOS REPORTES
       ===================================================== */

    async function obtenerTodosLosReportes() {

        const resultado =
            await supabaseClient
                .from(
                    "reportes"
                )
                .select(`
                    id,
                    codigo_reporte,
                    finca,
                    ubicacion,
                    edificio,
                    elemento,
                    discapacidad,
                    problema,
                    impacto,
                    recomendacion,
                    comentario_mantenimiento,
                    fecha,
                    fecha_actualizacion,
                    estado,
                    latitud,
                    longitud
                `)
                .order(
                    "fecha",
                    {
                        ascending:
                            false
                    }
                );


        if (
            resultado.error
        ) {

            console.error(
                "Error obteniendo reportes:",
                resultado.error
            );

            return [];

        }


        return (
            resultado.data ||
            []
        );

    }


    /* =====================================================
       13. REPORTES DE UN EDIFICIO
       ===================================================== */

    function obtenerReportesDeUbicacion(
        ubicacion,
        reportes
    ) {

        const id =
            normalizarTexto(
                ubicacion.id
            );


        const nombre =
            normalizarTexto(
                ubicacion.nombre
            );


        return reportes.filter(
            reporte => {

                const idReporte =
                    normalizarTexto(
                        reporte.ubicacion
                    );


                const edificio =
                    normalizarTexto(
                        reporte.edificio
                    );


                return (
                    idReporte === id ||
                    edificio === nombre
                );

            }
        );

    }


    /* =====================================================
       14. ESTADO DEL EDIFICIO
       ===================================================== */

    function determinarEstadoEdificio(
        reportes
    ) {

        if (
            reportes.length === 0
        ) {

            return "sin_reportes";

        }


        const estados =
            reportes.map(
                reporte =>
                    normalizarEstado(
                        reporte.estado
                    )
            );


        /*
           Prioridad:

           🔴 Requiere atención
           🟠 En mantenimiento
           🟢 Resuelto
        */

        if (
            estados.includes(
                "requiere"
            )
        ) {

            return "requiere";

        }


        if (
            estados.includes(
                "proceso"
            )
        ) {

            return "proceso";

        }


        if (
            estados.every(
                estado =>
                    estado ===
                    "resuelto"
            )
        ) {

            return "resuelto";

        }


        return "sin_reportes";

    }


    /* =====================================================
       15. CONTENIDO DEL EDIFICIO
       ===================================================== */

    function crearContenidoEdificio(
        ubicacion,
        reportes
    ) {

        const requiere =
            reportes.filter(
                reporte =>
                    normalizarEstado(
                        reporte.estado
                    ) ===
                    "requiere"
            ).length;


        const proceso =
            reportes.filter(
                reporte =>
                    normalizarEstado(
                        reporte.estado
                    ) ===
                    "proceso"
            ).length;


        const resuelto =
            reportes.filter(
                reporte =>
                    normalizarEstado(
                        reporte.estado
                    ) ===
                    "resuelto"
            ).length;


        const total =
            reportes.length;


        let estadoHTML =
            "";


        if (
            total === 0
        ) {

            estadoHTML = `
                <div style="
                    background:#eef6fb;
                    padding:12px;
                    border-radius:12px;
                    margin-top:14px;
                ">

                    <strong>
                        ✓ Sin reportes registrados
                    </strong>

                    <p style="
                        margin:6px 0 0;
                    ">
                        Este espacio no tiene
                        condiciones reportadas.
                    </p>

                </div>
            `;

        } else {

            estadoHTML = `
                <div style="
                    margin-top:14px;
                    padding:12px;
                    border-radius:12px;
                    background:#f7fafc;
                ">

                    <strong>
                        Estado de accesibilidad
                    </strong>

                    <div style="
                        margin-top:8px;
                        display:flex;
                        flex-direction:column;
                        gap:5px;
                    ">

                        <span>
                            🔴 Requiere atención:
                            <strong>
                                ${requiere}
                            </strong>
                        </span>

                        <span>
                            🟠 En mantenimiento:
                            <strong>
                                ${proceso}
                            </strong>
                        </span>

                        <span>
                            🟢 Solucionado:
                            <strong>
                                ${resuelto}
                            </strong>
                        </span>

                        <span>
                            📋 Total de reportes:
                            <strong>
                                ${total}
                            </strong>
                        </span>

                    </div>

                </div>
            `;

        }


        return `
            <div style="
                width:360px;
                max-width:100%;
                font-family:Arial,sans-serif;
            ">

                <h2 style="
                    margin:0 0 6px;
                    color:#124f7c;
                ">
                    ${ubicacion.nombre}
                </h2>

                <div style="
                    color:#667;
                    margin-bottom:8px;
                ">

                    <strong>
                        ${ubicacion.sigla}
                    </strong>

                    ·

                    ${ubicacion.tipo}

                </div>

                <div style="
                    color:#555;
                ">

                    ${ubicacion.finca}

                </div>

                ${estadoHTML}

                ${
                    total > 0
                    ?
                    `
                        <button
                            type="button"
                            onclick="mostrarReportesEdificio('${ubicacion.id}')"
                            style="
                                margin-top:14px;
                                width:100%;
                                background:#124f7c;
                                color:white;
                                border:none;
                                padding:11px;
                                border-radius:10px;
                                cursor:pointer;
                                font-weight:600;
                            "
                        >

                            📋 Ver ${total}

                            ${
                                total === 1
                                ?
                                "reporte"
                                :
                                "reportes"
                            }

                        </button>
                    `
                    :
                    ""
                }

                <button
                    type="button"
                    onclick="prepararReporteEdificio('${ubicacion.id}')"
                    style="
                        margin-top:8px;
                        width:100%;
                        background:white;
                        color:#124f7c;
                        padding:9px;
                        border:1px solid #124f7c;
                        border-radius:9px;
                        cursor:pointer;
                        font-weight:600;
                    "
                >

                    ➕ Reportar una condición

                </button>

            </div>
        `;

    }


    /* =====================================================
       16. CARGAR EDIFICIOS
       ===================================================== */

    async function cargarEdificios() {

        const reportes =
            await obtenerTodosLosReportes();


        capaEdificios.clearLayers();


        ubicacionesUCR.forEach(
            ubicacion => {

                const reportesEdificio =
                    obtenerReportesDeUbicacion(
                        ubicacion,
                        reportes
                    );


                const estado =
                    determinarEstadoEdificio(
                        reportesEdificio
                    );


                const marcador =
                    L.marker(
                        [
                            ubicacion.lat,
                            ubicacion.lng
                        ],
                        {

                            icon:
                                crearIconoEdificio(
                                    estado
                                ),

                            /*
                               Los edificios siempre
                               están encima.
                            */

                            zIndexOffset:
                                1000

                        }
                    );


                marcador.bindPopup(
                    crearContenidoEdificio(
                        ubicacion,
                        reportesEdificio
                    ),
                    {
                        maxWidth:
                            420,

                        minWidth:
                            320
                    }
                );


                marcador.on(
                    "click",
                    function() {

                        map.flyTo(
                            [
                                ubicacion.lat,
                                ubicacion.lng
                            ],
                            18,
                            {
                                duration:
                                    0.7
                            }
                        );

                    }
                );


                marcador.addTo(
                    capaEdificios
                );

            }
        );

    }


    /* =====================================================
       17. CARGAR REPORTES EN EL MAPA
       ===================================================== */

    async function cargarReportesMapa() {

        const reportes =
            await obtenerTodosLosReportes();


        capaReportes.clearLayers();


        reportes.forEach(
            reporte => {

                if (
                    reporte.latitud === null ||
                    reporte.latitud === undefined ||
                    reporte.longitud === null ||
                    reporte.longitud === undefined
                ) {

                    return;

                }


                /*
                   IMPORTANTE:

                   Los reportes están debajo
                   de los edificios.

                   Además NO capturan clics.
                */

                L.marker(
                    [
                        Number(
                            reporte.latitud
                        ),
                        Number(
                            reporte.longitud
                        )
                    ],
                    {

                        icon:
                            crearIconoReporte(
                                reporte.estado
                            ),

                        pane:
                            "reportesPane",

                        interactive:
                            false

                    }
                ).addTo(
                    capaReportes
                );

            }
        );

    }


    /* =====================================================
       18. MOSTRAR TODOS LOS REPORTES
       ===================================================== */

    async function mostrarReportesEdificio(
        idUbicacion
    ) {

        const ubicacion =
            ubicacionesUCR.find(
                ubicacion =>
                    ubicacion.id ===
                    idUbicacion
            );


        if (
            !ubicacion
        ) {

            return;

        }


        const reportes =
            await obtenerTodosLosReportes();


        const reportesEdificio =
            obtenerReportesDeUbicacion(
                ubicacion,
                reportes
            );


        if (
            reportesEdificio.length ===
            0
        ) {

            alert(
                "Este edificio no tiene reportes registrados."
            );

            return;

        }


        let contenido = `

            <div style="
                width:390px;
                max-width:100%;
                max-height:520px;
                overflow-y:auto;
                font-family:Arial,sans-serif;
            ">

                <h2 style="
                    color:#124f7c;
                ">
                    📋 Reportes de accesibilidad
                </h2>

                <p>

                    <strong>
                        ${ubicacion.nombre}
                    </strong>

                    <br>

                    ${ubicacion.finca}
                    ·
                    ${ubicacion.sigla}

                </p>

        `;


        reportesEdificio.forEach(
            (
                reporte,
                indice
            ) => {

                contenido += `

                    <details style="
                        border:1px solid #dce5eb;
                        border-radius:12px;
                        margin-bottom:10px;
                        overflow:hidden;
                        background:white;
                    ">

                        <summary style="
                            cursor:pointer;
                            padding:13px;
                            background:#f7fafc;
                        ">

                            <strong>
                                Reporte ${indice + 1}
                            </strong>

                            <br>

                            <small>

                                ${
                                    reporte.codigo_reporte ||
                                    "Sin código"
                                }

                                ·

                                ${
                                    obtenerTextoEstado(
                                        reporte.estado
                                    )
                                }

                            </small>

                        </summary>

                        <div style="
                            padding:13px;
                            font-size:13px;
                        ">

                            <p>

                                <strong>
                                    Elemento:
                                </strong>

                                ${
                                    reporte.elemento ||
                                    "No indicado"
                                }

                            </p>

                            <p>

                                <strong>
                                    Discapacidad:
                                </strong>

                                ${
                                    reporte.discapacidad ||
                                    "No indicada"
                                }

                            </p>

                            <p>

                                <strong>
                                    Problema:
                                </strong>

                                ${
                                    reporte.problema ||
                                    "No indicado"
                                }

                            </p>

                            <p>

                                <strong>
                                    Impacto:
                                </strong>

                                ${
                                    reporte.impacto ||
                                    "No indicado"
                                }

                            </p>

                            ${
                                reporte.recomendacion
                                ?
                                `
                                    <p>

                                        <strong>
                                            Recomendación:
                                        </strong>

                                        ${
                                            reporte.recomendacion
                                        }

                                    </p>
                                `
                                :
                                ""
                            }

                            ${
                                reporte.comentario_mantenimiento
                                ?
                                `
                                    <div style="
                                        background:#f5f8fa;
                                        padding:10px;
                                        border-radius:8px;
                                        margin-top:10px;
                                    ">

                                        <strong>
                                            Observación de mantenimiento:
                                        </strong>

                                        <br>

                                        ${
                                            reporte.comentario_mantenimiento
                                        }

                                    </div>
                                `
                                :
                                ""
                            }

                            ${
                                reporte.foto
                                ?
                                `
                                    <div style="
                                        margin-top:10px;
                                        width:100%;
                                        max-width:100%;
                                        overflow:hidden;
                                        border-radius:10px;
                                    ">

                                        <img
                                            src="${reporte.foto}"
                                            alt="Fotografía del reporte"
                                            style="
                                                display:block;
                                                width:100%;
                                                max-width:100%;
                                                max-height:220px;
                                                object-fit:contain;
                                                border-radius:10px;
                                            "
                                        >

                                    </div>
                                `
                                :
                                ""
                            }

                        </div>

                    </details>

                `;

            }
        );


        contenido += `

            </div>

        `;


        L.popup(
            {
                maxWidth:
                    440
            }
        )
            .setLatLng(
                [
                    ubicacion.lat,
                    ubicacion.lng
                ]
            )
            .setContent(
                contenido
            )
            .openOn(
                map
            );

    }


    window.mostrarReportesEdificio =
        mostrarReportesEdificio;


    /* =====================================================
       19. PREPARAR FORMULARIO
       ===================================================== */

    const selectorFinca =
        document.getElementById(
            "fincaReporte"
        );


    const selectorUbicacion =
        document.getElementById(
            "ubicacion"
        );


    const contenedorEdificio =
        document.getElementById(
            "contenedorEdificio"
        );


    if (
        selectorFinca &&
        selectorUbicacion
    ) {

        selectorFinca.addEventListener(
            "change",
            function() {

                const finca =
                    selectorFinca.value;


                selectorUbicacion.innerHTML = `

                    <option value="">
                        Selecciona un edificio o espacio
                    </option>

                `;


                if (
                    !finca
                ) {

                    if (
                        contenedorEdificio
                    ) {

                        contenedorEdificio.style.display =
                            "none";

                    }

                    return;

                }


                ubicacionesUCR
                    .filter(
                        ubicacion =>
                            ubicacion.finca ===
                            finca
                    )
                    .forEach(
                        ubicacion => {

                            const opcion =
                                document.createElement(
                                    "option"
                                );


                            opcion.value =
                                ubicacion.id;


                            opcion.textContent =
                                `${ubicacion.nombre} — ${ubicacion.sigla}`;


                            selectorUbicacion.appendChild(
                                opcion
                            );

                        }
                    );


                if (
                    contenedorEdificio
                ) {

                    contenedorEdificio.style.display =
                        "block";

                }

            }
        );

    }


    if (
        selectorUbicacion
    ) {

        selectorUbicacion.addEventListener(
            "change",
            function() {

                const ubicacion =
                    ubicacionesUCR.find(
                        u =>
                            u.id ===
                            selectorUbicacion.value
                    );


                if (
                    ubicacion
                ) {

                    map.flyTo(
                        [
                            ubicacion.lat,
                            ubicacion.lng
                        ],
                        18,
                        {
                            duration:
                                0.7
                        }
                    );

                }

            }
        );

    }


    function prepararReporteEdificio(
        idUbicacion
    ) {

        const ubicacion =
            ubicacionesUCR.find(
                u =>
                    u.id ===
                    idUbicacion
            );


        if (
            !ubicacion
        ) {

            return;

        }


        if (
            selectorFinca
        ) {

            selectorFinca.value =
                ubicacion.finca;


            selectorFinca.dispatchEvent(
                new Event(
                    "change"
                )
            );

        }


        setTimeout(
            function() {

                if (
                    selectorUbicacion
                ) {

                    selectorUbicacion.value =
                        ubicacion.id;

                }


                const seccion =
                    document.getElementById(
                        "reportar"
                    );


                if (
                    seccion
                ) {

                    seccion.scrollIntoView(
                        {
                            behavior:
                                "smooth"
                        }
                    );

                }

            },
            200
        );

    }


    window.prepararReporteEdificio =
        prepararReporteEdificio;


    /* =====================================================
       20. FORMULARIO DE REPORTES
       ===================================================== */

    const formularioReporte =
        document.getElementById(
            "formularioReporte"
        );


    const campoFoto =
        document.getElementById(
            "foto"
        );


    if (
        formularioReporte
    ) {

        formularioReporte.addEventListener(
            "submit",
            async function(evento) {

                evento.preventDefault();


                const botonEnviar =
                    formularioReporte.querySelector(
                        'button[type="submit"]'
                    );


                if (
                    botonEnviar
                ) {

                    botonEnviar.disabled =
                        true;


                    botonEnviar.dataset.textoOriginal =
                        botonEnviar.textContent;


                    botonEnviar.textContent =
                        "Enviando reporte...";

                }


                let nombreArchivo =
                    null;


                let urlFoto =
                    null;


                try {

                    /* =================================
                       DATOS PRINCIPALES
                       ================================= */

                    const finca =
                        selectorFinca
                            ?
                            selectorFinca.value.trim()
                            :
                            "";


                    const idUbicacion =
                        selectorUbicacion
                            ?
                            selectorUbicacion.value.trim()
                            :
                            "";


                    const ubicacion =
                        ubicacionesUCR.find(
                            u =>
                                u.id ===
                                idUbicacion
                        );


                    const campoElemento =
                        document.getElementById(
                            "elemento"
                        );


                    const campoDiscapacidad =
                        document.getElementById(
                            "discapacidad"
                        );


                    const campoProblema =
                        document.getElementById(
                            "problema"
                        );


                    const campoImpacto =
                        document.getElementById(
                            "impacto"
                        );


                    const campoRecomendacion =
                        document.getElementById(
                            "recomendacion"
                        );


                    const elemento =
                        campoElemento
                            ?
                            campoElemento.value.trim()
                            :
                            "";


                    const discapacidad =
                        campoDiscapacidad
                            ?
                            campoDiscapacidad.value.trim()
                            :
                            "";


                    const problema =
                        campoProblema
                            ?
                            campoProblema.value.trim()
                            :
                            "";


                    const impacto =
                        campoImpacto
                            ?
                            campoImpacto.value.trim()
                            :
                            "";


                    const recomendacion =
                        campoRecomendacion
                            ?
                            campoRecomendacion.value.trim()
                            :
                            "";


                    /* =================================
                       VALIDACIONES
                       ================================= */

                    if (
                        !finca
                    ) {

                        throw new Error(
                            "Selecciona una finca."
                        );

                    }


                    if (
                        !ubicacion
                    ) {

                        throw new Error(
                            "Selecciona un edificio o espacio."
                        );

                    }


                    if (
                        !elemento
                    ) {

                        throw new Error(
                            "Selecciona o indica el elemento relacionado con el reporte."
                        );

                    }


                    if (
                        !discapacidad
                    ) {

                        throw new Error(
                            "Selecciona el tipo de discapacidad."
                        );

                    }


                    if (
                        !problema
                    ) {

                        throw new Error(
                            "Describe el problema de accesibilidad."
                        );

                    }


                    if (
                        !impacto
                    ) {

                        throw new Error(
                            "Describe el impacto o dificultad que genera el problema."
                        );

                    }


                    /* =================================
                       CÓDIGO DEL REPORTE
                       ================================= */

                    const codigoReporte =
                        "REP-" +
                        Date.now();


                    /* =================================
                       FOTOGRAFÍA
                       ================================= */

                    if (
                        campoFoto &&
                        campoFoto.files &&
                        campoFoto.files.length > 0
                    ) {

                        const archivo =
                            campoFoto.files[0];


                        const limiteFoto =
                            10 *
                            1024 *
                            1024;


                        if (
                            archivo.size >
                            limiteFoto
                        ) {

                            throw new Error(
                                "La fotografía supera el tamaño máximo permitido de 10 MB."
                            );

                        }


                        const nombreLimpio =
                            archivo.name.replace(
                                /[^\w.\-() ]+/g,
                                "_"
                            );


                        nombreArchivo =
                            codigoReporte +
                            "-" +
                            nombreLimpio;


                        const resultadoSubida =
                            await supabaseClient
                                .storage
                                .from(
                                    "reportes-fotos"
                                )
                                .upload(
                                    nombreArchivo,
                                    archivo,
                                    {
                                        cacheControl:
                                            "3600",

                                        upsert:
                                            false
                                    }
                                );


                        if (
                            resultadoSubida.error
                        ) {

                            throw new Error(
                                "No se pudo subir la fotografía: " +
                                resultadoSubida.error.message
                            );

                        }


                        const resultadoURL =
                            supabaseClient
                                .storage
                                .from(
                                    "reportes-fotos"
                                )
                                .getPublicUrl(
                                    nombreArchivo
                                );


                        if (
                            resultadoURL.error
                        ) {

                            throw new Error(
                                "La fotografía fue subida, pero no se pudo obtener su URL."
                            );

                        }


                        urlFoto =
                            resultadoURL
                                .data
                                .publicUrl;

                    }


                    /* =================================
                       DATOS PARA SUPABASE
                       ================================= */

                    const datosReporte = {

                        codigo_reporte:
                            codigoReporte,

                        ubicacion:
                            ubicacion.id,

                        edificio:
                            ubicacion.nombre,

                        finca:
                            finca,

                        elemento:
                            elemento,

                        discapacidad:
                            discapacidad,

                        problema:
                            problema,

                        impacto:
                            impacto,

                        recomendacion:
                            recomendacion ||
                            null,

                        foto:
                            urlFoto,

                        latitud:
                            ubicacion.lat,

                        longitud:
                            ubicacion.lng,

                        estado:
                            "requiere"

                    };


                    console.log(
                        "Datos que se enviarán a Supabase:",
                        datosReporte
                    );


                    /* =================================
                       INSERTAR
                       ================================= */

                    const resultadoInsercion =
                        await supabaseClient
                            .from(
                                "reportes"
                            )
                            .insert(
                                datosReporte
                            );


                    if (
                        resultadoInsercion.error
                    ) {

                        throw new Error(
                            resultadoInsercion.error.message
                        );

                    }


                    /* =================================
                       CONFIRMACIÓN
                       ================================= */

                    alert(
                        "Reporte enviado correctamente.\n\n" +
                        "Código del reporte: " +
                        codigoReporte
                    );


                    formularioReporte.reset();


                    if (
                        contenedorEdificio
                    ) {

                        contenedorEdificio.style.display =
                            "none";

                    }


                    await actualizarMapaDespuesDeReporte();

                }


                catch (
                    error
                ) {

                    console.error(
                        "Error enviando reporte:",
                        error
                    );


                    /*
                       Si la fotografía ya fue subida
                       pero posteriormente ocurrió un
                       error, se elimina de Storage.
                    */

                    if (
                        nombreArchivo
                    ) {

                        try {

                            await supabaseClient
                                .storage
                                .from(
                                    "reportes-fotos"
                                )
                                .remove(
                                    [
                                        nombreArchivo
                                    ]
                                );

                        }

                        catch (
                            errorEliminarFoto
                        ) {

                            console.warn(
                                "No se pudo limpiar la fotografía:",
                                errorEliminarFoto
                            );

                        }

                    }


                    alert(
                        "No se pudo enviar el reporte.\n\n" +
                        (
                            error &&
                            error.message
                            ?
                            error.message
                            :
                            "Ocurrió un error inesperado."
                        )
                    );

                }


                finally {

                    if (
                        botonEnviar
                    ) {

                        botonEnviar.disabled =
                            false;


                        botonEnviar.textContent =
                            botonEnviar.dataset
                                .textoOriginal ||
                            "Enviar reporte";

                    }

                }

            }
        );

    }


    /* =====================================================
       21. ACTUALIZAR MAPA DESPUÉS DE REPORTE
       ===================================================== */

    async function actualizarMapaDespuesDeReporte() {

        try {

            await cargarEdificios();

            await cargarReportesMapa();


            const estadoActual =
                filtroEstado
                    ?
                    filtroEstado.value
                    :
                    "todos";


            const discapacidadActual =
                filtroDiscapacidad
                    ?
                    filtroDiscapacidad.value
                    :
                    "todas";


            if (
                estadoActual !== "todos" ||
                discapacidadActual !== "todas"
            ) {

                await aplicarFiltros();

            }

        }

        catch (
            error
        ) {

            console.error(
                "Error actualizando mapa después del reporte:",
                error
            );

        }

    }


    /* =====================================================
       22. FILTROS
       ===================================================== */

    const filtroEstado =
        document.getElementById(
            "filtroEstado"
        );


    const filtroDiscapacidad =
        document.getElementById(
            "filtroDiscapacidad"
        );


    /* =====================================================
       23. COMPARAR ESTADOS
       ===================================================== */

    function coincideEstadoFiltro(
        estadoReporte,
        estadoFiltro
    ) {

        const reporte =
            normalizarEstado(
                estadoReporte
            );


        const filtro =
            normalizarTexto(
                estadoFiltro
            );


        if (
            filtro === "" ||
            filtro === "todos" ||
            filtro === "todos los estados"
        ) {

            return true;

        }


        if (
            filtro === "requiere" ||
            filtro === "requiere atencion"
        ) {

            return (
                reporte ===
                "requiere"
            );

        }


        if (
            filtro === "proceso" ||
            filtro === "en proceso" ||
            filtro === "mantenimiento" ||
            filtro === "en mantenimiento"
        ) {

            return (
                reporte ===
                "proceso"
            );

        }


        if (
            filtro === "resuelto" ||
            filtro === "solucionado"
        ) {

            return (
                reporte ===
                "resuelto"
            );

        }


        return (
            reporte ===
            normalizarEstado(
                filtro
            )
        );

    }


    /* =====================================================
       24. COMPARAR DISCAPACIDAD
       ===================================================== */

    function coincideDiscapacidadFiltro(
        discapacidadReporte,
        discapacidadFiltro
    ) {

        const reporte =
            normalizarTexto(
                discapacidadReporte
            );


        const filtro =
            normalizarTexto(
                discapacidadFiltro
            );


        if (
            filtro === "" ||
            filtro === "todas" ||
            filtro === "todos"
        ) {

            return true;

        }


        if (
            reporte ===
            filtro
        ) {

            return true;

        }


        return (
            reporte.includes(
                filtro
            ) ||
            filtro.includes(
                reporte
            )
        );

    }


    /* =====================================================
       25. APLICAR FILTROS
       ===================================================== */

    async function aplicarFiltros() {

        try {

            const estadoSeleccionado =
                filtroEstado
                    ?
                    filtroEstado.value
                    :
                    "todos";


            const discapacidadSeleccionada =
                filtroDiscapacidad
                    ?
                    filtroDiscapacidad.value
                    :
                    "todas";


            const reportes =
                await obtenerTodosLosReportes();


            const reportesFiltrados =
                reportes.filter(
                    reporte => {

                        const coincideEstado =
                            coincideEstadoFiltro(
                                reporte.estado,
                                estadoSeleccionado
                            );


                        const coincideDiscapacidad =
                            coincideDiscapacidadFiltro(
                                reporte.discapacidad,
                                discapacidadSeleccionada
                            );


                        return (
                            coincideEstado &&
                            coincideDiscapacidad
                        );

                    }
                );


            /*
               IMPORTANTE:

               Solo se limpia la capa de reportes.

               Los edificios permanecen.
            */

            capaReportes.clearLayers();


            reportesFiltrados.forEach(
                reporte => {

                    if (
                        reporte.latitud === null ||
                        reporte.latitud === undefined ||
                        reporte.longitud === null ||
                        reporte.longitud === undefined
                    ) {

                        return;

                    }


                    L.marker(
                        [
                            Number(
                                reporte.latitud
                            ),
                            Number(
                                reporte.longitud
                            )
                        ],
                        {

                            icon:
                                crearIconoReporte(
                                    reporte.estado
                                ),

                            pane:
                                "reportesPane",

                            interactive:
                                false

                        }
                    ).addTo(
                        capaReportes
                    );

                }
            );


            console.log(
                "Filtros aplicados:",
                {
                    estado:
                        estadoSeleccionado,

                    discapacidad:
                        discapacidadSeleccionada,

                    resultados:
                        reportesFiltrados.length
                }
            );

        }

        catch (
            error
        ) {

            console.error(
                "Error aplicando filtros:",
                error
            );

        }

    }


    /* =====================================================
       26. EVENTOS DE FILTROS
       ===================================================== */

    if (
        filtroEstado
    ) {

        filtroEstado.addEventListener(
            "change",
            function() {

                aplicarFiltros();

            }
        );

    }


    if (
        filtroDiscapacidad
    ) {

        filtroDiscapacidad.addEventListener(
            "change",
            function() {

                aplicarFiltros();

            }
        );

    }


    /* =====================================================
       27. ACTUALIZAR MAPA COMPLETO
       ===================================================== */

    async function actualizarMapaCompleto() {

        try {

            await cargarEdificios();

            await cargarReportesMapa();

        }

        catch (
            error
        ) {

            console.error(
                "Error actualizando el mapa:",
                error
            );

        }

    }


    /* =====================================================
       28. FUNCIONES PÚBLICAS
       ===================================================== */

    window.actualizarMapaCompleto =
        actualizarMapaCompleto;


    window.actualizarMapaDespuesDeReporte =
        actualizarMapaDespuesDeReporte;


    window.aplicarFiltros =
        aplicarFiltros;


    window.cargarEdificios =
        cargarEdificios;


    window.cargarReportesMapa =
        cargarReportesMapa;


    window.mostrarReportesEdificio =
        mostrarReportesEdificio;


    window.prepararReporteEdificio =
        prepararReporteEdificio;


    /* =====================================================
       29. INICIAR APLICACIÓN
       ===================================================== */

    actualizarMapaCompleto()
        .then(
            function() {

                console.log(
                    "Mapa de accesibilidad UCR listo correctamente."
                );

            }
        )
        .catch(
            function(error) {

                console.error(
                    "Error iniciando el mapa:",
                    error
                );

            }
        );

}