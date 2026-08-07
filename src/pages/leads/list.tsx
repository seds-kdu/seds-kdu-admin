import { GenericList } from "../../components/generic-list";

export const LeadsList = () => (
  <GenericList
    resource="leads"
    label="Leads & Inquiries"
    columns={["name", "email", "phone", "subject", "status"]}
    createLabel="+ Add Lead"
  />
);
