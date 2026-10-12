# ICARO · Endurance Performance Atelier

Documento del rediseño implementado originalmente en `redesign/endurance-atelier`, a partir de `7870e35`. El propietario autorizó su publicación y se integró en `icaro-web`. La evolución comercial posterior se documenta en `CONVERSION_AUDIT.md`, `CONVERSION_IMPLEMENTATION.md` y `MEASUREMENT.md`.

## Auditoría y dirección

El proyecto utiliza Next.js 16, React 19, TypeScript y cuatro fotografías locales documentadas. La composición anterior daba protagonismo a los planes y al calendario, pero repetía bloques y no permitía explorar una evaluación fisiológica. La nueva narrativa conecta el rigor del método, una demostración tangible de las decisiones, el acompañamiento humano y la comunidad.

La web pública no se pudo inspeccionar de forma fiable desde este entorno: el acceso externo estaba restringido. La revisión se realizó sobre el código y sobre la aplicación local optimizada. No se afirma haber certificado DNS, TLS o entrega de correo del dominio público.

## Arquitectura

| Sección                 | Función y composición                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 01 · Portada            | Titular `TRAIN WITH PURPOSE.`, fotografía real, objetivo comercial inmediato y acceso al método.                  |
| 02 · Filosofía          | Secuencia objetivo → limitante → adaptación → estímulo → dosis → respuesta → decisión, con explicaciones breves.  |
| 03 · Método             | Laboratorio interactivo: running, ciclismo, natación, siete escalones, dos evaluaciones y tabla de datos.         |
| 04 · Beyond the numbers | Comparaciones ilustrativas y profundidad opcional: respuesta interna, disponibilidad y fatiga.                    |
| 05 · Inside ICARO       | Calendario ampliable, disponibilidad reducida, criterio por sesión y ciclo semanal real.                          |
| 06 · Disciplinas        | Seis opciones con textos específicos; triatlón protagonista y CTA que conserva la disciplina.                     |
| 07 · Equipo             | Experiencia deportiva confirmada por el propietario y explicación concreta del seguimiento. Ficha real preparada. |
| 08 · Colectivo          | Sesiones presenciales semanales; ritmos y distancias según organización. Social ICARO se distingue del coaching.  |
| 09 · Servicios          | Comparativa Individual, Coaching y Performance, sin importes y con sus condiciones actuales.                      |
| 10 · Evaluaciones       | Tests de campo, lactato, seguimiento longitudinal, durabilidad en contexto y técnica en Barcelona.                |
| 11 · FAQ                | Respuestas desplegables a dudas de contratación y seguimiento.                                                    |
| 12 · Contacto           | Interés, disciplina, objetivo y contexto conservados; email mediante la integración existente y WhatsApp.         |

## Diseño y conversión

Cobre `#563115`, bronce `#8C5A35`, marfil `#F5F2EC`, carbón `#262320` y blanco. La paleta se centraliza en variables CSS; titulares condensados, cuerpo editorial y números tabulares. La tipografía de interfaz se sirve localmente mediante `next/font/local`, con precarga y ajuste de la fuente alternativa. La imagen principal tiene prioridad alta; el resto utiliza `next/image` y carga según necesidad.

El ritmo alterna fotografía, secuencia editorial, herramientas, secciones oscuras y comparativa. Las esquinas rectas y las líneas finas sustituyen la repetición de tarjetas redondeadas. El calendario conserva desplazamiento horizontal dentro de una región identificada; el documento completo debe permanecer dentro del viewport.

La conversión se apoya en claridad, demostración y contacto humano: qué se decide, por qué se revisa cada semana y qué cambia entre planes. No hay estadísticas de resultados, testimonios, urgencia o certificaciones inventados. El CTA de preparación mantiene el mismo texto en la portada y la navegación; los accesos específicos conservan plan, deporte e interés en el formulario.

## Corrección técnica

Los puntos de la curva son muestras sintéticas, las bandas LT1/LT2 son referencias asignadas a la demo y la interpretación se muestra separada. No se derivan umbrales con concentraciones universales; una diferencia A/B no prueba por sí sola una adaptación. La demo de natación no anuncia un test de lactato en piscina. Los puntos tienen controles HTML accesibles, además de selección por escalón y tabla.

