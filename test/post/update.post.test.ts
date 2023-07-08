import { beforeAll, beforeEach, describe, it } from "vitest";
import { request, spec } from "pactum";

describe("update post", () => {
    it("should update post", async () => {
        const mockPost = {
            title: "mock title",
            description: "mock description",
        };
        const post = await spec().post("/post").withBody(mockPost);
        await spec()
            .put("/post/{id}")
            .withPathParams("id", post.json.id)
            .expectStatus(200);
        await spec()
            .get("/post/{id}")
            .withPathParams("id", post.json.id)
            .expectStatus(200);
    });

    it("should fail to update", async () => {
        await spec()
            .put("/post/{id}")
            .withPathParams("id", "something")
            .expectStatus(400);
        await spec()
            .put("/post/{id}")
            .withPathParams("id", "914828d2-27da-4121-a633-aa84671ae843")
            .expectStatus(404);
    });
});
