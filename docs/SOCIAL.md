# ICARO Social Club

La home presenta Social Runs y Social Rides antes de los planes. Cada bloque lleva a su apartado de `/social`. La página reúne organización, agenda y consultas de comunidad; consultar las quedadas no requiere contratar entrenamiento.

## Estado de la agenda

`src/data/social.ts` contiene `socialEvents: SocialEvent[] = []`. No se publican fechas, lugares, rutas ni inscripciones ficticias. La agenda muestra un estado útil con consultas separadas para Social Runs y Social Rides. Enviar el formulario no confirma una plaza.

Los horarios se muestran en `Europe/Madrid`, incluidas las diferencias entre horario de invierno y de verano. La página comprueba la hora en cada petición mediante `connection()` de Next.js, para retirar encuentros que ya hayan comenzado sin esperar otro despliegue.

## Publicar un encuentro confirmado

Añadir un objeto a `socialEvents` con estos campos, completados con información real:

| Campo                   | Contenido                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `id`                    | Identificador único en minúsculas y guiones.                                                                        |
| `type`                  | `run` o `ride`.                                                                                                     |
| `title`                 | Nombre real de la convocatoria.                                                                                     |
| `status`                | `draft` mientras se prepara; `published` para publicar; `cancelled` para retirar.                                   |
| `confirmed`             | `true` únicamente cuando la organización confirme todos los detalles.                                               |
| `startsAt`              | Fecha ISO con segundos `00` y offset explícito `+01:00` o `+02:00`, correspondiente a Madrid.                       |
| `timeZone`              | `Europe/Madrid`.                                                                                                    |
| `meetingPoint`          | Lugar de encuentro preciso y confirmado.                                                                            |
| `route`                 | Descripción y `distancesKm` con distancias positivas.                                                               |
| `groups`                | Nombres y descripción de los grupos, ritmos o requisitos de experiencia.                                            |
| `requirements`          | Lista del material o condiciones requeridos para participar.                                                        |
| `conditions`            | Condiciones de participación, incluida tarifa si existe, inscripción o límites aplicables. No presuponer gratuidad. |
| `safetyRecommendations` | Indicaciones de seguridad específicas del encuentro.                                                                |
| `registration`          | Opcional: `{ url, host, verified }` con una URL HTTPS real y comprobada.                                            |

Solo se muestran eventos completos, publicados, confirmados y futuros. Se descartan duplicados por `id`. La fecha y su offset se comprueban contra la zona de Madrid: una hora inexistente por cambio horario, una fecha inválida o un offset incorrecto no se publica. Los eventos sin enlace de inscripción verificado permiten consultar la salida; nunca simulan una inscripción.

El estado `verified: true` representa una comprobación editorial. El código valida el protocolo y el hostname, pero no puede certificar la propiedad, contenido ni vigencia de una página externa. Abrir y verificar la URL antes de marcarla como comprobada.

## Instagram y Strava

`socialLinks.instagram` y `socialLinks.strava` empiezan vacíos y con `verified: false`. Solo aparecen si se configura y verifica la URL HTTPS oficial, sin credenciales ni puertos, y su hostname coincide con el indicado en `host`. Instagram se limita a `instagram.com` o `www.instagram.com`; Strava a `strava.com` o `www.strava.com`.

Se conserva la información confirmada de que el grupo Social ICARO de Instagram es gratuito. Esto no implica que las actividades presenciales lo sean. No se muestra un enlace externo provisional o inventado.

## Consultas y atribución

Los CTA de carrera y ciclismo emiten `social_run` / `social_ride`, con disciplina `Carrera` / `Ciclismo`, y fuentes `social-runs` / `social-rides`. La agenda utiliza `social-agenda-runs` / `social-agenda-rides`; una convocatoria utiliza `social-event-{id}`. El formulario empieza en `collective`, sin plan ni campos de cualificación de coaching.

Los campos de contacto y el consentimiento usan el formulario real existente y su endpoint `/api/contact`. El éxito solo se muestra después de una respuesta positiva del servidor. La consulta de comunidad y la contratación de coaching tienen accesos diferenciados.

## Fotografías y logotipo

Se reutilizan `site.images.running` y `site.images.cycling`, con imágenes optimizadas mediante `next/image` y pies que las identifican como fotografía editorial. No representan quedadas ni miembros de ICARO. No se añade fotografía generada ni se modifica el logotipo o el componente `Wordmark`.

## Verificación preparada

`tests/social.spec.ts` verifica filtros y zona horaria de la agenda con datos de prueba aislados, validación de destinos externos, posición de comunidad antes de planes, estado de agenda vacía, intereses separados al enviar y diseños de 320, 390, 768 y 1440 píxeles. Estas pruebas interceptan el endpoint al comprobar la interfaz: no acreditan recepción real en Gmail.

Para activar agenda y redes faltan: convocatorias reales confirmadas, grupos y condiciones de cada encuentro, destino oficial de Instagram y, si se utiliza, club de Strava verificado. No se necesita una API o servicio externo nuevo para editar la agenda desde el repositorio.
