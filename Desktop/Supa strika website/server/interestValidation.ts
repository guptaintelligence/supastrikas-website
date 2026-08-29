import { z } from "zod";

export const interestResponseInput = z.object({
  visitorToken: z.string().uuid(),
  response: z.enum(["yes", "no"]),
});

export type InterestResponseInput = z.infer<typeof interestResponseInput>;
