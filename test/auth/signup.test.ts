import { spec } from "pactum";
import { describe, it } from "vitest";

describe("sign up", () => {
    it("should sign up successfully", async () => {
        await spec()
            .post("/auth/signup")
            .withBody({
                name: "kareem ebrahim",
                email: "kareemmahlees@gmail.com",
                password: "password123",
            })
            .expectStatus(201)
            .expectBodyContains("access_token");
    });
    it("should fail because email validation", async () => {
        await spec()
            .post("/auth/signup")
            .withBody({
                name: "kareem ebrahim",
                email: "kareemmahlees.com",
                password: "password123",
            })
            .expectStatus(400)
            .expectBodyContains("email");
    });
});
