import { describe, it } from "vitest";
import { spec } from "pactum";

describe("health check", () => {
    it("should return healthy", async () => {
        await spec()
            .get("/health-check")
            .expectStatus(200)
            .expectBody({ status: "healthy" });
    });
});