El calendario adapta una semana de 420 minutos a otra de 260 minutos, conservando fuerza y descanso sin aumentar la intensidad. La distribución se identifica como tiempo, no como carga fisiológica medida. Cada sesión explica intensidad, propósito y colocación; la semana es ilustrativa, no un generador de planes.

## Continuidad funcional

- Llamada inicial incluida en los tres planes.
- Individual: audios semanales de WhatsApp, sin llamadas de seguimiento.
- Coaching: consultas diarias y llamada mensual.
- Performance: consultas diarias y llamada semanal.
- Disponibilidad el viernes; planificación, revisión y objetivos entre sábado y domingo.
- Performance conserva un test incluido cada seis meses y la opción trimestral; Coaching, la promoción trimestral; Individual, las condiciones del plan.
- Test en pista independiente, con desplazamiento presupuestado antes de reservar.
- TrainingPeaks y sincronización con relojes compatibles, con las limitaciones indicadas.
- Resend permanece en el servidor: destino fijo, consentimiento, validación, honeypot, comprobación de origen y timeout.
- WhatsApp conserva el número `+34 619 28 25 82`; no envía un mensaje sin intervención del atleta.

## Información real pendiente

1. **Logo original del ave.** No estaba adjunto ni en los assets. Se mantiene el wordmark existente como recurso temporal. `site.logo` permite colocar el original sin reconstrucción ni cambio de proporciones. Favicon pendiente del isotipo autorizado.
2. **Personas identificables del equipo.** El propietario confirmó entrenadores con experiencia, finishers de Ironman y triatletas de alto nivel en activo. Faltan nombres, fotografías autorizadas y titulaciones verificables para las fichas individuales de `site.coach`.
3. **Fotografías propias.** Las escenas editoriales actuales no se presentan como atletas, entrenadores o eventos de ICARO; las fuentes y limitaciones están en `public/images/SOURCES.md`.
4. **Enlace real a Social ICARO.** Configurar `site.community.instagramGroupUrl`; no hay botón de acceso ficticio.
5. **Datos de contratación y privacidad.** Completar la identidad real del responsable en `site.privacy.responsibleName` y los datos legales que correspondan. No se ha camuflado una identidad inexistente.
6. **Comprobación de correo y dominio en el entorno publicado.** Las pruebas locales simulan Resend. La aceptación del proveedor y la recepción en Gmail son comprobaciones distintas. `RESEND_API_KEY` indicada por el propietario para Production no se transfiere automáticamente a Preview. No hay acceso autenticado a Vercel, IONOS o Gmail desde este checkout.

El propietario ya autorizó la publicación en la rama de producción. Un Preview independiente puede utilizarse para revisiones futuras; comprobar el estado del despliegue en Vercel sigue siendo distinto de verificar un push.

## Comprobaciones

Build optimizado y TypeScript correctos. Las 27 pruebas cubren API, cinco tamaños de pantalla, teclado, selección de puntos/disciplinas, comparativa A/B, adaptación del calendario, condiciones comerciales, atribución y consentimiento/error/éxito/timeout del formulario. El servicio de correo se simula en estas pruebas; no se afirma recepción real en Gmail.

La auditoría Axe con reglas WCAG 2 A/AA, 2.1 A/AA y 2.2 AA se ejecutó a 320, 390, 768 y 1440 píxeles. Se revisaron capturas y se corrigieron desbordamientos, contraste y coincidencia entre etiqueta visible y nombre accesible. Una auditoría automática no sustituye una revisión completa con usuarios y tecnologías de asistencia.

Lighthouse móvil local, sobre `next build` + `next start`, sin otras pruebas de navegador concurrentes:

| Métrica          | Resultado de laboratorio |
| ---------------- | ------------------------ |
| Rendimiento      | 94/100                   |
| Accesibilidad    | 100/100                  |
| Buenas prácticas | 100/100                  |
| SEO              | 100/100                  |
| LCP              | 3,04 s                   |
| CLS              | 0                        |
| TBT              | 95 ms                    |

Se redujeron las fuentes precargadas, se ajustaron sus alternativas para evitar cambios de layout y se priorizó la imagen principal. **El LCP de esta simulación todavía supera el objetivo de 2,5 s.** Debe medirse de nuevo en el Preview o dominio autorizado con sus condiciones reales de entrega y caché. TBT no es INP: el objetivo INP ≤200 ms requiere datos de interacción reales y no se certifica con esta medición. No se afirma que se hayan alcanzado todos los Core Web Vitals en producción.
