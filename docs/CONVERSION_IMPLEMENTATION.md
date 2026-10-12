# Evolución comercial implementada — 12 de octubre de 2026

La web mantiene el wordmark vigente, la portada deportiva facilitada por el propietario y la dirección visual de cobre, marfil y negro. La captación evoluciona dentro del sitio existente. Se conservan calendario, laboratorio, planes, disciplinas, comunidad, WhatsApp y contacto.

## Problemas y solución

La auditoría completa está en [CONVERSION_AUDIT.md](CONVERSION_AUDIT.md). El arranque identificaba poco el servicio; la ciencia detallada precedía al valor práctico; la comparación repetía prestaciones; faltaban una landing de contratación, perfil estructurado y medición comercial consentida.

El hero ahora declara qué entrenamos, para quién y cómo empezar. Un método breve explica el proceso antes del calendario y los planes. Seguimiento es la propuesta destacada, con Rendimiento como acompañamiento de mayor proximidad y análisis; Individual conserva una propuesta clara de autonomía. Las diferencias reales de comunicación, llamadas y lactato están visibles y se pueden comparar. «Una disciplina» permite elegir un deporte concreto para que la consulta no conserve Triatlón por accidente.

## Estructura de la home

1. Servicio, objetivo, destinatario y valoración inicial.
2. Por qué ICARO: punto de partida, adaptación y acompañamiento.
3. Evaluar → interpretar → planificar → entrenar → medir → ajustar.
4. Calendario ilustrativo, revisión semanal y recorrido de incorporación.
5. Individual, Seguimiento y Rendimiento; base común y comparación.
6. Comunidad y entrenamientos compartidos.
7. Equipo y manera de trabajar.
8. Disciplinas y enfoque de resistencia con fuerza.
9. Laboratorio interactivo e interpretación contextual; detalle científico desplegable.
10. Pruebas opcionales y trabajo de técnica en Barcelona.
11. Colección conceptual y biblioteca de 50 guías.
12. Preguntas frecuentes y valoración inicial.

El calendario precede a los planes para mostrar qué recibe el atleta. La fisiología mantiene profundidad más adelante. El componente de caso real está preparado pero no aparece mientras falten datos y autorización; los ejemplos actuales siguen siendo ilustrativos, sin resultados inventados.

## Landing y solicitudes

`/entrenador-triatlon-online` identifica el servicio desde el titular. Utiliza navegación breve, beneficios, método, experiencia colectiva confirmada, comparación de Seguimiento/Rendimiento, enlace a Individual, preguntas frecuentes y formulario local. Cada CTA transmite plan, disciplina y origen propio; la solicitud conserva los UTM permitidos.

Entrenamiento utiliza dos etapas: preparación y contacto. El perfil permite indicar disciplina, objetivo, fecha aproximada, experiencia, horas, dificultad, seguimiento y presupuesto del atleta. Los campos de perfil adicionales son opcionales y permiten pedir orientación. Comunidad y evaluaciones siguen en una etapa. Volver atrás conserva los campos; el envío bloquea su edición hasta responder, evita duplicados, mantiene los datos ante errores y ofrece la misma solicitud por WhatsApp.

`/api/contact` valida los nuevos valores opcionales sin romper formularios anteriores. Envía el perfil, plan, procedencia y estado «Nueva solicitud, pendiente de valorar» al destinatario fijo mediante Resend. Solo confirma aceptación tras recibir un ID real del proveedor. No se han certificado la recepción en Gmail ni las variables del despliegue público mediante las pruebas locales.

El indicador `potential_fit` requiere solicitud de entrenamiento, objetivo de al menos diez caracteres, disponibilidad concreta desde tres horas y preferencia de Seguimiento/Rendimiento. Es una regla inicial para ordenar la revisión humana, no un rechazo o una contratación. El resto queda pendiente de revisar y también se envía. No hay CRM ni base de datos nuevos: el email contiene la información para gestionar estados reales.

## Medición y campaña

[MEASUREMENT.md](MEASUREMENT.md) contiene configuración, consentimiento, eventos y propuesta de campaña. Sin identificadores válidos, no hay banner ni herramientas de Google. Con ellos, analítica y publicidad requieren elecciones independientes; rechazar conserva toda la funcionalidad. Se puede cambiar la elección desde el pie de página.

Eventos automáticos: `cta_click`, `plan_select`, `form_start`, `form_step`, `form_submit`, `form_success`, `whatsapp_click` y `lead_potential_fit`. El encaje potencial no se presenta como un contacto cualificado por una persona. `lead_qualified` y `customer_confirmed` están reservados a revisión o contratación verificadas y se bloquean en el navegador. No hay eventos de venta por abrir WhatsApp ni importes ficticios de facturación.

Los eventos utilizan un vocabulario cerrado, sin nombre, contacto, objetivo, mensaje ni presupuesto. La atribución almacenada requiere consentimiento; `gclid` exige permiso publicitario. Las consultas conservan sus parámetros limitados de procedencia conforme a la información del formulario. La preparación de una prueba de siete días y máximo 210 € no crea ni activa una campaña; el presupuesto diario medio requiere límites y supervisión en la cuenta de Google.

