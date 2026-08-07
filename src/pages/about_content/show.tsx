import { useShow, useNavigation } from "@refinedev/core";
export const AboutContentShow = () => {
  const { list, edit } = useNavigation();
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;
  return (
    <div style={{ padding: 16, maxWidth: 600 }}>
      <h1>Details</h1>
      {isLoading ? <p>Loading...</p> : (
        <table><tbody>
          {record && Object.entries(record).map(([k,v]) => <tr key={k}><th style={{textAlign:'left',paddingRight:16}}>{k}</th><td>{String(v??'—')}</td></tr>)}
        </tbody></table>
      )}
      <div style={{ marginTop: 16 }}>
        <button onClick={() => list('about_content')}>Back</button>{' '}
        {record?.id && <button onClick={() => edit('about_content', record.id as string)}>Edit</button>}
      </div>
    </div>
  );
};
