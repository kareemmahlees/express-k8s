import { request, spec } from "pactum";
import { beforeAll } from "vitest";
import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

dotenvExpand.expand(dotenv.config());

beforeAll(async () => {
    request.setBaseUrl(process.env.PACTUM_REQUEST_BASE_URL as string);
    await spec().post("/auth/signup").withBody({
        name: "kareem ebrahim",
        email: "kareemmahlees@gmail.com",
        password: "password123",
    });
    const res = await spec().post("/auth/login").withBody({
        email: "kareemmahlees@gmail.com",
        password: "password123",
    });
    request.setBearerToken(res.json.access_token);
});
