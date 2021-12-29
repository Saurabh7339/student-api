import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { response } from 'express';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  
  //  describe("GET /records", ()=> {
  //    it("It should get all the records", (done)=> {
  //      chai.request(AppModule)
  //      .get("/records")
  //      .end((err,response)=> {
  //        response.should.have.status(200);
  //        done();
  //      })
  //    })
  //  })
  
});
