/* =========================================================
   PANEL DE MANTENIMIENTO
   ACCESIBILIDAD UCR
   ========================================================= */

console.log("mantenimiento.js - versión 3");

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
   2. VARIABLES
   ========================================================= */

let todosLosReportes = [];


/* =========================================================
   3. ELEMENTOS HTML
   ========================================================= */

const seccionLogin =
    document.getElementById("seccionLogin");

const seccionPanel =
    document.getElementById("seccionPanel");

const formularioLogin =
    document.getElementById("formularioLogin");

const correo =
    document.getElementById("correo");

const contrasena =
    document.getElementById("contrasena");

const mensajeErrorLogin =
    document.getElementById("mensajeErrorLogin");

const botonCerrarSesion =
    document.getElementById("botonCerrarSesion");

const buscador =
    document.getElementById("buscador");

const filtroEstado =
    document.getElementById("filtroEstado");

const filtroFinca =
    document.getElementById("filtroFinca");

const listaReportes =
    document.getElementById("listaReportes");

const cantidadReportes =
    document.getElementById("cantidadReportes");

const contadorRequiere =
    document.getElementById("contadorRequiere");

const contadorProceso =
    document.getElementById("contadorProceso");

const contadorResuelto =
    document.getElementById("contadorResuelto");

const contadorTotal =
    document.getElementById("contadorTotal");


/* =========================================================
   4. INICIO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    verificarSesion
);


/* =========================================================
   5. SESIÓN
   ========================================================= */

async function verificarSesion() {

    try {

        const {
            data,
            error
        } = await supabaseClient.auth.getSession();

        if (error) {

            console.error(
                "Error verificando sesión:",
                error
            );

            return;
        }

        if (data.session) {

            await verificarRolMantenimiento(
                data.session.user.id
            );
        }

    } catch (error) {

        console.error(
            "Error verificando sesión:",
            error
        );
    }
}


/* =========================================================
   6. LOGIN
   ========================================================= */

formularioLogin.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        mensajeErrorLogin.style.display =
            "none";

        const email =
            correo.value.trim();

        const password =
            contrasena.value;

        if (!email || !password) {

            mostrarErrorLogin(
                "Debes ingresar el correo y la contraseña."
            );

            return;
        }

        const boton =
            formularioLogin.querySelector(
                "button[type='submit']"
            );

        boton.disabled = true;

        boton.textContent =
            "Verificando acceso...";

        try {

            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signInWithPassword({
                        email,
                        password
                    });

            if (error) {

                console.error(
                    "Error de inicio de sesión:",
                    error
                );

                mostrarErrorLogin(
                    "El correo o la contraseña no son correctos."
                );

                return;
            }

            if (!data.user) {

                mostrarErrorLogin(
                    "No fue posible identificar al usuario."
                );

                return;
            }

            await verificarRolMantenimiento(
                data.user.id
            );

        } catch (error) {

            console.error(
                "Error:",
                error
            );

            mostrarErrorLogin(
                "Ocurrió un error al intentar ingresar."
            );

        } finally {

            boton.disabled = false;

            boton.textContent =
                "Ingresar al panel";
        }
    }
);


/* =========================================================
   7. VERIFICAR ROL
   ========================================================= */

async function verificarRolMantenimiento(
    userId
) {

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("perfiles")
                .select("id,nombre,rol")
                .eq("id", userId)
                .maybeSingle();

        if (error) {

            console.error(
                "Error consultando perfil:",
                error
            );

            await supabaseClient.auth.signOut();

            mostrarErrorLogin(
                "No fue posible verificar los permisos."
            );

            return;
        }

        if (!data) {

            await supabaseClient.auth.signOut();

            mostrarErrorLogin(
                "Este usuario no está autorizado."
            );

            return;
        }

        if (data.rol !== "mantenimiento") {

            await supabaseClient.auth.signOut();

            mostrarErrorLogin(
                "Este usuario no tiene permisos de mantenimiento."
            );

            return;
        }

        console.log(
            "Acceso autorizado:",
            data.nombre
        );

        seccionLogin.style.display =
            "none";

        seccionPanel.style.display =
            "block";

        await cargarReportes();

    } catch (error) {

        console.error(
            "Error verificando rol:",
            error
        );

        await supabaseClient.auth.signOut();

        mostrarErrorLogin(
            "Ocurrió un error al verificar los permisos."
        );
    }
}


