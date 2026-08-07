import { useShow, useNavigation } from "@refinedev/core";

export const GalleryShow = () => {
  const { list, edit } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gallery Photo Details</h1>
          <p className="page-subtitle">{(record?.caption as string) ?? "Photo View"}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => list("gallery")}>
            ← Back
          </button>
          {record?.id && (
            <button
              className="btn btn-primary"
              onClick={() => edit("gallery", String(record.id))}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="card" style={{ padding: 28, maxWidth: 700 }}>
        {isLoading ? (
          <div className="skeleton" style={{ height: 300, width: "100%" }} />
        ) : (
          <div>
            {record?.url && (
              <img
                src={String(record.url)}
                alt={String(record.caption ?? "Gallery Image")}
                style={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "contain",
                  borderRadius: "var(--radius)",
                  marginBottom: 16,
                  background: "#000",
                }}
              />
            )}
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px" }}>
              {String(record?.caption ?? "Untitled")}
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
              Category: {String(record?.category ?? "General")} | Event:{" "}
              {String(record?.event_name ?? "—")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
