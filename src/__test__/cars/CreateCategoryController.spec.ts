import { hash } from "bcrypt";
// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import User from "../../modules/accounts/infra/typeorm/entities/User";
import { Category } from "../../modules/cars/infra/typeorm/entities/Category";
import app from "../../shared/infra/http/app";
import createConnection from "../../shared/infra/typeorm";

let connection: Connection;
let id: string;
let password: string;
let responseToken: request.Response;

describe("Create category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    password = await hash("admin", 8);

    id = uuidV4();

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, is_admin, driver_license)
      values('${id}', 'admin', 'admin@supertest.com', '${password}', true, '0')`
    );

    responseToken = await request(app).post("/login").send({
      email: "admin@supertest.com",
      password: "admin",
    });
  });

  it("Should be able to create a new category", async () => {
    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Supertest",
        description: "Category supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create two categories with same name", async () => {
    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Supertest",
        description: "Another category supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "This category already exists!" });
  });

  it("Should not be able to create a new category without token authentication", async () => {
    const response = await request(app).post("/categories").send({
      name: "Supertest",
      description: "Another category supertest",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Token missing!" });
  });

  afterAll(async () => {
    await connection
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id=:id", { id })
      .execute();

    await connection
      .createQueryBuilder()
      .delete()
      .from(Category)
      .where("name=:name", { name: "Supertest" })
      .execute();

    await connection.close();
  });
});