/* =========================================================
   8. CARGAR REPORTES
   ========================================================= */

async function cargarReportes() {

    listaReportes.innerHTML = `
        <div class="cargando">
            Cargando reportes de mantenimiento...
        </div>
    `;

    console.log(
        "Cargando reportes de mantenimiento..."
    );

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("reportes")
                .select("*")
                .order(
                    "fecha",
                    {
                        ascending: false
                    }
                );

        if (error) {

            console.error(
                "Error cargando reportes:",
                error
            );

            listaReportes.innerHTML = `
                <div class="sin-reportes">
                    <div class="icono">⚠️</div>
                    <h3>
                        No fue posible cargar los reportes
                    </h3>
                    <p>
                        Revisa la conexión con Supabase.
                    </p>
                </div>
            `;

            return;
        }

        todosLosReportes =
            data || [];

        console.log(
            "Reportes cargados:",
            todosLosReportes
        );

        actualizarEstadisticas();

        aplicarFiltros();

    } catch (error) {

        console.error(
            "Error:",
            error
        );
    }
}


/* =========================================================
   9. NORMALIZAR ESTADOS
   ========================================================= */

function normalizarEstado(estado) {

    if (!estado) {

        return "requiere";
    }

    const valor =
        String(estado)
            .toLowerCase()
            .trim();

    if (
        valor === "requiere" ||
        valor === "requiere atención" ||
        valor === "requiere atencion"
    ) {

        return "requiere";
    }

    if (
        valor === "proceso" ||
        valor === "en proceso" ||
        valor === "mantenimiento"
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


/* =========================================================
   10. ESTADÍSTICAS
   ========================================================= */

function actualizarEstadisticas() {

    const requiere =
        todosLosReportes.filter(
            r =>
                normalizarEstado(r.estado)
                === "requiere"
        ).length;

    const proceso =
        todosLosReportes.filter(
            r =>
                normalizarEstado(r.estado)
                === "proceso"
        ).length;

    const resuelto =
        todosLosReportes.filter(
            r =>
                normalizarEstado(r.estado)
                === "resuelto"
        ).length;

    contadorRequiere.textContent =
        requiere;

    contadorProceso.textContent =
        proceso;

    contadorResuelto.textContent =
        resuelto;

    contadorTotal.textContent =
        todosLosReportes.length;
}


/* =========================================================
   11. FILTROS
   ========================================================= */

function aplicarFiltros() {

    const texto =
        buscador.value
            .toLowerCase()
            .trim();

    const estado =
        filtroEstado.value;

    const finca =
        filtroFinca.value;

    const filtrados =
        todosLosReportes.filter(
            reporte => {

                const textoCoincide =
                    !texto ||
                    String(
                        reporte.codigo_reporte || ""
                    )
                        .toLowerCase()
                        .includes(texto) ||
                    String(
                        reporte.edificio || ""
                    )
                        .toLowerCase()
                        .includes(texto) ||
                    String(
                        reporte.ubicacion || ""
                    )
                        .toLowerCase()
                        .includes(texto) ||
                    String(
                        reporte.elemento || ""
                    )
                        .toLowerCase()
                        .includes(texto);

                const estadoCoincide =
                    estado === "todos" ||
                    normalizarEstado(
                        reporte.estado
                    ) === estado;

                const fincaCoincide =
                    finca === "todas" ||
                    reporte.finca === finca;

                return (
                    textoCoincide &&
                    estadoCoincide &&
                    fincaCoincide
                );
            }
        );

    renderizarReportes(
        filtrados
    );
}


/* =========================================================
   12. RENDERIZAR
   ========================================================= */

function renderizarReportes(
    reportes
) {

    cantidadReportes.textContent =
        `${reportes.length} ${
            reportes.length === 1
                ? "reporte"
                : "reportes"
        }`;

    if (!reportes.length) {

        listaReportes.innerHTML = `
            <div class="sin-reportes">
                <div class="icono">🔎</div>
                <h3>
                    No hay reportes para mostrar
                </h3>
                <p>
                    Modifica los filtros de búsqueda.
                </p>
            </div>
        `;

        return;
    }

    listaReportes.innerHTML =
        reportes
            .map(crearTarjetaReporte)
            .join("");
}


/* =========================================================
   13. TARJETA
   ========================================================= */

function crearTarjetaReporte(
    reporte
) {

    const estado =
        normalizarEstado(
            reporte.estado
        );

    const nombreEstado =
        estado === "proceso"
            ? "🟠 En proceso"
            : estado === "resuelto"
                ? "🟢 Resuelto"
                : "🔴 Requiere atención";

    const claseEstado =
        estado === "proceso"
            ? "estado-proceso"
            : estado === "resuelto"
                ? "estado-resuelto"
                : "estado-requiere";

    const foto =
        reporte.foto
            ? `
                <div class="foto-reporte">
                    <h4>
                        Fotografía del reporte
                    </h4>

                    <img
                        src="${escapeHTML(reporte.foto)}"
                        alt="Fotografía del reporte"
                    >
                </div>
            `
            : "";

    return `

        <article
            class="tarjeta-reporte"
            data-id="${reporte.id}"
        >

            <div class="encabezado-reporte">

                <div>
                    <div class="codigo-reporte">
                        ${escapeHTML(
                            reporte.codigo_reporte ||
                            "Sin código"
                        )}
                    </div>

                    <div class="fecha-reporte">
                        Reportado:
                        ${formatearFecha(
                            reporte.fecha
                        )}
                    </div>
                </div>

                <span
                    class="estado ${claseEstado}"
                >
                    ${nombreEstado}
                </span>

            </div>


            <div class="cuerpo-reporte">

                <div class="informacion-reporte">

                    <div class="dato">
                        <span class="etiqueta">
                            Finca
                        </span>
                        <span class="valor">
                            ${escapeHTML(
                                reporte.finca ||
                                "No especificada"
                            )}
                        </span>
                    </div>

                    <div class="dato">
                        <span class="etiqueta">
                            Edificio / ubicación
                        </span>
                        <span class="valor">
                            ${escapeHTML(
                                reporte.edificio ||
                                reporte.ubicacion ||
                                "No especificado"
                            )}
                        </span>
                    </div>

                    <div class="dato">
                        <span class="etiqueta">
                            Elemento afectado
                        </span>
                        <span class="valor">
                            ${escapeHTML(
                                reporte.elemento ||
                                "No especificado"
                            )}
                        </span>
                    </div>

                    <div class="dato">
                        <span class="etiqueta">
                            Discapacidad relacionada
                        </span>
                        <span class="valor">
                            ${escapeHTML(
                                reporte.discapacidad ||
                                "No especificada"
                            )}
                        </span>
                    </div>

                    <div class="dato">
                        <span class="etiqueta">
                            Código interno
                        </span>
                        <span class="valor">
                            ${escapeHTML(
                                reporte.ubicacion ||
                                "No especificado"
                            )}
                        </span>
                    </div>

                    <div class="dato">
                        <span class="etiqueta">
                            Última actualización
                        </span>
                        <span class="valor">
                            ${
                                reporte.fecha_actualizacion
                                    ? formatearFecha(
                                        reporte.fecha_actualizacion
                                    )
                                    : "Sin actualizar"
                            }
                        </span>
                    </div>

                </div>


                <div class="descripcion-reporte">

                    <div class="bloque-texto">
                        <h4>
                            Problema identificado
                        </h4>
                        <p>
                            ${escapeHTML(
                                reporte.problema ||
                                "No especificado"
                            )}
                        </p>
                    </div>

                    <div class="bloque-texto">
                        <h4>
                            Impacto en accesibilidad
                        </h4>
                        <p>
                            ${escapeHTML(
                                reporte.impacto ||
                                "No especificado"
                            )}
                        </p>
                    </div>

                    <div class="bloque-texto">
                        <h4>
                            Recomendación
                        </h4>
                        <p>
                            ${escapeHTML(
                                reporte.recomendacion ||
                                "No registrada"
                            )}
                        </p>
                    </div>

                    <div class="bloque-texto">
                        <h4>
                            Observación de mantenimiento
                        </h4>
                        <p>
                            ${escapeHTML(
                                reporte.comentario_mantenimiento ||
                                "Todavía no se ha registrado una observación."
                            )}
                        </p>
                    </div>

                </div>


                ${foto}


                <div class="zona-mantenimiento">

                    <h4>
                        Gestión del reporte
                    </h4>

                    <div class="controles-mantenimiento">

                        <div class="grupo-formulario">

                            <label
                                for="estado-${reporte.id}"
                            >
                                Cambiar estado
                            </label>

                            <select
                                id="estado-${reporte.id}"
                                onchange="mostrarBotonEliminar(${reporte.id})"
                            >

                                <option
                                    value="requiere"
                                    ${
                                        estado === "requiere"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    🔴 Requiere atención
                                </option>

                                <option
                                    value="proceso"
                                    ${
                                        estado === "proceso"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    🟠 En proceso
                                </option>

                                <option
                                    value="resuelto"
                                    ${
                                        estado === "resuelto"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    🟢 Resuelto
                                </option>

                            </select>

                        </div>


                        <div class="grupo-formulario">

                            <label
                                for="comentario-${reporte.id}"
                            >
                                Observación de mantenimiento
                            </label>

                            <textarea
                                id="comentario-${reporte.id}"
                                rows="2"
                                placeholder="Escribe una observación sobre la intervención..."
                            >${escapeHTML(
                                reporte.comentario_mantenimiento || ""
                            )}</textarea>

                        </div>

                    </div>


                    <div
                        style="
                            display:flex;
                            flex-wrap:wrap;
                            gap:10px;
                            margin-top:10px;
                        "
                    >

                        <button
                            class="boton-actualizar"
                            onclick="actualizarReporte(${reporte.id})"
                        >
                            Actualizar reporte
                        </button>


                        <button
                            id="eliminar-${reporte.id}"
                            onclick="eliminarReporte(${reporte.id})"
                            style="
                                display:${estado === "resuelto" ? "inline-block" : "none"};
                                background:#b42318;
                                color:white;
                                border:none;
                                padding:10px 15px;
                                border-radius:8px;
                                cursor:pointer;
                                font-weight:600;
                            "
                        >
                            🗑️ Eliminar reporte
                        </button>

                    </div>


                    <div
                        id="mensaje-${reporte.id}"
                        class="mensaje-actualizacion"
                    ></div>

                </div>

            </div>

        </article>
    `;
}


/* =========================================================
   14. MOSTRAR / OCULTAR BOTÓN ELIMINAR
   ========================================================= */

function mostrarBotonEliminar(
    idReporte
) {

    const selector =
        document.getElementById(
            `estado-${idReporte}`
        );

    const boton =
        document.getElementById(
            `eliminar-${idReporte}`
        );

    if (!selector || !boton) {

        return;
    }

    boton.style.display =
        selector.value === "resuelto"
            ? "inline-block"
            : "none";
}

window.mostrarBotonEliminar =
    mostrarBotonEliminar;


/* =========================================================
   15. ACTUALIZAR REPORTE
   ========================================================= */

async function actualizarReporte(
    idReporte
) {

    console.log(
        "Actualizando reporte:",
        idReporte
    );

    const selector =
        document.getElementById(
            `estado-${idReporte}`
        );

    const comentario =
        document.getElementById(
            `comentario-${idReporte}`
        );

    const mensaje =
        document.getElementById(
            `mensaje-${idReporte}`
        );

    if (!selector) {

        alert(
            "No se encontró el selector de estado."
        );

        return;
    }

    const nuevoEstado =
        normalizarEstado(
            selector.value
        );

    const nuevoComentario =
        comentario
            ? comentario.value.trim()
            : "";

    const datos = {

        estado:
            nuevoEstado,

        comentario_mantenimiento:
            nuevoComentario,

        fecha_actualizacion:
            new Date().toISOString()
    };

    console.log(
        "Estado seleccionado:",
        nuevoEstado
    );

    console.log(
        "Datos enviados a Supabase:",
        datos
    );

    if (mensaje) {

        mensaje.textContent =
            "Guardando cambios...";

        mensaje.className =
            "mensaje-actualizacion";
    }

    try {

        const {
            error
        } =
            await supabaseClient
                .from("reportes")
                .update(datos)
                .eq(
                    "id",
                    idReporte
                );

        if (error) {

            console.error(
                "Error actualizando reporte:",
                error
            );

            if (mensaje) {

                mensaje.textContent =
                    "❌ No se pudo actualizar el reporte.";

                mensaje.className =
                    "mensaje-actualizacion error";
            }

            alert(
                "No se pudo actualizar el reporte.\n\n" +
                error.message
            );

            return;
        }

        console.log(
            "Reporte actualizado correctamente:",
            idReporte,
            "→",
            nuevoEstado
        );

        if (mensaje) {

            mensaje.textContent =
                "✓ Reporte actualizado correctamente.";

            mensaje.className =
                "mensaje-actualizacion exito";
        }

        await cargarReportes();

    } catch (error) {

        console.error(
            "Error inesperado:",
            error
        );

        alert(
            "Ocurrió un error inesperado."
        );
    }
}

window.actualizarReporte =
    actualizarReporte;


/* =========================================================
   16. ELIMINAR REPORTE
   ========================================================= */

async function eliminarReporte(
    idReporte
) {

    const reporte =
        todosLosReportes.find(
            r =>
                String(r.id) ===
                String(idReporte)
        );

    if (!reporte) {

        alert(
            "No se encontró el reporte."
        );

        return;
    }

    if (
        normalizarEstado(
            reporte.estado
        ) !== "resuelto"
    ) {

        alert(
            "Solo se pueden eliminar reportes resueltos."
        );

        return;
    }

    const confirmar =
        confirm(
            "⚠️ ELIMINAR REPORTE\n\n" +

            "Este reporte está marcado como RESUELTO.\n\n" +

            "Si lo eliminas, desaparecerá del sistema y " +
            "ya no aparecerá en el mapa público.\n\n" +

            "¿Deseas eliminarlo definitivamente?"
        );

    if (!confirmar) {

        return;
    }

    const boton =
        document.getElementById(
            `eliminar-${idReporte}`
        );

    if (boton) {

        boton.disabled = true;

        boton.textContent =
            "Eliminando...";
    }

    try {

        const {
            error
        } =
            await supabaseClient
                .from("reportes")
                .delete()
                .eq(
                    "id",
                    idReporte
                );

        if (error) {

            console.error(
                "Error eliminando reporte:",
                error
            );

            alert(
                "No se pudo eliminar el reporte.\n\n" +
                error.message
            );

            if (boton) {

                boton.disabled = false;

                boton.textContent =
                    "🗑️ Eliminar reporte";
            }

            return;
        }

        console.log(
            "Reporte eliminado correctamente:",
            idReporte
        );

        await cargarReportes();

    } catch (error) {

        console.error(
            "Error inesperado eliminando:",
            error
        );

        alert(
            "Ocurrió un error al eliminar el reporte."
        );
    }
}

window.eliminarReporte =
    eliminarReporte;


/* =========================================================
   17. FILTROS
   ========================================================= */

buscador.addEventListener(
    "input",
    aplicarFiltros
);

filtroEstado.addEventListener(
    "change",
    aplicarFiltros
);

filtroFinca.addEventListener(
    "change",
    aplicarFiltros
);


/* =========================================================
   18. CERRAR SESIÓN
   ========================================================= */

botonCerrarSesion.addEventListener(
    "click",
    async function() {

        await supabaseClient.auth.signOut();

        seccionPanel.style.display =
            "none";

        seccionLogin.style.display =
            "flex";

        formularioLogin.reset();

        listaReportes.innerHTML =
            "";
    }
);


/* =========================================================
   19. CAMBIO DE SESIÓN
   ========================================================= */

supabaseClient.auth.onAuthStateChange(
    function(event) {

        console.log(
            "Cambio de sesión:",
            event
        );

        if (
            event === "SIGNED_OUT"
        ) {

            seccionPanel.style.display =
                "none";

            seccionLogin.style.display =
                "flex";
        }
    }
);


/* =========================================================
   20. UTILIDADES
   ========================================================= */

function formatearFecha(
    fecha
) {

    if (!fecha) {

        return "No disponible";
    }

    const fechaObj =
        new Date(fecha);

    if (
        Number.isNaN(
            fechaObj.getTime()
        )
    ) {

        return "No disponible";
    }

    return fechaObj.toLocaleString(
        "es-CR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


function mostrarErrorLogin(
    mensaje
) {

    mensajeErrorLogin.textContent =
        mensaje;

    mensajeErrorLogin.style.display =
        "block";
}


function escapeHTML(
    valor
) {

    if (
        valor === null ||
        valor === undefined
    ) {

        return "";
    }

    return String(valor)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}

console.log(
    "Panel de mantenimiento listo."
);