import { GenericList } from "../../components/generic-list";

export const ProfilesList = () => (
  <GenericList
    resource="profiles"
    label="Admin User Profiles"
    columns={["name", "email", "role"]}
    createLabel="+ Add User Profile"
  />
);
