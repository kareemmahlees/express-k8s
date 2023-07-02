import { describe, it } from "vitest";
import { spec, request } from "pactum";
import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

dotenvExpand.expand(dotenv.config());
request.setBaseUrl(process.env.PACTUM_REQUEST_BASE_URL);

describe("create post", () => {
  const mockPost = { title: "title 1", description: "description 1" };
  it("should create post", async () => {
    await spec()
      .post("/post")
      .withBody(mockPost)
      .expectStatus(201)
      .expectBodyContains(mockPost.title)
      .expectBodyContains(mockPost.description);
  });

  it("should error create post", async () => {
    const errorMockPost = { title: "title 1" };
    await spec().post("/post").withBody(errorMockPost).expectStatus(400);
  });
});