## Tienda y artículos

[ARTICLES_AND_SHOP.md](ARTICLES_AND_SHOP.md) lista las 50 guías y sus consultas principales.

- `/tienda`: seis diseños con logo ICARO TEAM, talla, cantidad, precios orientativos y carrito persistente validado.
- `/tienda/pago`: simulación con tarjeta ficticia fija; sin datos bancarios reales, pedidos o cobros. Las rutas no se indexan.
- `/articulos`: buscador y cinco temas, con 50 resúmenes en el HTML inicial.
- `/articulos/[slug]`: 50 guías originales completas, con canonical, Open Graph, Article/Breadcrumbs, índice, preguntas y lecturas relacionadas. Los cuerpos no se envían al buscador del cliente.

## Archivos principales

| Área                  | Archivos                                                                                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home y método         | `src/sections/landing.tsx`, `method-overview.tsx/css`, `src/data/atelier.ts`                                                                                         |
| Planes                | `src/components/pricing.tsx`, `pricing-conversion.css`, `src/data/content.ts`                                                                                        |
| Caso real preparado   | `src/data/training-decision.ts`, `src/components/training-decision.tsx/css`                                                                                          |
| Landing               | `src/app/entrenador-triatlon-online/page.tsx`, `triatlon-landing.css`                                                                                                |
| Formulario y API      | `src/components/contact.tsx`, `contact-qualification.css`, `src/data/lead-qualification.ts`, `src/lib/contact-delivery.ts`                                           |
| Navegación y contexto | `src/components/header.tsx`, `footer.tsx`, `enquiry-link.tsx`                                                                                                        |
| Medición y privacidad | `src/lib/commercial-events.ts`, `src/components/commercial-analytics.tsx/css`, `src/app/layout.tsx`, `src/app/privacidad/page.tsx`                                   |
| Tienda y guías        | `src/app/tienda/`, `src/components/shop/`, `src/data/shop.ts`, `src/app/articulos/`, `src/components/articles/`, `src/data/articles/`                                |
| SEO y configuración   | `src/app/sitemap.ts`, `.env.example`                                                                                                                                 |
| Assets                | `public/images/icaro-team-logo.png`, `public/images/shop/collection.jpg`, `public/images/SOURCES.md`                                                                 |
| Verificación          | `tests/landing.spec.ts`, `contact-api.spec.ts`, `ads-landing.spec.ts`, `lead-qualification.spec.ts`, `commercial-events.spec.ts`, `articles.spec.ts`, `shop.spec.ts` |

## Validación

- Compilación de producción y comprobación de tipos correctas. No existe un script de lint en este proyecto; se ha comprobado el formato de los archivos nuevos y `git diff --check`.
- **61 pruebas pasaron** en la suite final: rutas, metadata, sitemap, índice sin JavaScript, búsqueda, navegación, planes, perfil, errores/timeouts, Resend simulado, consentimiento, atribución, carrito y pago ficticio.
- Home y landing revisadas en 320, 390, 768, 1024 y 1440 px: sin desbordamiento de página, enlaces internos inexistentes, errores JavaScript o infracciones Axe detectadas. Las regiones de calendario y comparación permiten desplazamiento horizontal propio en móvil. El CTA principal se ve en la primera pantalla, también a 320 × 667.
- Artículos y tienda tienen revisión responsive y Axe adicional. Capturas locales: `/tmp/icaro-final-ui-review/`, `/tmp/icaro-articles-review/`, `/tmp/icaro-shop-*.png`.
- Una medición móvil local de Lighthouse: rendimiento **91**, accesibilidad **100**, SEO **100**; FCP **1,2 s**, LCP simulado **3,5 s**, CLS **0**, TBT **80 ms**. Es una simulación local, anterior a las últimas correcciones de bloqueo del formulario y clasificación de eventos, que no alteran la composición. El LCP simulado supera 2,5 s y debe medirse en el despliegue con condiciones reales; TBT no certifica INP. No se certifican Core Web Vitals de producción. El primer intento no abrió el depurador de Chrome; la medición válida utilizó modo headless explícito.

## Datos pendientes y despliegue

Faltan identidad legal del responsable, nombre/retrato/formación acreditada del perfil individual, URL real del grupo Social ICARO y datos autorizados de un caso real. Las tarifas antiguas de configuración no se han confirmado como vigentes: los planes permanecen bajo consulta, conforme a la preferencia anterior del propietario. La tienda conceptual necesita productos y condiciones reales antes de habilitar ventas.

Los cambios se preparan en `icaro-web`, la rama de producción autorizada. Con integración Git activa, el push inicia un despliegue de Vercel. En Deployments debe verificarse el commit nuevo y estado Ready. No hace falta cambiar DNS por estas rutas. Añadir los IDs públicos propios de Google indicados en `.env.example` y recompilar para activar medición; la clave Resend sigue privada en el servidor. La medición y el envío real deben comprobarse en el entorno configurado. No se han creado campañas ni realizado gasto publicitario.
