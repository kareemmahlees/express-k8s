import { describe, it } from "vitest";
import { spec, request } from "pactum";
import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

dotenvExpand.expand(dotenv.config());
request.setBaseUrl(process.env.PACTUM_REQUEST_BASE_URL);

describe("health check", () => {
  it("should return healthy", async () => {
    await spec()
      .get("/health-check")
      .expectStatus(200)
      .expectBody({ status: "healthy" });
  });
});
