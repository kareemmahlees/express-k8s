import { describe, it } from "vitest";
import { spec } from "pactum";
import { faker } from "@faker-js/faker";

describe("create post", () => {
    const mockPost = {
        title: faker.word.noun(),
        description: faker.lorem.paragraph(),
    };
    it("should create post", async () => {
        await spec()
            .post("/post")
            .withBody(mockPost)
            .expectStatus(201)
            .expectBodyContains(mockPost.title)
            .expectBodyContains(mockPost.description);
    });

    it("should error create post", async () => {
        const errorMockPost = { title: faker.word.noun() };
        await spec().post("/post").withBody(errorMockPost).expectStatus(400);
    });
});
