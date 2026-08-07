import { useShow, useNavigation } from "@refinedev/core";

export const LeadsShow = () => {
  const { list, edit } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  const status = String(record?.status ?? "new").toLowerCase();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Lead / Inquiry Details</h1>
          <p className="page-subtitle">{(record?.name as string) ?? "Loading…"}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => list("leads")}>
            ← Back
          </button>
          {record?.id && (
            <button
              className="btn btn-primary"
              onClick={() => edit("leads", String(record.id))}
            >
              Edit Status
            </button>
          )}
        </div>
      </div>

      <div className="card" style={{ padding: 28, maxWidth: 650 }}>
        {isLoading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton" style={{ width: `${85 - i * 10}%` }} />
            ))}
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
                {String(record?.name ?? "Anonymous")}
              </h2>
              <span
                className={`badge ${
                  status === "closed"
                    ? "badge-success"
                    : status === "contacted"
                    ? "badge-accent"
                    : "badge-error"
                }`}
                style={{ fontSize: 12, padding: "4px 10px" }}
              >
                {status.toUpperCase()}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gap: 12,
                fontSize: 14,
                color: "var(--text-secondary)",
              }}
            >
              <div>
                <strong>Email:</strong> {String(record?.email ?? "—")}
              </div>
              {record?.phone && (
                <div>
                  <strong>Phone:</strong> {String(record.phone)}
                </div>
              )}
              {record?.subject && (
                <div>
                  <strong>Subject:</strong> {String(record.subject)}
                </div>
              )}
              {record?.created_at && (
                <div>
                  <strong>Received Date:</strong>{" "}
                  {new Date(String(record.created_at)).toLocaleString()}
                </div>
              )}
              {record?.message && (
                <div style={{ marginTop: 12 }}>
                  <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: 6 }}>
                    Message Content:
                  </strong>
                  <div
                    style={{
                      background: "var(--surface-2)",
                      padding: 16,
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      whiteSpace: "pre-wrap",
                      fontSize: 13.5,
                      lineHeight: 1.5,
                    }}
                  >
                    {String(record.message)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
