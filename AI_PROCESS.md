**PROMPTS ENVIADOS**

Genera las entidades de TypeORM en NestJS para un sistema de gestión de proyectos y actividades.
1. La entidad 'Project' debe tener id (uuid), nombre y descripción.
2. La entidad 'Activity' debe pertenecer a un proyecto y tener los siguientes campos obligatorios: nombre , bac (Budget at Completion) , plannedProgressPercent (porcentaje de avance planificado) , actualProgressPercent (porcentaje de avance real) y actualCost (AC).
3. Usa decoradores de @nestjs/swagger (@ApiProperty) para documentar cada campo según el estándar OpenAPI.
4. Asegúrate de que los nombres de las variables sean descriptivos y no uses 'números mágicos'. -> Github Copilot

-----

Pero normalmente las entidades van en una carpeta con el nombre de la entidad ejemplo "Actividades" y adentro va el DTO, controller, controller.spec, entity, module, service.spec -> Github Copilot

-----

No, dame el codigo con el cual puede generar nestjs automaticamente el objeto -> Github Copilot

-----

Perfecto, Ahora realiza el esquema de las entidades, Implementa la estructura en las entidades de proyectos y actividades -> Github Copilot

-----

Typescript no reconoce las variables "Property 'id' has no initializer and is not definitely assigned in the constructor.ts(2564)" -> Github Copilot

-----

ya tengo listas las entidades para el tema de Valor Ganado (EVM).. Ahora necesito crear los DTOs de 'Actividades'. te dire que mas necesito:
1. Necesito el DTO de creación con los campos básicos: nombre, BAC, y los porcentajes de avance (planificado y real), además del AC (costo real)..
2. También necesito el DTO de respuesta que ya traiga todos los cálculos de EVM (PV, EV, CPI, SPI, EAC, etc.) porque el dashboard de Angular necesita mostrar todo.
3. métele los decoradores de @nestjs/swagger con descripciones y ejemplos reales, así el OpenAPI queda bien documentado.
4. usa validaciones con class-validator para que no me dejen meter números negativos o cosas raras.
Hazlo con código limpio, bien organizado y que se entienda fácil.

-----

Listo, y ahora genera otra rama desde develop con el nombre de el cambio y subelo para realizar el pull request.

-----

Necesito idealizar la logica de negocio del EVM osea calcular el Valor Ganado de los proyectos

-----

explica mucho más a profundo que es cada cosa

-----

Listo ya entendí la logica de negocio ahora ayudame a desarrollar un prompt para que el agente de github copilot me ayude a desarrollarlo

-----

Actúa como un Ingeniero de Software Senior experto en Clean Code y metodologías PMI. Necesito implementar la lógica de negocio para un sistema de gestión de proyectos basado en Earned Value Management (EVM).
Contexto del dominio:
Tengo una entidad Activity con los siguientes campos de entrada:
BAC (Budget at Completion) - % Planned Progress - % Actual Progress - AC (Actual Cost) 
Tarea:
1. Crea un servicio dedicado (EvmService) que calcule los siguientes indicadores:
PV (Planned Value), EV (Earned Value), CV (Cost Variance), SV (Schedule Variance).
CPI (Cost Performance Index), SPI (Schedule Performance Index), EAC (Estimate at Completion), VAC (Variance at Completion).
2. Incluye lógica para interpretar el CPI y SPI (ej: indicar si el proyecto está 'Bajo presupuesto', 'Sobre presupuesto', 'Adelantado' o 'Atrasado').
3. Importante: Maneja casos borde como cuando AC es cero para evitar errores de división.
Restricciones de Código:
Usa nombres de variables descriptivos y en inglés.
No uses 'números mágicos'; define constantes si es necesario.
Asegúrate de que la lógica de negocio esté totalmente separada del controlador.
La función debe ser pura y fácil de testear.
Por ahora, genera solo la clase de servicio y los métodos de cálculo."

-----

Realiza las pruebas unitarias de el envm

-----

Ahora realiza las de actividades y proyectos

-----

listo ahora haz una rama desde develop con el nombre del cambio y subelo.

-----

Ahora inyecta el EvmService en el servicio de actividades,Crea ahora los test unitarios 

-----

Deberia de conectarse proyectos con EvmService?, Dame el prompt para incluirlo

