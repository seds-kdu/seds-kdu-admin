import { GenericList } from "../../components/generic-list";

export const CoreValuesList = () => (
  <GenericList
    resource="core_values"
    label="Core Values"
    columns={["title", "icon", "description", "sort_order"]}
    createLabel="+ Add Core Value"
  />
);
