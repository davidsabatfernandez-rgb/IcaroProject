# Medición comercial de ICARO

La medición está **desactivada por defecto**. No se ha creado una cuenta de Google Analytics, una conversión real ni una campaña desde este repositorio. Tampoco se ha autorizado gasto publicitario mediante esta implementación.

## Configuración

Añadir en Vercel, para el entorno que se quiere medir, y volver a compilar:

| Variable pública                    | Formato                                   | Función                                                      |
| ----------------------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`     | `G-XXXXXXXXXX`                            | Propiedad GA4 real de ICARO.                                 |
| `NEXT_PUBLIC_GOOGLE_ADS_ID`         | `AW-123456789`                            | Identificador real de Google Ads.                            |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | Etiqueta de conversión facilitada por Ads | Conversión de solicitud aceptada por el proveedor de correo. |

Estos identificadores son públicos, **no claves ni credenciales**. Las formas de ejemplo no activan servicios reales. Identificadores vacíos o inválidos desactivan su servicio; una etiqueta aislada no activa Ads. Sin ningún identificador válido no se muestra el panel de consentimiento, no se carga un script externo y no se crea `dataLayer`. No hay paquetes adicionales ni Google Tag Manager en paralelo.

Antes de activar GA4, desactivar la medición mejorada automática de formularios, clics y páginas en la propiedad para evitar duplicados y capturas ajenas al esquema previsto. Verificar la configuración de retención, acceso, anonimización aplicable y la información de privacidad del responsable real. La implementación no suple completar esa identidad o configurar la cuenta de Google. No añadir otro tag mediante Vercel, un gestor de etiquetas o un componente adicional.

## Elección del visitante

Se utiliza consentimiento previo: la etiqueta de Google solo se solicita cuando el visitante acepta al menos una categoría configurada. No se mandan pings sin consentimiento. Analítica y medición publicitaria tienen casillas independientes inicialmente desactivadas; «Rechazar opcionales» y «Aceptar opcionales» tienen el mismo tratamiento visual. Rechazar permite usar el formulario, WhatsApp y el resto de la web.

La elección se guarda como preferencia necesaria en `localStorage` (`icaro-measurement-consent-v1`) durante 180 días, incluida la negativa. No es una autorización permanente: una preferencia caducada vuelve a pedir elección. El botón «Preferencias de medición» del pie permite cambiarla. Retirar una categoría activa elimina la cola propia y la atribución que deja de estar permitida, y recarga la página para retirar el JavaScript externo ya ejecutado. El panel avisa de esa recarga; conviene guardar un formulario en curso antes de retirar permisos.

En Google se mantiene desactivada la personalización publicitaria. La categoría publicitaria habilita almacenamiento y medición de publicidad solo tras aceptación; la categoría analítica permite GA4 solo tras su propia aceptación. Si una etiqueta ajena ya está instalada, el módulo se detiene en vez de duplicarla o asumir que tiene permiso. La elección de medición es independiente de aceptar la información de privacidad al enviar una consulta.

## Esquema de eventos

`trackCommercialEvent(name, details)` es el único punto de salida. Admite `source`, `plan`, `interest`, `sport` y `step` mediante vocabularios cerrados; elimina las demás claves y los valores desconocidos. No acepta nombre, correo, teléfono, objetivo, experiencia escrita, presupuesto, mensajes, URL completa ni el contenido de un enlace de WhatsApp.

| Evento               | Momento                                             | Interpretación                                                                        |
| -------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `cta_click`          | Clic en un CTA marcado.                             | Interés informativo; no solicitud.                                                    |
| `plan_select`        | CTA con un plan comercial reconocido.               | Interés en Individual, Seguimiento o Rendimiento.                                     |
| `form_start`         | Primera interacción deliberada con el formulario.   | Inicio del proceso.                                                                   |
| `form_step`          | Avance validado a la siguiente etapa.               | Progreso; solo etapas 1 o 2.                                                          |
| `form_submit`        | Petición de envío válida al backend.                | Intento; no entrega ni venta.                                                         |
| `form_success`       | API confirma aceptación por el proveedor de correo. | Solicitud aceptada; no demuestra lectura ni entrega en Gmail.                         |
| `whatsapp_click`     | Clic en un enlace HTTPS de `wa.me`.                 | Apertura de un canal; no mensaje enviado ni venta.                                    |
| `lead_potential_fit` | Respuesta real del servidor indica `potential_fit`. | Encaje potencial provisional, pendiente de revisión humana.                           |
| `lead_qualified`     | Reservado a una valoración comercial confirmada.    | Bloqueado en el navegador; requiere revisión humana registrada e importación offline. |
| `customer_confirmed` | Reservado a un registro comercial confirmado.       | Bloqueado en el navegador; no existe un CRM autenticado conectado.                    |

`form_success` requiere `providerAccepted: true`, que el formulario debe derivar de la respuesta real de `/api/contact`, nunca de mostrar una pantalla de gracias. `lead_potential_fit` exige `serverQualified: true` y `qualification: "potential_fit"`, también derivados de la API. Esas banderas controlan el envío y **no se transmiten** como propiedades del evento. El evento de encaje potencial no se dispara solo por seleccionar un plan o empezar un formulario.

Los CTA pueden marcarse con `data-track="cta_click"` y los atributos `data-track-source`, `data-track-plan`, `data-track-interest`, `data-track-sport`. Un único listener de captura mide esos CTA y todos los enlaces `wa.me`; no inspecciona `text` del enlace. Los eventos del formulario se emiten explícitamente en sus transiciones y no mediante observación de los valores introducidos.

Los alias comerciales anteriores `Coaching` y `Performance` se normalizan a `seguimiento` y `rendimiento`. Las fuentes admitidas están en `src/lib/commercial-events.ts`; un nuevo CTA con origen propio debe añadir una constante allí, no usar texto libre del usuario como fuente. El plan opcional de un test no se clasifica como selección de un plan de coaching.

## Atribución y límites de privacidad

Los campos `ref`, `utm_source`, `utm_medium` y `utm_campaign` se conservan en `sessionStorage` (`icaro-attribution-v1`) **solo después de consentimiento válido**. Se admiten únicamente identificadores cortos de campaña con letras, números, guion o guion bajo. No usar información personal para nombrar campañas. Otros parámetros se descartan. El identificador `gclid`, acotado y validado, requiere consentimiento publicitario y un identificador Ads configurado; aceptar solo analítica no lo guarda. Al rechazar todo se elimina la atribución almacenada.

`getCommercialAttribution()` entrega únicamente ese subconjunto permitido a las integraciones que lo necesiten. No crea un historial de navegación. El evento de visita utiliza rutas permitidas y una URL canónica sin query, hash ni referrer completo. Los artículos se agrupan como `/articulos` en esta medición básica. El contenido del formulario no entra en `dataLayer`; los datos de la consulta viajan exclusivamente a la integración de contacto y a su proceso comercial descrito en privacidad.

El script de Google puede usar sus mecanismos de almacenamiento y comunicación después de la elección correspondiente. Esta capa limita sus propios comandos, pero configurar las opciones de la propiedad y revisar las peticiones reales antes de lanzar una campaña sigue siendo necesario. No se ha afirmado que una prueba local demuestra funcionamiento de una cuenta Google real.

## Conversiones de publicidad

La conversión web de Ads se dispara únicamente en `form_success`, con permiso publicitario, `AW-…`, etiqueta válida y aceptación confirmada por el proveedor. No asigna un valor de venta, no utiliza `purchase` y no convierte WhatsApp en una contratación. Configurar la acción como solicitud de valoración, con recuento «Una» por interacción publicitaria y sin valor de facturación inventado.

En la primera prueba conviene utilizar la solicitud aceptada como señal observable y revisar manualmente su calidad. Distinguir en el registro operativo **nuevo → contactado → encaje potencial → cualificado revisado → cliente confirmado**, con motivos y fechas reales. Las personas que encajan potencialmente todavía no son clientes. Antes de optimizar hacia contratos, conectar un sistema comercial auténtico o importar conversiones offline verificadas en Ads, únicamente con los permisos y datos que correspondan. No habilitar `customer_confirmed` mediante una bandera pública o un clic en el navegador.

Para evitar doble recuento, no importar a Ads `form_success` de GA4 como otra conversión principal si ya se utiliza la etiqueta directa. Los eventos informativos pueden verse en GA4 sin convertirlos todos en conversiones. No suponer que solicitudes repetidas son clientes distintos: revisar duplicados en el proceso comercial, con acceso limitado a quienes gestionan esas consultas.

## Preparación de la prueba de búsqueda

Propuesta para configurar manualmente en Google Ads; **no se ha lanzado**:

- Destino: `/entrenador-triatlon-online`.
- Presupuesto de trabajo: 30 € al día durante siete días; **límite previsto total 210 €**.
- Prioridad de servicio: Seguimiento y Rendimiento, conservando Individual como opción.
- Intención: contratación de coaching de triatlón online.
- Palabras iniciales de concordancia exacta o de frase: `[entrenador triatlon online]`, `"entrenador triatlon online"`, `"entrenamiento triatlon personalizado"`, `"coach triatlon online"`.
- Negativas iniciales a revisar: `gratis`, `rutinas gratis`, `plan gratis`, `pdf gratis`, `empleo`, `curso entrenador`, `titulación entrenador`. No excluir términos relevantes sin revisar la consulta y su intención.
- Ejemplo de atribución: `utm_source=google&utm_medium=cpc&utm_campaign=triatlon_online_prueba`.

Un presupuesto diario de Google es **medio** y puede distribuirse de forma desigual, por lo que 30 €/día no garantiza por sí solo un techo absoluto de 210 €. Establecer fechas de inicio y fin, alertas, revisión diaria y las opciones de límite total disponibles en la cuenta; pausar antes de superar el máximo autorizado. No afirmar que el código puede controlar el gasto de una cuenta no conectada. Confirmar ubicación, idioma, horarios y términos de búsqueda en la cuenta antes de activar. No hay estimaciones inventadas de volumen, CPC o coste de adquisición.

Revisar por separado visitas consentidas, CTA, formularios iniciados, solicitudes aceptadas, contactos con encaje revisado y contrataciones. Una muestra de siete días y 210 € no garantiza suficientes conversiones para concluir rentabilidad o validar una estrategia automática. Usar el gasto y los contactos reales para decidir el siguiente paso.

## Validación antes de activar

Las pruebas de `tests/commercial-events.spec.ts` verifican configuración, caducidad, rechazo, categorías independientes, atribución, exclusión de PII, un solo script, aceptación del proveedor como requisito y retirada de consentimiento. El cargador de Google está interceptado: no se mandan eventos a cuentas reales durante esas pruebas.

Para una cuenta real, probar en un entorno de revisión con IDs propios, abrir preferencias y comprobar en la pestaña Network que no existen peticiones de Google antes de aceptar o después de recargar tras rechazar. Confirmar en DebugView/Tag Assistant los nombres y valores permitidos; verificar que un error de correo no genera conversión y que el éxito de API genera una solicitud, sin declarar una venta. Quitar cualquier configuración de prueba antes de activar producción. No incluir secretos en variables `NEXT_PUBLIC_*`.