-----
Ya tengo un EvmService que calcula métricas individuales y un ActivityService que gestiona actividades. Ahora necesito implementar la lógica en ProjectService para calcular los indicadores consolidados del proyecto.
Requerimientos Técnicos:
Crea un método getProjectSummary(projectId) que recupere todas las actividades asociadas a un proyecto.
Lógica de Consolidación: El sistema NO debe promediar los índices (CPI/SPI) de las actividades. Debe sumar los valores absolutos de todas las actividades del proyecto:
Total BAC = Σ BAC
Total PV = Σ PV
Total EV = Σ EV
Total AC = Σ AC
Una vez obtenidos los totales, debe usar el EvmService para calcular el CPI, SPI, EAC y VAC global del proyecto usando esos totales.
El resultado debe ser un DTO llamado ProjectDashboardDTO que contenga:
Los totales sumados.
Los indicadores calculados.
- La interpretación de texto (ej. 'Project is on track' o 'Over budget').
Restricciones:
Mantén la lógica de cálculo dentro del EvmService (reutilización de código).
Asegúrate de que si el proyecto no tiene actividades, el sistema devuelva valores en cero de forma segura sin romperse.
Usa nombres descriptivos en inglés.

-----

Realiza pruebas unitarias de la conexión de proyectos.

----- 

Necesito generar un prompt para realizar los controladores -> Gemini

-----

Necesito crear los controladores REST para Project y Activity siguiendo los estándares de Clean Code y OpenAPI.
Requerimientos:
Crea un ProjectController y un ActivityController.
Los controladores deben usar inyección de dependencias para comunicarse con sus respectivos servicios (ProjectService y ActivityService).
Endpoints de Proyecto: >    - GET /api/projects: Listar todos los proyectos con su resumen de indicadores.
GET /api/projects/{id}: Obtener el detalle de un proyecto específico, incluyendo su ProjectDashboardDTO (indicadores consolidados).
Endpoints de Actividad:
GET /api/projects/{id}/activities: Listar las actividades de un proyecto con sus métricas EVM individuales.
POST /api/activities: Crear una nueva actividad.
PUT /api/activities/{id}: Editar una actividad existente.
Documentación (Swagger): >    - Usa anotaciones para documentar cada endpoint (descripción, códigos de respuesta 200, 404, 400).
El API debe estar mapeado para ser accesible bajo el prefijo /api.
Restricción Crítica: > - No incluyas ninguna fórmula matemática ni lógica de validación compleja aquí. El controlador solo debe recibir la petición, llamar al servicio y retornar el DTO.

-----

Genera un test de integración para el endpoint GET de proyectos usando MockMvc o RestAssured

-----

Haz un checklist de calidad final antes de declarar el backend como terminado y dime si hace falta algo mas 

-----

Realiza la integracion de PostfreSQL con TypeORM en la base de datos.

-----

Coloca mensajes de error y validaciones avanzadas correctas.

-----

Como comienzo el front ya tengo terminado todo el back y ya hice las intalaciones de angular 21 pero que estructura de comienzo me recomiendas.

-----

Dame un prompt para que la IA defina el modelo de datos y para que realice el servicio completo

-----

Necesito programar el modelo de datos y el servicio completo para un módulo de actividades que se conecta a un backend en NestJS.

Requisitos técnicos:

Modelo: Crea una interfaz Actividad basada en estas propiedades: nombre (string), bac (number), plannedProgressPercent (number), actualProgressPercent (number), actualCost (number) y proyectoId (uuid/string).

Servicio:

Usa la nueva sintaxis de Angular 21 con la función inject(HttpClient).

Utiliza Signals (signal) para manejar el estado de la lista de actividades.

Implementa los métodos: getAll() (GET), getById(id) (GET), create(dto) (POST), update(id, dto) (PATCH) y delete(id) (DELETE).

La URL base debe ser tomada de una variable de entorno o ser http://localhost:3000/actividades.

Usa firstValueFrom de RxJS para manejar las peticiones como Promesas (async/await) para un código más limpio.

Entrégame el código para actividad.interface.ts y actividad.service.ts siguiendo las mejores prácticas de standalone components."

-----

Realiza un cheklist completo de lo que falta en el front, y implementalo.

-----

Los botones no funcionan utiliza la funcion para que tu entres en el enlace http://localhost:4200/dashboard y revisa que cada una de las funciones que deberian estar esten efectivamente, si no funcionan entonces arreglalo de inmediato haciendo que todo funcione correctamente.

-----

Valida cada uno de los requerimientos y revisa que se cumpla cada uno de ellos si no se cumplen solucionalo inmediatamente.

-----

valida muy bien por que si no hay actividades no ahy por que haber aviso de que el CPI este por encima si nisiquiera hay actividades es mas deberias de colocar algo que diga que no ahy actividades para ese proecto y un boton para crear actividad de ese proyecto que lo coloque de una vez en el select el proyecto 

-----

Realiza pruebas unitarias asegurando que los valores de los proyectos se estan calculando de forma correcta 