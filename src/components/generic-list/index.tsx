import { useList, useNavigation, useDelete } from "@refinedev/core";

interface GenericListProps {
  resource: string;
  label: string;
  columns: string[];
  createLabel?: string;
}

const formatHeader = (col: string) =>
  col.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const formatCell = (val: unknown): string => {
  if (val === null || val === undefined) return "—";
  if (typeof val === "boolean") return val ? "Yes" : "No";
  const str = String(val);
  if (str.startsWith("http")) return "🔗 " + str.slice(0, 40) + "…";
  if (str.length > 60) return str.slice(0, 60) + "…";
  return str;
};

export const GenericList = ({
  resource,
  label,
  columns,
  createLabel = "+ Create",
}: GenericListProps) => {
  const { create, edit, show } = useNavigation();
  const { mutate: deleteOne } = useDelete();
  const listResult = useList({
    resource,
    pagination: { pageSize: 50 },
  });
  const { data, isLoading, isError } = (listResult.query ?? listResult) as {
    data?: { data?: Record<string, unknown>[] };
    isLoading?: boolean;
    isError?: boolean;
  };

  if (isError) {
    return (
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">{label}</h1>
          </div>
          <button className="btn btn-primary" onClick={() => create(resource)}>
            {createLabel}
          </button>
        </div>
        <div className="banner banner-error">
          <span className="banner-icon">⚠️</span>
          <div>
            <div className="banner-title">Could not load {label.toLowerCase()}</div>
            <div className="banner-body">
              Make sure the <code>{resource}</code> table exists in Supabase and RLS policies allow authenticated reads.
            </div>
            <button
              className="btn btn-secondary btn-sm"
              style={{ marginTop: 10 }}
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const rows = data?.data ?? [];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{label}</h1>
          <p className="page-subtitle">
            {isLoading ? "Loading…" : `${rows.length} record${rows.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => create(resource)}>
          {createLabel}
        </button>
      </div>

      {/* Table Card */}
      <div className="card">
        {isLoading ? (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton" style={{ height: 18, width: `${85 - i * 8}%` }} />
            ))}
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{formatHeader(col)}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1}>
                    <div className="table-empty">
                      <div className="table-empty-icon">📭</div>
                      <div className="table-empty-text">No {label.toLowerCase()} yet</div>
                      <div className="table-empty-sub">
                        Click "{createLabel}" to add the first entry.
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row: Record<string, unknown>) => (
                  <tr key={String(row.id)}>
                    {columns.map((col) => (
                      <td key={col} className="cell-truncate">
                        {formatCell(row[col])}
                      </td>
                    ))}
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => show(resource, String(row.id))}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => edit(resource, String(row.id))}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            if (confirm(`Delete this entry?`))
                              deleteOne({ resource, id: String(row.id) });
                          }}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
