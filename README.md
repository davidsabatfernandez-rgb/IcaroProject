# ICARO PROJECT

Web de entrenamiento individualizado. Next.js 16, React 19 y TypeScript. Diseño editorial, mobile first; fuentes locales, sin analítica ni cookies añadidas.

## Instalar y ejecutar

Requiere Node.js 24 y npm 11 (también compatible con Node >=20.9).

```bash
npm ci
npm run dev
```

Abre el puerto 3000 en tu entorno de desarrollo. Para producción:

```bash
npm run build
npm run start
```

Si la caché habitual de npm no es escribible, usa `npm ci --cache /tmp/icaro-npm-cache`.

## Lo que puedes editar

La configuración pública está en **`src/config/site.ts`**. No pongas credenciales en este archivo.

| Qué cambiar              | Dónde                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------- |
| Nombre de marca          | `site.brandName`; reemplaza favicon/imagen social si cambias la identidad           |
| Planes y consultas       | `src/data/content.ts` y `src/components/pricing.tsx`; no muestran importes          |
| Tests de lactato         | `src/components/lactate-pricing.tsx`; condiciones y consulta sin importes           |
| WhatsApp                 | `site.contact.whatsapp`: número real con prefijo internacional, sin `+` ni espacios |
| Instagram                | `site.contact.instagram`: URL completa                                              |
| Email                    | `site.contact.email`                                                                |
| Formulario               | `site.contact.formEndpoint`: endpoint HTTPS propio o de un proveedor                |
| Fotografías              | `site.images`                                                                       |
| Dominio y canonical      | `site.url`: dominio público completo, sin barra final                               |
| Enlaces legales          | `site.legal.notice`, `privacy`, `cookies`                                           |
| Permanencia y plataforma | `site.terms.commitment`, `trainingPlatform`                                         |
| Enlace a TrainingPeaks   | `site.trainingPeaksUrl`: web oficial de la plataforma                               |

El texto de TrainingPeaks, el reloj y las sesiones en los dos centros de Barcelona se edita en **`src/data/product.ts`**. La sincronización depende del dispositivo y de la sesión; la página no realiza integraciones con cuentas ni solicita credenciales. Los nombres de los centros, las disciplinas presenciales concretas y sus condiciones se incorporarán cuando estén confirmados.

El enlace público a TrainingPeaks usa **`site.trainingPeaksUrl`**, inicialmente `https://www.trainingpeaks.com/`. Abre la web oficial en una pestaña nueva y lo indica en su nombre accesible y junto al calendario. La marca se escribe como texto, sin presentar una certificación, patrocinio o integración de la web de ICARO con la plataforma.

Hero, filosofía, planes, prestaciones y FAQ: **`src/data/content.ts`**. Necesidades del atleta, cercanía y calendario de entrega: **`src/data/value.ts`**. El resto del texto editorial y la composición están reunidos en **`src/sections/landing.tsx`**. No hay datos de atletas, reseñas o resultados inventados.

La web presenta los tres seguimientos sin precios y dirige cada consulta al formulario con el plan elegido. Los importes anteriores siguen en `site.prices` y `site.lactate` como referencia del proyecto, pero los componentes públicos no los leen ni los muestran. Este archivo es configuración pública; esos importes no deben tratarse como información secreta. Para publicar condiciones económicas de nuevo, revisa primero que estén confirmadas.

El recorrido desde el primer contacto hasta el objetivo se edita en **`src/data/journey.ts`**: `journeyCopy` contiene la introducción y la explicación del ciclo, y `journeyStages`, las ocho etapas. Las etapas 01–04 establecen el punto de partida; 05–07 repiten prescripción, revisión y ajuste; 08 conecta el proceso con el objetivo. Conserva las fases `INICIO`, `CICLO SEMANAL` y `OBJETIVO`, que identifican cada grupo visual en **`src/sections/journey.tsx`**.

La semana del calendario interactivo está en **`src/data/training-week.ts`**. Puedes editar días, disciplinas, títulos, duración, objetivo y bloques de cada sesión; conserva identificadores únicos y comprueba que los minutos de los bloques suman la duración indicada. El calendario tiene un diseño original y datos ilustrativos: enseña cómo leer una sesión y no representa la prescripción de un atleta. Su componente está en **`src/components/training-calendar.tsx`**.

