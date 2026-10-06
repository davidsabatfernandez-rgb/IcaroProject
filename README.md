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
| Precios                  | `site.prices`: `single` para una disciplina, `triathlon` para triatlón              |
| WhatsApp                 | `site.contact.whatsapp`: número real con prefijo internacional, sin `+` ni espacios |
| Instagram                | `site.contact.instagram`: URL completa                                              |
| Email                    | `site.contact.email`                                                                |
| Formulario               | `site.contact.formEndpoint`: endpoint HTTPS propio o de un proveedor                |
| Fotografías              | `site.images`                                                                       |
| Dominio y canonical      | `site.url`: dominio público completo, sin barra final                               |
| Enlaces legales          | `site.legal.notice`, `privacy`, `cookies`                                           |
| Permanencia y plataforma | `site.terms.commitment`, `trainingPlatform`                                         |
| Testimonios reales       | `site.testimonials`; vacío mantiene la sección oculta                               |

El texto de TrainingPeaks, el reloj y las sesiones en los dos centros de Barcelona se edita en **`src/data/product.ts`**. La sincronización depende del dispositivo y de la sesión; la página no realiza integraciones con cuentas ni solicita credenciales. Los nombres de los centros, las disciplinas presenciales concretas y sus condiciones se incorporarán cuando estén confirmados.

Hero, filosofía, pasos, planes, prestaciones y FAQ: **`src/data/content.ts`**. El resto del texto editorial y la composición están reunidos en **`src/sections/landing.tsx`**. No hay datos de atletas, reseñas o resultados inventados.

## Fotografías

La página utiliza fotografías reales de competición y entrenamiento (Quino Al, Marcus Ng y Pixabay), con fuentes documentadas en `public/images/SOURCES.md` y créditos editables en `site.photographyCredits`. Son fotografías editoriales temporales. Sustitúyelas por imágenes reales de la marca con permiso de uso. Guarda las imágenes optimizadas en `public/images/`, por ejemplo `running.webp`, y cambia `site.images.running` a `/images/running.webp`.

Los espacios disponibles son hero, running, cycling, swimming, triathlon y lactate. Una imagen vacía muestra el gráfico editorial correspondiente. La fotografía de natación es pequeña (427×417); para una futura sesión de fotos, sustitúyela por un original más grande manteniendo la ruta editable. La foto de hero usa `preload`; el resto usa lazy loading con `next/image`. Para otros encuadres, ajusta `object-position` en `src/sections/triathlon.css`. El texto alternativo de las disciplinas se edita en `src/data/content.ts`; el del hero, en `src/sections/landing.tsx`. Usa rutas locales; para un proveedor remoto, añade solo su dominio a `images.remotePatterns` en `next.config.ts` y permite su acceso en el entorno.

## Formulario y contacto

Sin datos reales de contacto, el formulario **prepara una consulta local** y permite copiarla; no envía ni almacena información. No aparece un número ficticio ni enlaces sociales vacíos. WhatsApp se muestra automáticamente cuando configuras un número real.

El orden de envío es: endpoint configurado, WhatsApp, email. Un endpoint recibe JSON con `name`, `contact`, `sport`, `goal`, `message`, `plan` y `consent`; debe devolver un estado HTTP 2xx cuando acepte la consulta. Si está en otro dominio, configura CORS. Debe tener validación, protección contra abuso, tratamiento de datos y mensajes de error adecuados antes del lanzamiento. Para WhatsApp/email el usuario completa el envío en su aplicación; la web nunca afirma que el mensaje se ha entregado.

Para activar cualquier envío, configura un enlace real de privacidad. Sin él, el envío queda bloqueado. Configurar un endpoint no implementa su backend. Las credenciales de un proveedor deben permanecer en servidor, nunca en `site.ts`.

## Diseño, animación y accesibilidad

Colores y estilos generales: `src/app/globals.css`. La composición de triatlón se ajusta en `src/sections/triathlon.css`; TrainingPeaks y Barcelona, en `src/sections/product.css`. Acento único `--accent`. Las animaciones se desactivan con `prefers-reduced-motion`. Navegación por teclado, enlace para saltar contenido, etiquetas de campos y acordeones nativos. La curva es una **representación conceptual sin datos reales**; no predice resultados ni sirve para calcular umbrales.

## Comprobar

```bash
npm run typecheck
npm run build
npm run test:e2e
```

Las pruebas cubren navegación, cinco tamaños de pantalla, ausencia de overflow, precios, selección de plan, umbrales, FAQ, validación del formulario y reduced motion. En este entorno usan `/usr/bin/chromium`. En otro sistema usa `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/ruta/al/navegador` o instala Chromium con `npx playwright install chromium` (elimina esa variable para usar el navegador de Playwright).

## Desplegar en Vercel

1. Sube este proyecto a tu repositorio GitHub.
2. Importa el repositorio en Vercel. Si forma parte de otro repositorio, elige esta carpeta como Root Directory.
3. Vercel detecta Next.js: instalación `npm ci`, build `npm run build`. Usa Node.js 24.
4. Configura el dominio definitivo en `site.url`, contactos reales, imágenes y enlaces legales; vuelve a desplegar.
5. Comprueba el envío real con tu proveedor, las políticas y las condiciones de contratación antes de anunciar la web.

La web no se ha desplegado en un dominio público. TrainingPeaks es la plataforma de trabajo confirmada. No se han inventado condiciones de permanencia. Los enlaces legales pendientes se muestran como texto no interactivo. No hay banner de cookies porque no se instala analítica; revisa consentimiento y política si añades herramientas que lo requieran.

## Estructura

- `src/app`: página, estilos, metadatos, favicon e imagen social.
- `src/components`: menú, precios, curva, formulario y elementos visuales.
- `src/sections`: composición editorial.
- `src/data`: contenido editable.
- `src/config`: configuración pública centralizada.
- `public/images`: fotografías deportivas reales y documentación de sus fuentes.
- `tests`: pruebas de navegador.

Las tareas de nube ya se ejecutan en un entorno aislado. Utiliza este checkout; no crees worktrees salvo petición expresa.
