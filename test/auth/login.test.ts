import { spec } from "pactum";
import { describe, it } from "vitest";

describe("login", () => {
    it("should login", async () => {
        await spec().post("/auth/signup").withBody({
            name: "kareem ebrahim",
            email: "kareemmahlees@gmail.com",
            password: "password123",
        });
        await spec()
            .post("/auth/login")
            .withBody({
                email: "kareemmahlees@gmail.com",
                password: "password123",
            })
            .expectStatus(200)
            .expectBodyContains("access_token");
    });
    it("should fail to login", async () => {
        await spec()
            .post("/auth/login")
            .withBody({
                email: "somethingelse@gmail.com",
                password: "password123",
            })
            .expectBodyContains("email");
    });
});