La explicación técnica del método se compone en **`src/sections/technical-method.tsx`** y se edita en **`src/data/technical-method.ts`**; sus estilos están en **`src/sections/technical-method.css`**. Esta sección sustituye la presentación anterior de necesidades en `#metodo`. El panel de **`src/components/technical-decisions.tsx`** permite explorar intensidad, carga y recuperación, y progresión; cada tema conecta información, decisión del entrenador y utilidad para el atleta. La explicación técnica adicional se despliega a petición y se cierra al cambiar de tema. Las cuatro fortalezas del bloque «Por qué entrenar con ICARO» se editan en `technicalStrengths`. La credibilidad se apoya en el proceso real de ICARO, sin comparaciones no documentadas con otros entrenadores, acreditaciones inventadas ni garantías de resultados.

## Seguimiento y tests

Los tres planes incluyen una llamada inicial para conocerse y acordar objetivos concretos. En todos, el atleta envía su disponibilidad el viernes. Entre sábado y domingo recibe la programación en TrainingPeaks, la explicación de cómo fue la semana anterior y los objetivos de la siguiente.

| Plan        | Seguimiento después de la llamada inicial                            | Test de lactato                                  |
| ----------- | -------------------------------------------------------------------- | ------------------------------------------------ |
| Individual  | Feedback semanal por audios de WhatsApp, sin llamadas de seguimiento | Condiciones para atletas del plan                |
| Coaching    | Feedback semanal, consultas diarias y llamada mensual                | Promoción trimestral, condiciones bajo consulta  |
| Performance | Revisión en llamada semanal y consultas diarias                      | Un test incluido cada 6 meses; opción trimestral |

El test de lactato en pista se puede consultar sin contratar un plan. Sus condiciones se explican por contacto y el desplazamiento se presupuesta antes de reservar. No se inventa una tarifa por kilómetro ni se promete atención inmediata o 24 horas. La consulta del test prepara el interés en el formulario; no representa una reserva o un pago.

## Fotografías

La página utiliza fotografías reales de deporte (Steven Lelham, Fred Neethling, Marcus Ng y Pixabay), con fuentes documentadas en `public/images/SOURCES.md` y créditos editables en `site.photographyCredits`. Las fuentes declaran licencias gratuitas de uso comercial Unsplash/Pexels; las imágenes conservan copyright y no se presentan como CC0 ni como atletas de ICARO. Las fotos de carrera se sustituyeron por una vista cenital y una silueta para evitar primeros planos y clubes ajenos. El alcance de la comprobación, las restricciones de acceso directo y la ausencia de cesiones de modelo/marca en los mirrors quedan documentados. Para fotografías propias, guarda originales autorizados en `public/images/`, por ejemplo `running.webp`, y cambia `site.images.running` a `/images/running.webp`.

Los espacios fotográficos activos son hero, running, cycling y swimming. Una imagen vacía en hero muestra el gráfico editorial; en una disciplina mantiene la tarjeta con su texto. La fotografía de natación es pequeña (427×417); para una futura sesión de fotos, sustitúyela por un original más grande manteniendo la ruta editable. La foto de hero usa `preload` y una resolución mayor en móvil para conservar la nitidez del recorte vertical; el resto usa lazy loading con `next/image`. Para otros encuadres, ajusta `object-position` en `src/app/globals.css`. El texto alternativo de las disciplinas se edita en `src/data/content.ts`; el del hero, en `src/sections/landing.tsx`. Usa rutas locales; para un proveedor remoto, añade solo su dominio a `images.remotePatterns` en `next.config.ts` y permite su acceso en el entorno.

## Formulario y contacto

Sin datos reales de contacto, el formulario **prepara una consulta local** y permite copiarla; no envía ni almacena información. No aparece un número ficticio ni enlaces sociales vacíos. WhatsApp se muestra automáticamente cuando configuras un número real.

El orden de envío es: endpoint configurado, WhatsApp, email. Un endpoint recibe JSON con `name`, `contact`, `sport`, `goal`, `message`, `plan` y `consent`; debe devolver un estado HTTP 2xx cuando acepte la consulta. Si está en otro dominio, configura CORS. Debe tener validación, protección contra abuso, tratamiento de datos y mensajes de error adecuados antes del lanzamiento. Para WhatsApp/email el usuario completa el envío en su aplicación; la web nunca afirma que el mensaje se ha entregado.

Para activar cualquier envío, configura un enlace real de privacidad. Sin él, el envío queda bloqueado. Configurar un endpoint no implementa su backend. Las credenciales de un proveedor deben permanecer en servidor, nunca en `site.ts`.

