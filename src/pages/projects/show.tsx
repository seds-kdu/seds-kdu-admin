import { useShow, useNavigation } from "@refinedev/core";

export const ProjectsShow = () => {
  const { list, edit } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Project Details</h1>
          <p className="page-subtitle">{(record?.name as string) ?? "Loading…"}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => list("projects")}>
            ← Back
          </button>
          {record?.id && (
            <button
              className="btn btn-primary"
              onClick={() => edit("projects", String(record.id))}
            >
              Edit Project
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
                alt={String(record.name ?? "Project Image")}
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
                {String(record?.name ?? "Untitled Project")}
              </h2>
              <span className="badge badge-accent">
                {String(record?.status ?? "Ongoing").toUpperCase()}
              </span>
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
                <strong>Year:</strong> {String(record?.year ?? "—")}
              </div>
              <div>
                <strong>Team Lead:</strong> {String(record?.team_lead ?? "—")}
              </div>
              <div>
                <strong>Timeline:</strong> {String(record?.timeline ?? "—")}
              </div>
            </div>

            {record?.short_desc && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 6 }}>
                  Summary
                </h4>
                <p style={{ fontSize: 14, margin: 0, lineHeight: 1.5 }}>
                  {String(record.short_desc)}
                </p>
              </div>
            )}

            {record?.full_desc && (
              <div>
                <h4 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 6 }}>
                  Full Description
                </h4>
                <div style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {String(record.full_desc)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
