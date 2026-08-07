import { useShow, useNavigation } from "@refinedev/core";

export const ArticlesShow = () => {
  const { list, edit } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <div style={{ padding: 16, maxWidth: 600 }}>
      <h1>Article Details</h1>
      {isLoading ? <p>Loading…</p> : (
        <table>
          <tbody>
            {record && Object.entries(record).map(([key, value]) => (
              <tr key={key}>
                <th style={{ textAlign: "left", paddingRight: 16 }}>{key}</th>
                <td>{String(value ?? "—")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ marginTop: 16 }}>
        <button onClick={() => list("articles")}>← Back</button>{" "}
        {record?.id && <button onClick={() => edit("articles", record.id as string)}>Edit</button>}
      </div>
    </div>
  );
};
