import { useShow, useNavigation } from "@refinedev/core";

export const NewsShow = () => {
  const { list, edit } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">News Article</h1>
          <p className="page-subtitle">{(record?.title as string) ?? "Loading…"}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => list("news")}>
            ← Back
          </button>
          {record?.id && (
            <button
              className="btn btn-primary"
              onClick={() => edit("news", String(record.id))}
            >
              Edit
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
                alt={String(record.title ?? "News Cover")}
                style={{
                  width: "100%",
                  maxHeight: 320,
                  objectFit: "cover",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                }}
              />
            )}

            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>
              {String(record?.title ?? "Untitled Article")}
            </h2>

            <p
              style={{
                fontSize: 13,
                color: "var(--text-secondary)",
                marginBottom: 20,
                paddingBottom: 12,
                borderBottom: "1px solid var(--border)",
              }}
            >
              By <strong>{String(record?.author ?? "SEDS KDU")}</strong> |{" "}
              {String(record?.date ?? "—")}
            </p>

            {record?.excerpt && (
              <div
                style={{
                  background: "var(--surface-2)",
                  padding: 16,
                  borderRadius: "var(--radius-sm)",
                  fontStyle: "italic",
                  marginBottom: 16,
                  color: "var(--text-secondary)",
                }}
              >
                {String(record.excerpt)}
              </div>
            )}

            {record?.content && (
              <div style={{ fontSize: 14.5, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {String(record.content)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
