<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

---

## ProjectPulse - Estado actual y flujo de trabajo

### 1. Arquitectura y tecnologías
- **NestJS** (v11): Backend modular, REST, OpenAPI, Clean Architecture.
- **TypeORM**: ORM para PostgreSQL, entidades, repositorios y migraciones.
- **PostgreSQL**: Base de datos relacional.
- **Swagger**: Documentación automática de endpoints.
- **class-validator**: Validación de DTOs.
- **Jest/Supertest**: Pruebas unitarias y de integración.

### 2. Estructura de carpetas relevante
- `src/proyectos/`: Lógica de proyectos (entidad, DTOs, servicio, controlador, pruebas).
- `src/actividades/`: Lógica de actividades (entidad, DTOs, servicio, controlador, pruebas).
- `src/evm/`: Lógica de indicadores EVM.
- `test/`: Pruebas end-to-end (e2e) con Supertest.

### 3. Endpoints principales
- `GET /api/projects`: Lista todos los proyectos.
- `GET /api/projects/:id`: Detalle y dashboard EVM de un proyecto.
- `POST /api/projects`: Crear proyecto.
- `PUT /api/projects/:id`: Editar proyecto.
- `DELETE /api/projects/:id`: Eliminar proyecto.
- `GET /api/activities/project/:projectId`: Lista actividades de un proyecto.
- `POST /api/activities`: Crear actividad.
- `PUT /api/activities/:id`: Editar actividad.
- `DELETE /api/activities/:id`: Eliminar actividad.

### 4. Pruebas unitarias y de integración
- Unitarias: Servicios y lógica EVM (`*.service.spec.ts`, `evm.service.spec.ts`).
- Integración: Endpoints y flujo real (`test/proyectos.e2e-spec.ts`, `test/app.e2e-spec.ts`).
- Ejecutar:
  ```bash
  npm run test         # Unitarias
  npm run test:e2e     # Integración
  npm run test:cov     # Cobertura
  ```

### 5. Flujo de desarrollo
1. Crear rama desde develop para cada feature.
2. Implementar entidades, DTOs, servicios y controladores usando TypeORM.
3. Adaptar CRUD a base de datos real.
4. Escribir pruebas unitarias y de integración.
5. Documentar endpoints con Swagger y README.
6. Hacer PR a develop y mergear tras revisión.

### 6. Estado actual
- CRUD real de proyectos y actividades usando PostgreSQL y TypeORM.
- DTOs validados y documentados.
- Pruebas unitarias y de integración cubren lógica y endpoints principales.
- Documentación actualizada.

---
