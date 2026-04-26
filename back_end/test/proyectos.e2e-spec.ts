import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ProyectosController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/projects (GET) should return 200 and an array', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/projects')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/api/projects/:id (GET) should return 200 and a dashboard DTO', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/projects/1')
      .expect(200);
    expect(res.body).toHaveProperty('totalBac');
    expect(res.body).toHaveProperty('cpi');
    expect(res.body).toHaveProperty('spi');
    expect(res.body).toHaveProperty('projectStatus');
  });
});
