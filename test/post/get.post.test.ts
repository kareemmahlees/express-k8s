import { describe, it } from "vitest";
import { spec } from "pactum";

describe("get post", () => {
    it("should get single post", async () => {
        const mockPost = {
            title: "mock title",
            description: "mock description",
        };
        const res = await spec().post("/post").withBody(mockPost);
        await spec()
            .get("/post/{id}")
            .withPathParams("id", res.json.id)
            .expectStatus(200)
            .expectBodyContains(res.json.id);
    });
    it("should return bad request", async () => {
        await spec()
            .get("/post/{id}")
            .withPathParams("id", "something")
            .expectStatus(400)
            .expectBody({ error: "Invalid Id" });
    });
});

describe("get posts", () => {
    it("should get posts", async () => {
        await spec().get("/post").expectStatus(200).expectJsonSchema({
            type: "array",
        });
    });
});
