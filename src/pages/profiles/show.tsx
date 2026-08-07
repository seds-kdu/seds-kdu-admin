import { useShow, useNavigation } from "@refinedev/core";

export const ProfilesShow = () => {
  const { list, edit } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">User Profile Details</h1>
          <p className="page-subtitle">{(record?.name as string) ?? "Loading…"}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => list("profiles")}>
            ← Back
          </button>
          {record?.id && (
            <button
              className="btn btn-primary"
              onClick={() => edit("profiles", String(record.id))}
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
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>
              {String(record?.name ?? "—")}
            </h2>
            <p style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, margin: "0 0 16px" }}>
              Role: {String(record?.role ?? "—")}
            </p>

            <div style={{ fontSize: 13.5, color: "var(--text-secondary)" }}>
              <div>
                <strong>Email:</strong> {String(record?.email ?? "—")}
              </div>
              <div style={{ marginTop: 6 }}>
                <strong>User ID:</strong> {String(record?.id ?? "—")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
