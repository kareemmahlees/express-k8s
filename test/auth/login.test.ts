import { faker } from "@faker-js/faker";
import { spec } from "pactum";
import { describe, it } from "vitest";

describe("login", () => {
    it("should login", async () => {
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };
        await spec().post("/auth/signup").withBody(user);
        await spec()
            .post("/auth/login")
            .withBody({
                email: user.email,
                password: user.password,
            })
            .expectStatus(200)
            .expectBodyContains("access_token");
    });
    it("should fail to login", async () => {
        await spec()
            .post("/auth/login")
            .withBody({
                email: "somethingelse@gmail.com",
                password: faker.internet.password(),
            })
            .expectBodyContains("email");
    });
});
