# **Hardcore AI by 30X**

## Desarrolla un producto e2e con AI | Conecta con founders de la red 30X

Hardcore AI es el programa de transformación de 30x para desarrolladores de software, una experiencia de 4 semanas:

* Construye e2e más rápido y con calidad usando coding agents y AI tools  
* Despierta una mentalidad de producto y negocio (como un FDE)  
* Conecta con founders de la red 30X.

Además, encontrarás desarrolladores con quienes compartirás la pasión por ir más allá.

## **Resultados de aprendizaje**

* **Product Mindset:** empoderamiento del problema, enfoque en el producto y orientación a métricas de valor para el negocio, como un FDE.

* **AI‑DLC end‑to‑end:** desde discovery ➜ especificación ➜ diseño (UI/arquitectura) ➜ implementación guiada por tests ➜ implementación ➜ QA semi-autónomo ➜ deploy ➜ observabilidad/feedback.

* **Especificación‑como‑código:** PRD/ADR en Markdown versionado, trazabilidad a código y tests.

* **Agentes y herramientas AI en cada etapa:** captura de requerimientos, UI‑from‑text, arquitectura‑como‑código, agentes de coding, workflows,  testing semi autónomo, copilotos de CI/CD.

* **Seguridad y performance by default:** SAST/DAST/SCA en pipeline, budget de rendimiento, k6 \+ Lighthouse CI, ELK, OTel \+ APM.

## **Requisitos previos**

* Programación en Javascript y/o Python  
* Conocimientos básicos de Git, GitHub, Node/TS o Python, Docker básico, fundamentos de Cloud Computing. Cuenta en GitHub.  
* Laptop con al menos 16GB de RAM
* Suscrpción activa a Claude Pro ($20 USD) o similar

## **Tu producto**

Trae el problema a resolver o la idea, si no tienes puedes elegir una del banco de proyectos que te ofreceremos. El reto para ti será convertir ese problema/idea en un producto a lo largo del mes.  
Durante cada clase recibirás una pieza del rompecabezas, por ejemplo, cómo construir la especificación, cómo diseñar el workflow adecuado, o cómo automatizar las pruebas.  
Cada semana recibirás 6 horas de clase, así que tendrás que invertir 6 horas más para avanzar en tu producto que presentarás en el demo day al final de las 4 semanas.

## **Mapa de herramientas por etapa**

AI hace la diferencia en cada etapa del ciclo de desarrollo con herramientas y prácticas que aceleran. Aquí un espectro base del que se seleccionarán las que más apliquen al proyecto.

* **Descubrimiento/Cliente:** Grabación \+ transcripción (Whisper local o servicio), resúmenes y extracción de requisitos (Notion AI / plantilla prompts).

* **Especificación‑como‑código:** PRD.md \+ User Stories \+ criterios de aceptación; **ADR** con MADR; documentación con Docusaurus/MkDocs/MkDocs‑Material.

* **Diseño UI:** Uizard / v0 (generación de UI desde texto), prototipado rápido y handoff a código.

* **Arquitectura‑como‑código:** DDD, C4 con Mermaid/PlantUML DSL; ADR vinculadas.

* **Implementación \+ agentes:** IDE (VS Code) \+ coding‑agent (Copilot/Cursor/Windsurf) o SWE‑agent/OpenDevin, etc; TDD.

* **Testing E2E:** BDD, Playwright (codegen, UI mode); nocode‑E2E; synthetic monitoring con Checkly.

* **Seguridad:** SAST, SCA, DAST (Sonar, OWASP ZAP), secret‑scan; dependabot/renovate.

* **Performance:** Presupuesto \+ Lighthouse CI; carga con k6; APM/Tracing con OpenTelemetry \+ ELK/Sentry/NewRelic/Datadog.

* **CI/CD:** GitHub Actions (build/test/lint/sec/perf/deploy), ambientes efímeros.

Algunas herramientas o métodos listados aquí pueden cambiar durante la ejecución del programa.

## **Estructura de contenido**

**Día 1: Introducción y demostración**

Bienvenida y presentación del programa, demostración de referencia, presentación del banco de productos para quienes no traigan uno. Presentación del Product Vision Board.

**Tarea 1**: Seleccionar el producto a construir y crear el Product Vision Board.

**Día 2: Descubrimiento y Definición**

Usando AI tools para acelerar el proceso de establecer el alcance del producto, user journey, casos de uso y features, a través de un proceso de descubrimiento. Presentación del PRD \- Product Requirements Document como artefacto que describe el QUE se va a construir.

**Tarea 2**: Crear el PRD en formato markdown.

**Día 3: Diseñando la solución, arquitectura y generando especificaciones**

Cocreando con AI la especificación técnica que será la columna vertebral del producto. Presentación del MADR \- Markdown Architecture Decisions Record y tech specs como artefactos que describen el CÓMO se va a construir el producto, incluyendo tech stack.

**Tarea 3 (larga)**: Crear el MADR, tech specs y plan técnico de implementación 

**Día 4: Iniciando implementación**

Seleccionando el AI-Native IDE y coding agent que usaremos para la implementación. La importancia de los workflows.

**Tarea 4**: Inicializar el coding agent seleccionado con las especificaciones creadas. Puedes probar varios que te recomendaremos. Arranca a implementar.

**Dia 5: Ordenando la implementación**

