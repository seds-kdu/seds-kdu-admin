import { useShow, useNavigation } from "@refinedev/core";

export const CoreValuesShow = () => {
  const { list, edit } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Core Value Details</h1>
          <p className="page-subtitle">{(record?.title as string) ?? "Loading…"}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => list("core_values")}>
            ← Back
          </button>
          {record?.id && (
            <button
              className="btn btn-primary"
              onClick={() => edit("core_values", String(record.id))}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="card" style={{ padding: 28, maxWidth: 600 }}>
        {isLoading ? (
          <div className="skeleton" style={{ height: 150, width: "100%" }} />
        ) : (
          <div>
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>⭐</span>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
                  {String(record?.title ?? "Untitled")}
                </h2>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
                  Icon: {String(record?.icon ?? "—")} | Order: {String(record?.sort_order ?? 0)}
                </p>
              </div>
            </div>

            {record?.description && (
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-primary)", margin: 0 }}>
                {String(record.description)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
