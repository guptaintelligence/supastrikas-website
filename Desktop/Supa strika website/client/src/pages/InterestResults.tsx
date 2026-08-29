/** Design reminder — a compact owner dashboard should retain the storefront's black, red, and yellow visual language. */
import { BarChart3, CheckCircle2, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function InterestResults() {
  const totals = trpc.interest.totals.useQuery(undefined, { retry: false });
  const data = totals.data;
  const totalResponses = data?.total ?? 0;
  const yesRate = totalResponses ? Math.round(((data?.yes ?? 0) / totalResponses) * 100) : 0;

  return (
    <main className="interest-results-shell">
      <a className="results-back" href="/">← BACK TO STOREFRONT</a>
      <div className="interest-results-page">
        <header className="results-header">
          <div>
            <p>SUPA STRIKAS CLOTHING</p>
            <h1>INTEREST<br /><span>TRACKER.</span></h1>
            <span className="results-badge">AGGREGATE VIEW · LIVE RESPONSES</span>
          </div>
          <button className="results-refresh" onClick={() => totals.refetch()} disabled={totals.isFetching}>
            <RefreshCw size={17} className={totals.isFetching ? "spin" : ""} /> REFRESH
          </button>
        </header>

        {totals.isError ? (
          <section className="results-error">
            <h2>THE TRACKER ISN&apos;T AVAILABLE.</h2>
            <p>Please refresh the page. If the issue continues, the database connection may need attention.</p>
          </section>
        ) : (
          <>
            <section className="result-stat-grid" aria-label="Interest response totals">
              <article className="result-stat result-total"><BarChart3 size={24} /><span>TOTAL RESPONSES</span><strong>{totalResponses}</strong></article>
              <article className="result-stat result-yes"><ThumbsUp size={24} /><span>YES — INTERESTED</span><strong>{data?.yes ?? 0}</strong></article>
              <article className="result-stat result-no"><ThumbsDown size={24} /><span>NO — NOT YET</span><strong>{data?.no ?? 0}</strong></article>
            </section>
            <section className="results-breakdown">
              <div className="breakdown-label"><span>YES INTEREST LEVEL</span><strong>{yesRate}%</strong></div>
              <div className="breakdown-bar"><span style={{ width: `${yesRate}%` }} /></div>
              <p>{totalResponses ? `${data?.yes ?? 0} of ${totalResponses} visitors said they would buy the jersey.` : "Response totals will appear here as visitors submit their answer."}</p>
              <div className="results-note"><CheckCircle2 size={18} /> Each browser receives one persistent response token. A return visit can update its prior answer without increasing the total.</div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
