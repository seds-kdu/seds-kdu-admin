import { useShow, useNavigation } from "@refinedev/core";

export const TeamMembersShow = () => {
  const { list, edit } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Team Member Details</h1>
          <p className="page-subtitle">{(record?.name as string) ?? "Loading…"}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => list("team_members")}>
            ← Back
          </button>
          {record?.id && (
            <button
              className="btn btn-primary"
              onClick={() => edit("team_members", String(record.id))}
            >
              Edit
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
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            {record?.photo ? (
              <img
                src={String(record.photo)}
                alt={String(record.name)}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid var(--border)",
                  boxShadow: "var(--shadow-md)",
                }}
              />
            ) : (
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 42,
                  fontWeight: 700,
                }}
              >
                {String(record?.name ?? "M")[0]}
              </div>
            )}

            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>
                {String(record?.name ?? "—")}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--accent)",
                  margin: "0 0 12px",
                }}
              >
                {String(record?.role ?? "Member")}
              </p>

              <div
                style={{
                  display: "grid",
                  gap: 10,
                  fontSize: 13.5,
                  color: "var(--text-secondary)",
                }}
              >
                {record?.faculty && (
                  <div>
                    <strong>Faculty:</strong> {String(record.faculty)}
                  </div>
                )}
                {record?.email && (
                  <div>
                    <strong>Email:</strong> {String(record.email)}
                  </div>
                )}
                {record?.bio && (
                  <div style={{ marginTop: 8 }}>
                    <strong>Bio:</strong>
                    <p style={{ margin: "4px 0 0", color: "var(--text-primary)" }}>
                      {String(record.bio)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
