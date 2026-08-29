import { COOKIE_NAME } from "@shared/const";
import { getInterestResponseTotals, recordInterestResponse } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { interestResponseInput } from "./interestValidation";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  interest: router({
    record: publicProcedure.input(interestResponseInput).mutation(async ({ input }) => {
      await recordInterestResponse(input.visitorToken, input.response);
      return { success: true } as const;
    }),
    totals: publicProcedure.query(async () => getInterestResponseTotals()),
  }),
});

export type AppRouter = typeof appRouter;
