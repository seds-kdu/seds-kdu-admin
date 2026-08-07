import { GenericList } from "../../components/generic-list";

export const DivisionsList = () => (
  <GenericList
    resource="divisions"
    label="Divisions"
    columns={["name", "icon", "color", "lead_name", "image"]}
    createLabel="+ Add Division"
  />
);
