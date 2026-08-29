/**
 * Design reminder — use a crisp red/black/yellow fanzine card that blocks the storefront until the visitor responds.
 */
import { Check, Gift, Instagram, Loader2, Music2 } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

const RESPONSE_KEY = "supastrikas-interest-response";
const VISITOR_KEY = "supastrikas-interest-visitor";

type ResponseChoice = "yes" | "no";

function getVisitorToken() {
  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;
  const next = crypto.randomUUID();
  window.localStorage.setItem(VISITOR_KEY, next);
  return next;
}

export default function InterestGate({ onDismiss }: { onDismiss: () => void }) {
  const [choice, setChoice] = useState<ResponseChoice | null>(null);
  const [requestFailed, setRequestFailed] = useState(false);
  const record = trpc.interest.record.useMutation({
    onSuccess: (_result, variables) => {
      window.localStorage.setItem(RESPONSE_KEY, variables.response);
      setChoice(variables.response);
    },
    onError: () => setRequestFailed(true),
  });

  const choose = (response: ResponseChoice) => {
    setRequestFailed(false);
    record.mutate({ visitorToken: getVisitorToken(), response });
  };

  return (
    <section className="interest-gate" aria-label="Jersey interest question" role="dialog" aria-modal="true">
      <div className="interest-gate-shade" />
      <div className="interest-card">
        {choice ? (
          <>
            <span className="interest-mark"><Check size={22} /></span>
            <p className="interest-kicker">{choice === "yes" ? "YOU'RE ON THE RADAR" : "THANKS FOR THE FEEDBACK"}</p>
            <h2>{choice === "yes" ? "WE'LL KEEP YOU POSTED." : "SEE YOU ON THE NEXT DROP."}</h2>
            <p className="interest-body">Follow us for launch news, discounts, giveaways, and every move before the next whistle.</p>
          </>
        ) : (
          <>
            <p className="interest-kicker">FIRST DROP CHECK-IN</p>
            <h2>WOULD YOU<br />BUY THE JERSEY?</h2>
            <p className="interest-body">Your answer helps us plan the next run. Takes one tap.</p>
            <div className="interest-actions">
              <button className="interest-answer answer-yes" onClick={() => choose("yes")} disabled={record.isPending}>
                {record.isPending ? <Loader2 size={18} className="spin" /> : "YES, I WOULD"}
              </button>
              <button className="interest-answer answer-no" onClick={() => choose("no")} disabled={record.isPending}>NO, NOT YET</button>
            </div>
            {requestFailed && <p className="interest-error">We couldn&apos;t save that answer. Please try once more.</p>}
          </>
        )}
        <div className="interest-socials">
          <span><Gift size={16} /> FOLLOW FOR UPDATES, DISCOUNTS &amp; GIVEAWAYS</span>
          <div>
            <a href="https://www.instagram.com/supastrika.clothing" target="_blank" rel="noreferrer"><Instagram size={19} /> INSTAGRAM</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer"><Music2 size={19} /> TIKTOK</a>
          </div>
        </div>
        {choice && <button className="interest-continue" onClick={onDismiss}>VIEW THE DROP</button>}
      </div>
    </section>
  );
}
