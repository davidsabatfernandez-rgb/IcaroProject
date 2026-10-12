# ICARO PROJECT

Preparación individualizada de resistencia. Next.js 16, React 19 y TypeScript, con fuentes locales y fotografías editoriales documentadas. Sin librería de gráficos añadida. La medición consentida permanece desactivada hasta configurar identificadores reales.

## Ejecutar

Requiere Node.js 24 y npm 11; compatible con Node >=20.9.

```bash
npm ci
npm run dev
```

Abre `http://localhost:3000`. Para probar la versión optimizada:

```bash
npm run build
npm run start
```

Si la caché de npm no es escribible: `npm ci --cache /tmp/icaro-npm-cache`.

## Rediseño Endurance Performance Atelier

El propietario autorizó la publicación del rediseño y se integró en la rama de producción `icaro-web`. Los cambios se envían a esa rama para el despliegue de Vercel; un push correcto no confirma por sí solo que Vercel haya finalizado.

La landing integra portada, individualización, Social Club, método, planificación, planes, equipo, disciplinas, laboratorio, evaluaciones, colección, guías, preguntas y contacto. Las rutas `/social` y `/planes` amplían comunidad y condiciones de acompañamiento. La composición se concentra en `src/sections/landing.tsx`. La evolución comercial se documenta en `docs/CONVERSION_AUDIT.md` y las decisiones del rediseño anterior en `docs/ENDURANCE_ATELIER.md`.

| Contenido                                                         | Archivo                                                                          |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Paleta, tipografía y estilos comunes                              | `src/app/globals.css`                                                            |
| Configuración pública, contactos, fotografías, logo y perfil real | `src/config/site.ts`                                                             |
| Portada y evaluaciones                                            | `src/data/atelier.ts`                                                            |
| Filosofía, interpretación, equipo y colectivo                     | `src/data/editorial.ts`, `src/sections/editorial.tsx/css`                        |
| Disciplinas                                                       | `src/data/disciplines.ts`, `src/sections/disciplines.tsx/css`                    |
| Gráfica y evaluaciones sintéticas                                 | `src/data/lactate-lab.ts`, `src/components/lactate-lab.tsx/css`                  |
| Ejemplos de semanas y calendario                                  | `src/data/training-week.ts`, `src/components/training-calendar.tsx/css`          |
| Planes, prestaciones y FAQ                                        | `src/data/plans.ts`, `src/components/pricing.tsx`, `src/components/plan-faq.tsx` |
| Ciclo de entrega y recorrido inicial                              | `src/data/value.ts`, `src/data/journey.ts`                                       |
| Condiciones del test en pista                                     | `src/components/lactate-pricing.tsx`                                             |
| Formulario y contexto de la consulta                              | `src/components/contact.tsx`, `src/components/enquiry-link.tsx`                  |
| Validación y envío real                                           | `src/lib/contact-delivery.ts`, `src/app/api/contact/route.ts`                    |

Los módulos anteriores de `product`, `journey`, `technical-method`, `community` y sus CSS permanecen como código de referencia; la nueva landing no importa esas secciones antiguas. `journeyStages` conserva los pasos reales en un desplegable, y `WeeklySchedule` conserva la entrega semanal.

## Identidad y datos reales

La actualización de rendimiento, Social Club y condiciones comerciales está documentada en [PERFORMANCE_COMMUNITY.md](docs/PERFORMANCE_COMMUNITY.md). La agenda y los enlaces verificados se editan en `src/data/social.ts`, siguiendo [SOCIAL.md](docs/SOCIAL.md).

La evolución comercial, la landing `/entrenador-triatlon-online`, el formulario en dos pasos, la tienda y las 50 guías están documentados en [CONVERSION_IMPLEMENTATION.md](docs/CONVERSION_IMPLEMENTATION.md). Para activar medición consentida y preparar la campaña de 210 €, consulta [MEASUREMENT.md](docs/MEASUREMENT.md). Las rutas nuevas conservan WhatsApp y el contexto de la consulta.

La tienda utiliza una adaptación transparente del logo ICARO TEAM adjuntado por el propietario. La imagen de colección representa diseños conceptuales generados desde esa referencia; no muestra prendas fabricadas. La cabecera conserva el wordmark del rediseño anterior. Para incorporar un archivo original, configura `site.logo.src`, `width`, `height` y `alt`.