En la tarea anterior seguramente es difícil llegar a donde necesitas. Vamos a usar prácticas de gestión de conocimiento para aterrizar el dominio del negocio, arquitecturas desacopladas (DDD) y evolutivas y orientación al comportamiento y pruebas (BDD/TDD) para que la implementación se acerque más a lo que esperas.

**Tarea 5**: Especificación técnica evolucionada con DDD, BDD y TDD.

**Día 6: Reiniciando implementación**

Veamos cómo los coding agents actúan cuando les damos mayor estructura, para generar no solamente código funcional, sino además, mantenible y con una arquitectura desacoplada.

**Tarea 6**: Realiza la implementación completa.

**Día 7\. Pruebas Impulsadas por IA**

Estrategias para generar pruebas de integración y funcionales que nos van a ayudar a asegurar la calidad del producto.

**Tarea 7**. Implementar y ejecutar pruebas de integración y funcionales.

**Día 8\. Pruebas de Usuario: Asegurando el comportamiento deseado de la aplicación**

Uso de herramientas para implementación de pruebas End to End de las funcionalidades, buscando asegurar que el usuario final reciba la aplicación que construimos.

**Tarea 8**. Ejecución de pruebas de usuario.

**Día 9: Producción y operación: La infraestructura en nube**

Creación de infraestructura como código para despliegue de la aplicación. Abordaje de simulaciones de nube en ambientes locales y despliegues reales.

**Tarea 9**. Tu producto desplegado en la nube.

**Día 10: Producción y operación: Seguridad**

Uso de herramientas para la validación de cumplimiento de estándares de seguridad, con distintas técnicas para aproximarse al problema. 

**Tarea 10**. Reporte de seguridad de tu producto.

**Día 11: Producción y operación: Observabilidad 360**

Abordar la importancia de poder medir desde lo técnico y desde el negocio cómo está operando la plataforma. Reconoce la importancia de ciclos de mejora basada en datos.

**Tarea 11**. El dashboard de tu producto.

**Día 12: Demo day**

Cada persona presenta su recorrido de principio a fin: el problema/idea que dio origen a su producto, la solución que construyeron con IA y el valor de negocio que entrega. Cargarán un video de 3 minutos el día anterior a la sesión, que será expuesto a pares e invitados de la red de founders de 30X y de Tribu iA. Se elegirán algunos para presentarse en vivo durante la sesión.

Durante las sesiones contarás con espacios para conectar con otros desarrolladores, porque tendrás que presentar cada tarea a un par que recibe instrucciones precisas sobre qué evaluar y cómo darte feedback, luego te tocará a ti.

**Instructores**

Leonardo Gonzalez. Investigador en AI y líder de Tribu iA/Papers. Experiencia de 20 años en Silicon Valley y en compaías Fortune 500.

Danny Bravo. AI Product Innovator y cofundador de Tribu iA.

Carlos Alarcón. Co-founder y CTO de Quix - ex Platzi. Youtuber y GDE

Christian Braatz. Arquitecto de Software con 20 años de experiencia.

**Bonus**

Tendremos a cracks invitados que compartirán su experiencia en espacios adicionales a las sesiones.

Andrés Bilbao. Co-founder de Rappi y de 30X.

Francisco Martínez. Tech manager para ecommerce en Globant/Disney

Jefferson Arcos. Tech Founder. Head of AI en la startup de más rápido crecimiento en US 2021

**Conexión con founders de la red 30X**

Sabemos que quieres dar un salto en tu carrera, quieres construir tu propio futuro. Por eso te vamos a conectar con la red de founders de 30X, en donde encontrarás personas que están creando o creciendo sus compañías.

Queremos conectar a quien sabe QUÉ se necesita construir con quien sabe CÓMO hacerlo, tú\! Esperamos que exploten oportunidades para todos.

Tendremos 2 espacios de conexión, uno permanente haciendo parte de la comunidad de 30X, donde todos se presentan y muestran lo que están construyendo, y otro durante el demo day donde presentarás el producto que construiste a lo largo del programa. Tienes que lucirte.

**Inversión**

$1.000 USD

Puedes pagar de un solo contado o en 2 cuotas: Una de $600 USD lo antes posible para que asegures tu cupo y otra de $400 USD.

No es un curso. Es una experiencia e2e para construir con agentes, desarrollar mentalidad de producto y negocio, y conectarte con founders de 30X.

**Detalles adicionales**

Inicio: Febrero 23 de 2026

Sesiones de 2 horas los Lunes, martes y miércoles, de 7pm a 9pm (Zona horaria de Bogotá). Adicionalmente habrán sesiones extra de bonus con expertos en diferentes horarios que serán grabadas para quienes no logren conectarse en vivo.

Los instructores son personas cuidadosamente seleccionadas con experiencia relevante en cada una de las etapas de SDLC aumentado por AI, con alto expertise en coding agents y AI tools. Son personas que trabajan en esto por pasión.

Tendrás acceso al exclusivo foro de Hardcore AI, para intercambiar experiencias y lecciones aprendidas con desarrolladores y compañías que han realizado el programa.

Finalmente, te invitamos a unirte a Tribu iA, la comunidad de AI builders, donde te recomendamos conectarte a las clases de Vibe Engineering los jueves. Puedes unirte a través de este grupo de WhatsApp https://chat.whatsapp.com/IvBkW5cvCyL7XhHxXynpRl

