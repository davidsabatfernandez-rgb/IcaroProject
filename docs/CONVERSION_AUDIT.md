# Auditoría de captación — 11 de octubre de 2026

Revisión del repositorio Next.js 16.4 / React 19.3 y del sitio servido localmente con compilación de producción. La tienda conceptual y las 50 guías son parte del encargo activo y se conservan. La revisión no permite certificar el dominio publicado, el panel de Vercel ni la recepción en Gmail: no hay acceso autenticado a esos servicios.

## Evidencia antes de la evolución comercial

- Inicio: titular «Entrena con propósito», CTA de preparación y foto real facilitada por el propietario. Transmite identidad, pero el titular no identifica por sí solo la disciplina o el servicio.
- La fisiología interactiva aparece antes del ejemplo semanal y los planes. Las capacidades técnicas están explicadas correctamente, aunque el visitante necesita recorrer contenido detallado para comparar el acompañamiento.
- Los planes ya diferencian llamadas, consultas, revisión y lactato; Seguimiento está destacado. La sección supera 1.800 px en escritorio y 3.800 px en móvil en la comprobación local del componente, y repite información común en cada tarjeta.
- No existe una landing específica para búsquedas de contratación de entrenador de triatlón online.
- El formulario recoge nombre, contacto, disciplina, objetivo y mensaje. Conserva plan y origen, pero no estructura experiencia, disponibilidad, dificultad, fecha, seguimiento o presupuesto del atleta.
- Resend se llama en el servidor con destinatario fijo, validación, consentimiento, control de origen y timeout. El navegador conserva los campos ante fallos y ofrece WhatsApp. Las pruebas no simulan una entrega exitosa al usuario: se necesita aceptación del proveedor para mostrar éxito.
- No hay sistema de analítica ni consentimiento para herramientas publicitarias configurado. Los UTM permitidos sí viajan en el contexto de la consulta. No existe evidencia de ventas ni un CRM conectado.
- La identidad humana verificada es colectiva: entrenadores con experiencia, personas que han completado Ironman y triatletas en activo. Faltan nombre, retrato, formación acreditada y un caso real autorizado. No deben suplirse con invenciones.

## Prioridades

| Prioridad | Hallazgo comprobado                                                      | Mejora                                                                                | Esfuerzo |
| --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | -------- |
| Alta      | Servicio poco explícito en el primer titular                             | Identificar preparación individual, disciplinas, destinatario y valoración inicial    | Bajo     |
| Alta      | Ciencia detallada antes del valor práctico                               | Método breve y calendario antes de planes; laboratorio más profundo después           | Medio    |
| Alta      | Comparación de planes larga                                              | Beneficio por modalidad, base común y comparación de comunicación                     | Medio    |
| Alta      | Falta landing con intención de contratación                              | Ruta `/entrenador-triatlon-online`, navegación breve y valoración contextual          | Medio    |
| Alta      | Solicitudes sin perfil estructurado                                      | Dos pasos para entrenamiento, formulario sencillo para comunidad/evaluaciones         | Medio    |
| Alta      | Falta medición comercial consentida                                      | Eventos distintos de contacto, encaje orientativo y contratación; activación optativa | Medio    |
| Media     | Pruebas reales y personas sin datos autorizados                          | Componentes preparados y pendientes documentados                                      | Bajo     |
| Media     | Colección conceptual y contenido informativo pueden distraer en anuncios | Conservarlos en home, reducir navegación en la landing publicitaria                   | Bajo     |

## Funcionamiento ya verificado

La primera suite integrada pasó 39 de 40 pruebas. La única discrepancia fue una traducción de «feedback» a «revisión» aplicada después de compilar, entre el contenido fuente y el HTML anterior; requiere reconstruir, no retirar metadatos. El carrito, el pago ficticio, el índice sin JavaScript, las 50 URLs del sitemap, el contexto de contacto, los errores y los timeouts pasaron.

La interfaz de guías fue revisada en 320, 390, 768, 1024 y 1440 px: sin desbordamiento, enlaces internos inexistentes o errores JavaScript, y sin incidencias Axe detectadas en las combinaciones revisadas. La tienda y su checkout pasaron las mismas comprobaciones en 320, 390, 768 y 1440 px. Estas mediciones locales no certifican todas las condiciones de accesibilidad ni los Core Web Vitals del dominio publicado.

## Criterios de implementación

- Preservar el wordmark, la fotografía de portada y la dirección visual vigente; no sustituir el logotipo.
- Mantener todas las prestaciones existentes, la comunidad, la tienda y las 50 guías.
- El calendario visual precede a los planes porque demuestra qué recibe el atleta. El método breve precede al calendario; el laboratorio interactivo mantiene su profundidad más adelante.
- Individual conserva una propuesta válida de autonomía. Seguimiento es la opción destacada; Rendimiento comunica más proximidad y profundidad, sin urgencia ni plazas inventadas.
- Mantener los precios de planes bajo consulta mientras no se confirmen tarifas actuales y autorización para mostrarlas. El presupuesto declarado por el atleta expresa su preferencia, no un precio del servicio.
- Sin casos autorizados, el componente de caso real no se publica. Los ejemplos sintéticos permanecen rotulados como tales.
- Sin identificadores de medición, no cargar herramientas de Google ni mostrar un consentimiento innecesario. Con identificadores, exigir elección válida antes de medir.
- Aceptación de una consulta, encaje potencial y cliente confirmado son estados distintos. Un clic en WhatsApp no es una venta.