El propietario confirmó que el equipo reúne entrenadores con experiencia, finishers de Ironman y triatletas de alto nivel en activo. El texto refleja esa descripción. `site.coach` permite añadir nombre, fotografía autorizada, formación acreditada, experiencia y filosofía de una persona real; no contiene nombres ni titulaciones inventados. La ficha personal se muestra cuando se incorporan nombre y fotografía.

`socialLinks.instagram` y `socialLinks.strava`, en `src/data/social.ts`, están vacíos hasta verificar los destinos oficiales. Sin ellos no se presentan accesos ficticios. ICARO Social Club presenta entrenamientos presenciales semanales cuando estén programados; los ritmos, distancias y condiciones dependen de cada sesión. No se inventan horarios, puntos de encuentro ni cupos.

## Rigor de los ejemplos

El laboratorio utiliza datos **sintéticos** en running, ciclismo y natación, con dos evaluaciones y siete escalones por disciplina. Los botones de puntos, los controles de escalón y la tabla permiten acceder a la información por teclado. Las curvas unen muestras, sin predecir valores intermedios. LT1/LT2 y sus bandas se asignan al ejemplo; no se calculan mediante umbrales universales de 2 o 4 mmol/L. La comparación A/B mantiene intensidades equivalentes y explica por qué una curva aislada no demuestra adaptación. La frecuencia cardiaca no se inventa para natación. La demo de natación no anuncia un servicio de lactato en piscina.

El calendario muestra dos semanas ilustrativas de triatlón: 420 min / 7 h y 260 min / 4 h 20. Ambas incluyen fuerza y descanso. Reducir la disponibilidad cambia prioridades y volumen; no aumenta la intensidad ni genera una prescripción individual. Los minutos de cada estructura suman su duración. «Distribución del tiempo» no se presenta como medición de carga fisiológica.

TrainingPeaks es la plataforma de trabajo confirmada. El enlace usa `site.trainingPeaksUrl`, abre la web oficial en otra pestaña y lo comunica de forma accesible. La sincronización de sesiones depende del reloj, disciplina y formato; esta web no conecta cuentas ni pide claves de TrainingPeaks.

## Planes y evaluaciones

Todos incluyen llamada inicial. El viernes el atleta envía disponibilidad. Entre sábado y domingo recibe programación, revisión de la semana anterior y objetivos de la siguiente.

| Plan        | Seguimiento                                                               | Lactato                                          |
| ----------- | ------------------------------------------------------------------------- | ------------------------------------------------ |
| Individual  | Audios semanales de WhatsApp; dudas de 19–20; sin llamadas de seguimiento | Condiciones para atletas del plan                |
| Seguimiento | Revisión y llamada semanal acordada; consultas escritas de 19–20          | Promoción trimestral bajo consulta               |
| Rendimiento | Llamada semanal; comunicación diaria prioritaria según disponibilidad     | Un test incluido cada 6 meses; opción trimestral |

No se muestran importes. Los valores anteriores en la configuración pública no deben tratarse como secretos. El test en pista se puede consultar por separado, con desplazamiento presupuestado antes de reservar. Las evaluaciones de técnica en dos centros de Barcelona se presentan con condiciones bajo consulta. La durabilidad describe un criterio de análisis de sesiones, sin anunciar otra medición de laboratorio incluida.

## Formulario y WhatsApp

El formulario conserva interés (`coaching`, `social_run`, `social_ride`, `collective`, `tests`), disciplina, plan y origen del CTA. El origen puede incluir la ruta de entrada y parámetros de campaña permitidos, con longitud acotada; no incluye el referrer externo ni cualquier parámetro arbitrario. El contexto viaja en la consulta, sin almacenamiento persistente añadido. Coaching tiene dos pasos y recoge disciplina, objetivo, experiencia, disponibilidad, acompañamiento y contacto; comunidad utiliza un paso. La categoría comercial figura en el asunto del email y las consultas de Socials quedan excluidas de la conversión principal de Ads.