## Diseño, animación y accesibilidad

Colores y estilos generales: `src/app/globals.css`. Portada fotográfica amplia, navegación clara, titulares DM Sans y bloques separados por espacio; azul marino, blanco y acento lima. El recorrido se ajusta en `src/sections/journey.css`; el calendario interactivo, en `src/components/training-calendar.css`; Barcelona, en `src/sections/product.css`. Los antiguos estilos de `triathlon.css` y `coaching.css` no se importan en esta composición. Las animaciones se desactivan con `prefers-reduced-motion`. Navegación por teclado, enlace para saltar contenido, etiquetas de campos y acordeones nativos. El calendario muestra una **semana ilustrativa sin datos reales de atletas**; no predice resultados ni sustituye una prescripción individual. La página no presenta testimonios, biografía, acreditaciones o resultados no documentados.

La referencia solicitada fue `https://oriolgili.com/`, pero este entorno devolvió 403 al acceder a su página y recursos públicos. Esta edición aplica una dirección fotográfica y sencilla propia de ICARO; no afirma reproducir colores o estructura de una referencia que no se pudo inspeccionar, ni utiliza sus contenidos o imágenes.

El mensaje presenta necesidades concretas (tiempo, rumbo y dudas), seguidas de la respuesta real del servicio. La eficiencia se explica mediante sesiones con propósito y revisión de la respuesta, sin garantizar una adaptación o un rendimiento del 100 %. La cercanía se expresa como atención y seguimiento, sin inventar una comunidad, testimonios ni escasez. La guía de [GSA sobre escribir para el lector](https://github.com/GSA/plainlanguage.gov/blob/main/_pages/guidelines/audience/index.md) y la de [NHS sobre voz y tono](https://github.com/nhsuk/nhsuk-service-manual/blob/main/app/views/content/voice-and-tone.njk) orientan la claridad y el tono; no son pruebas de conversión en triatlón.

## Comprobar

```bash
npm run typecheck
npm run build
npm run test:e2e
```

Las pruebas cubren navegación, cinco tamaños de pantalla, ausencia de overflow y de precios visibles, consulta de los tres planes, FAQ, validación del formulario, reduced motion, calendario semanal, canales de seguimiento, condiciones de lactato y consulta del test en pista. También verifican la selección con teclado del criterio técnico y el reinicio de su detalle al cambiar de tema. En este entorno usan `/usr/bin/chromium`. En otro sistema usa `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/ruta/al/navegador` o instala Chromium con `npx playwright install chromium` (elimina esa variable para usar el navegador de Playwright).

## Desplegar en Vercel

1. Sube este proyecto a tu repositorio GitHub.
2. Importa el repositorio en Vercel. Si forma parte de otro repositorio, elige esta carpeta como Root Directory.
3. Vercel detecta Next.js: instalación `npm ci`, build `npm run build`. Usa Node.js 24.
4. Configura el dominio definitivo en `site.url`, contactos reales, imágenes y enlaces legales; vuelve a desplegar.
5. Comprueba el envío real con tu proveedor, las políticas y las condiciones de contratación antes de anunciar la web.

La web no se ha desplegado en un dominio público. TrainingPeaks es la plataforma de trabajo confirmada. No se han inventado condiciones de permanencia. Los enlaces legales sin URL real quedan ocultos. No hay banner de cookies porque no se instala analítica; revisa consentimiento y política si añades herramientas que lo requieran.

## Estructura

- `src/app`: página, estilos, metadatos, favicon e imagen social.
- `src/components`: menú, planes, calendario, formulario y elementos visuales.
- `src/sections`: composición editorial.
- `src/data`: contenido editable.
- `src/config`: configuración pública centralizada.
- `public/images`: fotografías deportivas reales y documentación de sus fuentes.
- `tests`: pruebas de navegador.

Las tareas de nube ya se ejecutan en un entorno aislado. Utiliza este checkout; no crees worktrees salvo petición expresa.

### Comunidad Social ICARO

La landing distingue la comunidad gratuita de los planes de entrenamiento y de las sesiones presenciales. Configura el enlace directo real del grupo de Instagram en `site.community.instagramGroupUrl` (`src/config/site.ts`). Sin ese enlace, se informa de su próxima disponibilidad y no se muestra un botón de acceso ficticio. `site.contact.instagram` sigue reservado al perfil de contacto.
