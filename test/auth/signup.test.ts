import { spec } from "pactum";
import { describe, it } from "vitest";
import { faker } from "@faker-js/faker";

describe("sign up", () => {
    it("should sign up successfully", async () => {
        await spec()
            .post("/auth/signup")
            .withBody({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            })
            .expectStatus(201)
            .expectBodyContains("access_token");
    });
    it("should fail because email validation", async () => {
        await spec()
            .post("/auth/signup")
            .withBody({
                name: faker.person.fullName(),
                email: "invalid email",
                password: faker.internet.password(),
            })
            .expectStatus(400)
            .expectBodyContains("email");
    });
});
