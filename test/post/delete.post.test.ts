import { describe, it } from "vitest";
import { spec } from "pactum";
import { faker } from "@faker-js/faker";

describe("delete post", () => {
    it("should delete post", async () => {
        const mockPost = {
            title: faker.word.noun(),
            description: faker.lorem.paragraph(),
        };
        const post = await spec().post("/post").withBody(mockPost);
        await spec()
            .delete("/post/{id}")
            .withPathParams("id", post.json.id)
            .expectStatus(200);
    });
    it("should fail to delete post", async () => {
        await spec()
            .delete("/post/{id}")
            .withPathParams("id", faker.string.uuid())
            .expectStatus(404)
            .expectBodyContains("error");
    });
});
