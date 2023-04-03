import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

process.env.NODE_ENV = "test";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be defined", () => {
    expect(app).toBeDefined();
  });

  it("/ (GET)_ROOT ENDPOINT", () => {
    return request(app.getHttpServer()).get("/").expect(200).expect("coacters test_dodo9128");
  });

  it("/join (POST)_USER JOIN", async () => {
    const user1Email = "testuser1@test.io";
    const user1Password = "testuser1";
    const user1IsDriver = false;

    const user2Email = "driveruser1@driver.io";
    const user2Password = "driveruser1";
    const user2IsDriver = true;

    const response = await request(app.getHttpServer())
      .post("/user/join")
      .send({ email: user1Email, password: user1Password, is_driver: user1IsDriver });

    expect(response.statusCode).toEqual(200);
    expect(response.body.result).toEqual("ok");
    expect(response.body.message).toEqual(`${user1Email} join success`);
    expect(response.body.data).toEqual(null);

    const response2 = await request(app.getHttpServer())
      .post("/user/join")
      .send({ email: user1Email, password: user1Password, is_driver: user1IsDriver });

    expect(response2.statusCode).toEqual(401);
    expect(response2.body.result).toEqual("fail");
    expect(response2.body.message).toEqual(`User ${user1Email} has already joined`);
    expect(response2.body.data).toEqual(null);

    const response3 = await request(app.getHttpServer())
      .post("/user/join")
      .send({ email: user2Email, password: user2Password, is_driver: user2IsDriver });

    expect(response3.statusCode).toEqual(200);
    expect(response3.body.result).toEqual("ok");
    expect(response3.body.message).toEqual(`${user2Email} join success`);
    expect(response3.body.data).toEqual(null);
  });
});
