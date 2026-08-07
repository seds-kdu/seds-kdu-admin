import { useShow, useNavigation } from "@refinedev/core";

export const TimelineEventsShow = () => {
  const { list, edit } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Timeline Event</h1>
          <p className="page-subtitle">{(record?.title as string) ?? "Loading…"}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => list("timeline_events")}>
            ← Back
          </button>
          {record?.id && (
            <button
              className="btn btn-primary"
              onClick={() => edit("timeline_events", String(record.id))}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="card" style={{ padding: 28, maxWidth: 650 }}>
        {isLoading ? (
          <div className="skeleton" style={{ height: 150, width: "100%" }} />
        ) : (
          <div>
            <span className="badge badge-accent" style={{ marginBottom: 8 }}>
              {String(record?.year ?? "Year")}
            </span>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: "8px 0 12px" }}>
              {String(record?.title ?? "Untitled Milestone")}
            </h2>

            {record?.description && (
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
                {String(record.description)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
