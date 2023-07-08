import { describe, it } from "vitest";
import { spec } from "pactum";

describe("delete post", () => {
    it("should delete post", async () => {
        const mockPost = {
            title: "mock title",
            description: "mock description",
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
            .withPathParams("id", "914828d2-27da-4121-a633-aa84671ae843")
            .expectStatus(404)
            .expectBodyContains("error");
    });
});
