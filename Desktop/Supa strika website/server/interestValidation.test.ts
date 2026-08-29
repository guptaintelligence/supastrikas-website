import { describe, expect, it } from "vitest";
import { interestResponseInput } from "./interestValidation";

describe("interest response validation", () => {
  it("accepts a well-formed visitor response", () => {
    expect(
      interestResponseInput.parse({
        visitorToken: "550e8400-e29b-41d4-a716-446655440000",
        response: "yes",
      }),
    ).toEqual({
      visitorToken: "550e8400-e29b-41d4-a716-446655440000",
      response: "yes",
    });
  });

  it("rejects invalid visitor tokens and unsupported responses", () => {
    expect(() => interestResponseInput.parse({ visitorToken: "not-a-token", response: "maybe" })).toThrow();
  });
});
