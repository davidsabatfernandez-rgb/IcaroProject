# Rendimiento, comunidad y acompañamiento · actualización de octubre de 2026

## Estructura y diseño

La home abre con «ENTRENA CON CRITERIO. COMPARTE EL CAMINO.» y dos accesos: planes y Socials. El recorrido continúa con individualización, ICARO Social Club, método, calendario semanal, planes, equipo y disciplinas. El laboratorio fisiológico conserva sus controles y datos ilustrativos; la explicación científica extensa permanece en un desplegable. Se conservan las 50 guías, la tienda conceptual y WhatsApp global.

La paleta de interfaz pasa a blanco, negro y grises, con fotografía auténtica ya disponible. El componente Wordmark, su forma, tipografía, textura, proporciones y colores se mantienen. El punto del logo conserva su acento original. Las fotografías editoriales no se presentan como miembros ni eventos del equipo. Los estados de foco, transiciones y preferencias de movimiento reducido se conservan.

`/social` amplía Social Runs y Social Rides, organización, recorridos y agenda. La participación en comunidad se distingue de contratar entrenamiento. No hay fechas o destinos externos inventados: la configuración está preparada y documentada en [SOCIAL.md](SOCIAL.md).

`/planes` utiliza los mismos datos y componentes de comparación que la home. La columna Seguimiento destaca visualmente; la tabla puede desplazarse por teclado en móvil. Las preguntas de horarios y llamadas aparecen junto a los planes.

## Condiciones actualizadas

| Plan        | Consultas                                                                         | Revisión y llamadas                                                                             |
| ----------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Individual  | De 19:00 a 20:00, hora de Barcelona.                                              | Revisión semanal por audios; llamada inicial; sin llamadas de seguimiento.                      |
| Seguimiento | Escritas de 19:00 a 20:00, hora de Barcelona.                                     | Llamada inicial y llamada semanal acordada aparte de la franja de consultas.                    |
| Rendimiento | Comunicación diaria prioritaria según disponibilidad, sin limitarse a esa franja. | Llamada inicial y semanal; análisis en mayor profundidad; prueba de lactato semestral incluida. |

Se conservan planificación individual, disponibilidad del viernes y revisión/programación del fin de semana para los tres. No se promete atención 24 horas, respuesta instantánea ni un tiempo exacto de respuesta. Las prestaciones y FAQ están centralizadas en `src/data/plans.ts` y se aplican a home, `/planes` y landing de coaching. Se corrigen también las referencias comerciales de artículos.

Los importes existentes de configuración y lactato permanecen intactos. Las tarifas se explican bajo consulta, conforme a la instrucción previa de ocultar precios; no se publican cifras heredadas sin confirmar.

## Consultas y medición

Coaching conserva dos pasos con disciplina, objetivo, experiencia, disponibilidad semanal, acompañamiento, nombre y contacto. Se eliminan fecha, dificultad y presupuesto de la interfaz para reducir fricción; la API admite esos campos de clientes anteriores. Se conserva consentimiento y mensaje opcional sin solicitar datos de salud.

Social Runs y Social Rides utilizan intereses distintos, disciplina y objetivo iniciales editables, y un formulario de un paso. Cambiar entre comunidad y coaching limpia la selección de plan; cambiar acompañamiento actualiza el plan. Los controles esperan a que la interfaz esté lista para evitar perder una selección realizada antes de hidratar.

La API clasifica Individual, Seguimiento, Rendimiento, Social Runs, Social Rides, comunidad, pruebas y entrenamiento por definir. La categoría aparece en el asunto del correo y la respuesta de API. Una consulta Social ignora un plan o perfil de coaching heredado. El éxito solo se muestra después de la aceptación real del proveedor; errores y timeout mantienen datos y ofrecen WhatsApp.

`/entrenador-triatlon-online` mantiene foco en contratación de coaching y las condiciones actualizadas. La atribución admite únicamente vocabularios y parámetros acotados; los enlaces de planes conservan UTM válidos hacia el formulario. La conversión principal de Ads exige interés en coaching, consentimiento publicitario, configuración válida y confirmación del proveedor. Socials y pruebas quedan excluidos. Leads cualificados y contratos permanecen reservados a revisión comercial real, sin simulación pública. Configuración y propuesta de campaña de 210 € durante siete días en [MEASUREMENT.md](MEASUREMENT.md); no se ha lanzado publicidad.

## Archivos principales

- Home: `src/sections/landing.tsx`, `src/data/atelier.ts`, `src/sections/method-overview.css`.
- Comunidad: `src/data/social.ts`, `src/sections/social-club.tsx/css`, `src/app/social/`.
- Planes: `src/data/plans.ts`, `src/components/pricing.tsx`, `pricing-conversion.css`, `plan-faq.tsx`, `src/app/planes/`.
- Contacto: `src/data/enquiries.ts`, `lead-qualification.ts`, `src/components/contact.tsx`, `enquiry-link.tsx`, `src/lib/contact-delivery.ts`.
- Medición: `src/lib/commercial-events.ts`, `docs/MEASUREMENT.md`.
- Navegación, paleta y SEO: `src/components/footer.tsx`, `src/data/content.ts`, `src/app/globals.css`, `src/app/sitemap.ts`, `src/app/privacidad/page.tsx`.

## Validación y configuración pendiente

Validación integrada completada: `npm run typecheck` y `npm run build` correctos; `npm run test:e2e` ejecutó **78 pruebas, todas aprobadas**, en 55,5 segundos. Se comprobaron rutas, CTA, planes, consentimiento, backend, errores de envío, tienda, 50 guías, laboratorio y calendario. `git diff --check` y Prettier de los archivos modificados también pasan. Las pruebas de interfaz interceptan el correo y el cargador de Google; no acreditan recepción real en Gmail ni una cuenta publicitaria. No existe script `lint` ni ESLint configurado: `npm run lint` informa de esa ausencia. El formato no se presenta como lint.

Para completar la agenda faltan convocatorias reales y destinos oficiales verificados de Instagram/Strava. La identidad legal del responsable y los datos personales acreditados de un entrenador se configuran únicamente con información real. El propietario ya indicó que añadió RESEND_API_KEY en Vercel Production; el entorno local no dispone de esa clave y no se solicitan secretos por chat. La recepción real debe confirmarse en el despliegue. Los identificadores públicos de medición siguen sin configurar por defecto.

Un push a `icaro-web` entrega el código a la rama utilizada por Vercel; no demuestra por sí solo un despliegue Ready. El entorno carece de acceso autenticado a Vercel, IONOS o Gmail. La revisión local y el estado de publicación se reportan por separado.
