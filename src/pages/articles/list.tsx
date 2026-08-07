import { useTable } from "@refinedev/react-table";
import { flexRender } from "@tanstack/react-table";
import { useNavigation } from "@refinedev/core";

export const ArticlesList = () => {
  const { create, edit, show } = useNavigation();
  const { reactTable, refineCore } = useTable({
    columns: [
      { id: "id", accessorKey: "id", header: "ID" },
      { id: "title", accessorKey: "title", header: "Title" },
      { id: "author", accessorKey: "author", header: "Author" },
      { id: "published_at", accessorKey: "published_at", header: "Published" },
    ],
  });

  const { isLoading, isError } = refineCore.tableQuery;

  if (isError) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Articles</h1>
        <div style={{ padding: 16, background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8 }}>
          <strong style={{ color: "#dc2626" }}>⚠ Could not load articles.</strong>
          <p style={{ color: "#7f1d1d", margin: "8px 0 0" }}>
            Make sure the <code>articles</code> table exists in your Supabase project and RLS policies allow reads.
          </p>
          <button onClick={() => window.location.reload()} style={{ marginTop: 8 }}>Retry</button>
        </div>
        <div style={{ marginTop: 16 }}>
          <button onClick={() => create("articles")}>+ Write Article</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Articles</h1>
        <button onClick={() => create("articles")}>+ Write Article</button>
      </div>
      {isLoading ? (
        <p>Loading…</p>
      ) : (
        <table>
          <thead>
            {reactTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {reactTable.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 24 }}>
                  No articles yet. Write your first one!
                </td>
              </tr>
            ) : (
              reactTable.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => show("articles", row.original.id)}>View</button>{" "}
                    <button onClick={() => edit("articles", row.original.id)}>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
