import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../src/entities/user.entity";
import { Reservation } from "../src/entities/reservation.entity";

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
    // const dataSource = await new DataSource({
    //   type: "mariadb",
    //   host: "localhost",
    //   port: 3306,
    //   username: "test",
    //   password: "testUser",
    //   database: "coacters_test_fortest",
    //   synchronize: false,
    //   entities: ["src/**/*.entity.ts"],
    //   //   entities: [__dirname + "src/entities/*.entity{.ts,.js}"],
    //   migrations: ["src/database/migrations/*.ts"],
    //   migrationsTableName: "migrations",
    // } as DataSourceOptions);
    //
    // await dataSource.getRepository(User).createQueryBuilder().delete().execute();
    //
    // await dataSource.getRepository(Reservation).createQueryBuilder().delete().execute();

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
      .set("Accept", "application/json")
      .type("application/json")
      .send({ email: user1Email, password: user1Password, is_driver: user1IsDriver });

    expect(response.statusCode).toEqual(200);
    expect(response.body.result).toEqual("ok");
    expect(response.body.message).toEqual(`${user1Email} join success`);
    expect(response.body.data).toEqual(null);

    const response2 = await request(app.getHttpServer())
      .post("/user/join")
      .set("Accept", "application/json")
      .type("application/json")
      .send({ email: user1Email, password: user1Password, is_driver: user1IsDriver });

    expect(response2.statusCode).toEqual(401);
    expect(JSON.parse(response2.text).name).toEqual("join");
    expect(JSON.parse(response2.text).error).not.toBeNull();

    const response3 = await request(app.getHttpServer())
      .post("/user/join")
      .set("Accept", "application/json")
      .type("application/json")
      .send({ email: user2Email, password: user2Password, is_driver: user2IsDriver });

    expect(response3.statusCode).toEqual(200);
    expect(response3.body.result).toEqual("ok");
    expect(response3.body.message).toEqual(`${user2Email} join success`);
    expect(response3.body.data).toEqual(null);
  });

  const token = {};

  it("/user/login (POST)_USER LOGIN", async () => {
    const user1Data = {
      email: "testuser1@test.io",
      password: "testuser1",
    };

    const user2Data = {
      email: "driveruser1@driver.io",
      password: "driveruser1",
    };

    const user1WrongPw = {
      email: "testuser1@test.io",
      password: "wrongpassword",
    };

    const noExistUser = {
      email: "nouser@nouser.io",
      password: "password",
    };

    // 존재하지 않는 유저
    // 로그인 실패
    // 로그인

    const noExistRequest = await request(app.getHttpServer())
      .post("/user/login")
      .set("Accept", "application/json")
      .type("application/json")
      .send(noExistUser);

    expect(noExistRequest.statusCode).toEqual(403);

    expect(JSON.parse(noExistRequest.text).name).toEqual("login");
    expect(JSON.parse(noExistRequest.text).error).not.toBeNull();

    const wrongPwRequest = await request(app.getHttpServer())
      .post("/user/login")
      .set("Accept", "application/json")
      .type("application/json")
      .send(user1WrongPw);

    expect(wrongPwRequest.statusCode).toEqual(400);

    expect(JSON.parse(wrongPwRequest.text).result).toEqual("fail");
    expect(JSON.parse(wrongPwRequest.text).message).toEqual(`${user1WrongPw.email} login fail`);
    expect(JSON.parse(wrongPwRequest.text).data).toBeNull();

    const user1Login = await request(app.getHttpServer())
      .post("/user/login")
      .set("Accept", "application/json")
      .type("application/json")
      .send(user1Data);

    expect(user1Login.statusCode).toEqual(200);
    expect(user1Login.body.result).toEqual("ok");
    expect(user1Login.body.message).toEqual(`${user1Data.email} login success`);
    expect(user1Login.body.data).not.toBeNull();
    expect(user1Login.body.data.userInfo.email).toEqual(user1Data.email);

    token["customer"] = user1Login.body.data.token;

    const user2Login = await request(app.getHttpServer())
      .post("/user/login")
      .set("Accept", "application/json")
      .type("application/json")
      .send(user2Data);

    expect(user2Login.statusCode).toEqual(200);
    expect(user2Login.body.result).toEqual("ok");
    expect(user2Login.body.message).toEqual(`${user2Data.email} login success`);
    expect(user2Login.body.data).not.toBeNull();
    expect(user2Login.body.data.userInfo.email).toEqual(user2Data.email);

    token["driver"] = user2Login.body.data.token;

    console.log("MAKING TOKEN :", token);
  });

  it("/user/hard_delete (DELETE)_user hard delete", async () => {
    const user1Email = "testuser1@test.io";

    const user2Email = "driveruser1@driver.io";

    const response = await request(app.getHttpServer())
      .delete("/user/hard_delete")
      .set("Accept", "application/json")
      .type("application/json")
      .send({ email: user1Email });

    expect(response.statusCode).toEqual(200);
    expect(response.body.result).toEqual("ok");
    expect(response.body.message).toEqual(`User ${user1Email} hard delete success`);
    expect(response.body.data).toEqual(null);

    const response2 = await request(app.getHttpServer())
      .delete("/user/hard_delete")
      .set("Accept", "application/json")
      .type("application/json")
      .send({ email: user2Email });

    expect(response2.statusCode).toEqual(200);
    expect(response2.body.result).toEqual("ok");
    expect(response2.body.message).toEqual(`User ${user2Email} hard delete success`);
    expect(response2.body.data).toEqual(null);
  });
});