La interfaz envía JSON a `/api/contact`. El servidor valida campos, longitud, consentimiento, interés y honeypot; limita el cuerpo a 8 KB y rechaza peticiones desde otro origen. El destinatario fijo es `contacticaroproject@gmail.com`. Resend se llama exclusivamente en el servidor, con tiempo máximo de 10 segundos. La interfaz deja de esperar a los 15 segundos, mantiene los campos ante errores y ofrece el mismo contenido por WhatsApp. Solo indica éxito tras aceptación correcta del proveedor; esto no confirma recepción en Gmail.

Para activar Resend en Vercel:

1. Cuenta Resend registrada con `contacticaroproject@gmail.com` si se usa el remitente provisional.
2. `RESEND_API_KEY` privada en Settings → Environment Variables, para el entorno que vayas a probar.
3. Redeploy del entorno correspondiente.

`onboarding@resend.dev` solo permite el destinatario de la cuenta Resend. Para un remitente propio, verifica el dominio en Resend y configura `RESEND_FROM_EMAIL`. Copia sus registros exactos y conserva los registros de correo existentes. El propietario indicó que ya guardó `RESEND_API_KEY` en Production; eso no la hace disponible en Preview ni en este checkout. No guardar claves en el código o el chat.

WhatsApp usa `https://wa.me/34619282582`. Abrir la aplicación prepara un mensaje; el atleta confirma el envío allí. La política está en `/privacidad`; falta completar la identidad real del responsable en `site.privacy.responsibleName`.

## Fotografías

Fotos reales de Steven Lelham, Fred Neethling, Marcus Ng y Pixabay. Fuentes, licencias de uso comercial declaradas y alcance de la revisión en `public/images/SOURCES.md`; créditos en `site.photographyCredits`. No se presentan como imágenes de atletas, entrenadores o eventos de ICARO. Las licencias gratuitas conservan copyright; no se afirma CC0.

`next/image` optimiza los recursos locales. El hero tiene preload; el resto carga según necesidad. Natación usa una imagen pequeña en una composición que evita ampliarla como fotografía protagonista. Para una imagen propia, conserva el original autorizado y cambia la ruta y el texto alternativo correspondiente.

## Comprobar

```bash
npm run typecheck
npm run build
npm run test:e2e
```

No hay script `lint` ni configuración de ESLint en este repositorio. La compilación, TypeScript, las pruebas y la comprobación de formato son verificaciones distintas; no se presenta el formato como lint.

Las pruebas verifican cinco tamaños de pantalla, navegación, overflow, selección de disciplinas, laboratorio, adaptación del calendario, condiciones de planes/tests, contexto de consultas, validación, errores, timeout y éxito del formulario. Las respuestas del proveedor se simulan para evitar envíos reales en pruebas. La recepción en Gmail requiere una comprobación con la configuración del entorno desplegado.

En este entorno Playwright usa `/usr/bin/chromium`. En otro sistema instala el navegador con `npx playwright install chromium` o configura `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

## Dominio y publicación

Canonical y sitemap usan `https://www.icaroproject.es`. Esto no modifica DNS. En Vercel deben estar ambos dominios, con `icaroproject.es` redirigiendo a `www.icaroproject.es`. Los registros se toman del panel del proyecto, no de una URL con `https://` o una ruta. Mantener una única estrategia de DNS y no cambiar MX/TXT de correo sin revisar sus servicios.

No hay acceso autenticado a Vercel, IONOS ni Gmail desde este entorno. El dominio público y la recepción real no se certifican con pruebas locales. Para revisiones independientes, configurar un Preview separado antes de promover al dominio principal.

Las tareas de nube utilizan este checkout aislado; no crear worktrees salvo petición expresa.

## Actualización en español

La interfaz, las opciones del formulario y las respuestas de contacto utilizan español. Los planes visibles son Individual, Seguimiento y Rendimiento; conservan las mismas prestaciones y los identificadores internos. La API admite Carrera y Carrera por montaña, además de los valores antiguos para consultas abiertas antes de la actualización.

La portada usa `public/images/triathlon-start.jpg`, a partir de la imagen facilitada por el propietario, con ajuste cromático y optimización JPEG. Su origen se documenta en `public/images/SOURCES.md`. `WhatsAppBubble` se renderiza en el layout para estar disponible en todas las páginas, incluidas privacidad y la página de error 404 en español. Abre WhatsApp directamente y no envía mensajes automáticamente.
