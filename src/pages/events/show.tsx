import { useShow, useNavigation } from "@refinedev/core";

export const EventsShow = () => {
  const { list, edit } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Event Details</h1>
          <p className="page-subtitle">{(record?.name as string) ?? "Loading…"}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => list("events")}>
            ← Back
          </button>
          {record?.id && (
            <button
              className="btn btn-primary"
              onClick={() => edit("events", String(record.id))}
            >
              Edit Event
            </button>
          )}
        </div>
      </div>

      <div className="card" style={{ padding: 28, maxWidth: 750 }}>
        {isLoading ? (
          <div className="skeleton" style={{ height: 250, width: "100%" }} />
        ) : (
          <div>
            {record?.image && (
              <img
                src={String(record.image)}
                alt={String(record.name ?? "Event Banner")}
                style={{
                  width: "100%",
                  maxHeight: 320,
                  objectFit: "cover",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                }}
              />
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
                {String(record?.name ?? "Untitled Event")}
              </h2>
              {record?.is_upcoming && (
                <span className="badge badge-accent">UPCOMING</span>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                fontSize: 13.5,
                color: "var(--text-secondary)",
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div>
                <strong>Date:</strong> {String(record?.date ?? "—")}
              </div>
              <div>
                <strong>Time:</strong> {String(record?.time ?? "—")}
              </div>
              <div>
                <strong>Venue:</strong> {String(record?.venue ?? "—")}
              </div>
              <div>
                <strong>Category:</strong> {String(record?.category ?? "—")}
              </div>
              <div>
                <strong>Division:</strong> {String(record?.division_id ?? "—")}
              </div>
            </div>

            {record?.description && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 6 }}>
                  Summary
                </h4>
                <p style={{ fontSize: 14, margin: 0, lineHeight: 1.5 }}>
                  {String(record.description)}
                </p>
              </div>
            )}

            {record?.overview && (
              <div>
                <h4 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 6 }}>
                  Full Overview
                </h4>
                <div style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {String(record.overview)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
