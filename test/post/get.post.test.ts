import { describe, it } from "vitest";
import { spec } from "pactum";
import { faker } from "@faker-js/faker";

describe("get post", () => {
    it("should get single post", async () => {
        const mockPost = {
            title: faker.word.noun(),
            description: faker.lorem.paragraph(),
        };
        const res = await spec().post("/post").withBody(mockPost);
        await spec()
            .get("/post/{id}")
            .withPathParams("id", res.json.id)
            .expectStatus(200)
            .expectBodyContains(res.json.id);
    });
    it("should return post not found", async () => {
        await spec()
            .get("/post/{id}")
            .withPathParams("id", faker.string.uuid())
            .expectStatus(404);
    });
});

describe("get posts", () => {
    it("should get posts", async () => {
        await spec().get("/post").expectStatus(200).expectJsonSchema({
            type: "array",
        });
    });
});
