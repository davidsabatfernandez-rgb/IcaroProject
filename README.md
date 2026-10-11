# ICARO PROJECT

Preparación individualizada de resistencia. Next.js 16, React 19 y TypeScript, con fuentes locales y fotografías editoriales documentadas. Sin dependencias de gráficos, analítica ni cookies añadidas.

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

El trabajo está en la rama independiente `redesign/endurance-atelier`. **No se debe fusionar con la rama de producción ni promover un despliegue sin autorización del propietario.** La rama de producción existente es `icaro-web`.

La landing combina doce secciones: portada, filosofía, laboratorio ilustrativo, interpretación, planificación, disciplinas, equipo, colectivo, servicios, evaluaciones, FAQ y contacto. La composición se concentra en `src/sections/landing.tsx`; las decisiones y los pendientes están en `docs/ENDURANCE_ATELIER.md`.

| Contenido                                                         | Archivo                                                                 |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Paleta, tipografía y estilos comunes                              | `src/app/globals.css`                                                   |
| Configuración pública, contactos, fotografías, logo y perfil real | `src/config/site.ts`                                                    |
| Portada y evaluaciones                                            | `src/data/atelier.ts`                                                   |
| Filosofía, interpretación, equipo y colectivo                     | `src/data/editorial.ts`, `src/sections/editorial.tsx/css`               |
| Disciplinas                                                       | `src/data/disciplines.ts`, `src/sections/disciplines.tsx/css`           |
| Gráfica y evaluaciones sintéticas                                 | `src/data/lactate-lab.ts`, `src/components/lactate-lab.tsx/css`         |
| Ejemplos de semanas y calendario                                  | `src/data/training-week.ts`, `src/components/training-calendar.tsx/css` |
| Planes, prestaciones y FAQ                                        | `src/data/content.ts`, `src/components/pricing.tsx`                     |
| Ciclo de entrega y recorrido inicial                              | `src/data/value.ts`, `src/data/journey.ts`                              |
| Condiciones del test en pista                                     | `src/components/lactate-pricing.tsx`                                    |
| Formulario y contexto de la consulta                              | `src/components/contact.tsx`, `src/components/enquiry-link.tsx`         |
| Validación y envío real                                           | `src/lib/contact-delivery.ts`, `src/app/api/contact/route.ts`           |

Los módulos anteriores de `product`, `journey`, `technical-method`, `community` y sus CSS permanecen como código de referencia; la nueva landing no importa esas secciones antiguas. `journeyStages` conserva los pasos reales en un desplegable, y `WeeklySchedule` conserva la entrega semanal.

## Identidad y datos reales

El logo oficial del ave mencionado en el documento no estaba adjunto ni entre los archivos del repositorio. La interfaz conserva temporalmente el wordmark existente. Para incorporar el original sin reconstruirlo, guarda el recurso autorizado en `public/` y configura `site.logo.src`, `width`, `height` y `alt`; `Wordmark` mantiene su relación de aspecto. El favicon actual permanece hasta disponer del isotipo original. No se ha generado otro símbolo.

El propietario confirmó que el equipo reúne entrenadores con experiencia, finishers de Ironman y triatletas de alto nivel en activo. El texto refleja esa descripción. `site.coach` permite añadir nombre, fotografía autorizada, formación acreditada, experiencia y filosofía de una persona real; no contiene nombres ni titulaciones inventados. La ficha personal se muestra cuando se incorporan nombre y fotografía.

`site.community.instagramGroupUrl` está vacío porque falta el enlace real del grupo gratuito Social ICARO. Sin él no se presenta un acceso ficticio. ICARO Collective anuncia los entrenamientos presenciales semanales confirmados por el propietario; los ritmos, distancias y condiciones dependen de cada sesión. No se inventan horarios, puntos de encuentro ni cupos.

## Rigor de los ejemplos

