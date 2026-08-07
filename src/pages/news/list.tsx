import { GenericList } from "../../components/generic-list";

export const NewsList = () => (
  <GenericList
    resource="news"
    label="News Articles"
    columns={["title", "author", "date", "image"]}
    createLabel="+ Write Article"
  />
);
