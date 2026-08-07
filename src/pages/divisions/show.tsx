import { useShow, useNavigation } from "@refinedev/core";

export const DivisionsShow = () => {
  const { list, edit } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Division Details</h1>
          <p className="page-subtitle">{(record?.name as string) ?? "Loading…"}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => list("divisions")}>
            ← Back
          </button>
          {record?.id && (
            <button
              className="btn btn-primary"
              onClick={() => edit("divisions", String(record.id))}
            >
              Edit Division
            </button>
          )}
        </div>
      </div>

      <div className="card" style={{ padding: 28, maxWidth: 750 }}>
        {isLoading ? (
          <div className="skeleton" style={{ height: 250, width: "100%" }} />
        ) : (
          <div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: String(record?.color ?? "var(--accent)"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {String(record?.name ?? "D")[0]}
              </div>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
                  {String(record?.name ?? "Division")}
                </h2>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
                  Icon: {String(record?.icon ?? "—")} | Color: {String(record?.color ?? "—")}
                </p>
              </div>
            </div>

            {record?.image && (
              <img
                src={String(record.image)}
                alt={String(record.name ?? "Division Image")}
                style={{
                  width: "100%",
                  maxHeight: 280,
                  objectFit: "cover",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                }}
              />
            )}

            {record?.short_desc && (
              <p style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 16 }}>
                {String(record.short_desc)}
              </p>
            )}

            {record?.full_desc && (
              <div style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 20, whiteSpace: "pre-wrap" }}>
                {String(record.full_desc)}
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                padding: 16,
                background: "var(--surface-2)",
                borderRadius: "var(--radius-sm)",
                fontSize: 13.5,
              }}
            >
              <div>
                <strong>Division Lead:</strong> {String(record?.lead_name ?? "—")}{" "}
                {record?.lead_faculty ? `(${record.lead_faculty})` : ""}
              </div>
              <div>
                <strong>Division Co-Lead:</strong> {String(record?.colead_name ?? "—")}{" "}
                {record?.colead_faculty ? `(${record.colead_faculty})` : ""}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