El laboratorio utiliza datos **sintéticos** en running, ciclismo y natación, con dos evaluaciones y siete escalones por disciplina. Los botones de puntos, los controles de escalón y la tabla permiten acceder a la información por teclado. Las curvas unen muestras, sin predecir valores intermedios. LT1/LT2 y sus bandas se asignan al ejemplo; no se calculan mediante umbrales universales de 2 o 4 mmol/L. La comparación A/B mantiene intensidades equivalentes y explica por qué una curva aislada no demuestra adaptación. La frecuencia cardiaca no se inventa para natación. La demo de natación no anuncia un servicio de lactato en piscina.

El calendario muestra dos semanas ilustrativas de triatlón: 420 min / 7 h y 260 min / 4 h 20. Ambas incluyen fuerza y descanso. Reducir la disponibilidad cambia prioridades y volumen; no aumenta la intensidad ni genera una prescripción individual. Los minutos de cada estructura suman su duración. «Distribución del tiempo» no se presenta como medición de carga fisiológica.

TrainingPeaks es la plataforma de trabajo confirmada. El enlace usa `site.trainingPeaksUrl`, abre la web oficial en otra pestaña y lo comunica de forma accesible. La sincronización de sesiones depende del reloj, disciplina y formato; esta web no conecta cuentas ni pide claves de TrainingPeaks.

## Planes y evaluaciones

Todos incluyen llamada inicial. El viernes el atleta envía disponibilidad. Entre sábado y domingo recibe programación, revisión de la semana anterior y objetivos de la siguiente.

| Plan        | Seguimiento                                                          | Lactato                                          |
| ----------- | -------------------------------------------------------------------- | ------------------------------------------------ |
| Individual  | Feedback semanal por audios de WhatsApp; sin llamadas de seguimiento | Condiciones para atletas del plan                |
| Coaching    | Feedback semanal, consultas diarias y llamada mensual                | Promoción trimestral bajo consulta               |
| Performance | Llamada semanal y consultas diarias                                  | Un test incluido cada 6 meses; opción trimestral |

No se muestran importes. Los valores anteriores en la configuración pública no deben tratarse como secretos. El test en pista se puede consultar por separado, con desplazamiento presupuestado antes de reservar. Las evaluaciones de técnica en dos centros de Barcelona se presentan con condiciones bajo consulta. La durabilidad describe un criterio de análisis de sesiones, sin anunciar otra medición de laboratorio incluida.

## Formulario y WhatsApp

El formulario conserva interés (`coaching`, `collective`, `tests`), disciplina, plan y origen del CTA. El origen puede incluir la ruta de entrada y parámetros de campaña permitidos, con longitud acotada; no incluye el referrer externo ni cualquier parámetro arbitrario. El contexto viaja en la consulta, sin almacenamiento persistente añadido.

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

Las pruebas verifican cinco tamaños de pantalla, navegación, overflow, selección de disciplinas, laboratorio, adaptación del calendario, condiciones de planes/tests, contexto de consultas, validación, errores, timeout y éxito del formulario. Las respuestas del proveedor se simulan para evitar envíos reales en pruebas. La recepción en Gmail requiere una comprobación con la configuración del entorno desplegado.

En este entorno Playwright usa `/usr/bin/chromium`. En otro sistema instala el navegador con `npx playwright install chromium` o configura `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

## Dominio y publicación

Canonical y sitemap usan `https://www.icaroproject.es`. Esto no modifica DNS. En Vercel deben estar ambos dominios, con `icaroproject.es` redirigiendo a `www.icaroproject.es`. Los registros se toman del panel del proyecto, no de una URL con `https://` o una ruta. Mantener una única estrategia de DNS y no cambiar MX/TXT de correo sin revisar sus servicios.

No hay acceso autenticado a Vercel, IONOS ni Gmail desde este entorno. El dominio público y la recepción real no se certifican con pruebas locales. Esta rama es de revisión; configurar un Preview separado si se quiere compartir sin publicar en producción.

Las tareas de nube utilizan este checkout aislado; no crear worktrees salvo petición expresa.
