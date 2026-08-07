import { GenericList } from "../../components/generic-list";

export const TeamMembersList = () => (
  <GenericList
    resource="team_members"
    label="Team Members"
    columns={["name", "role", "faculty", "photo"]}
    createLabel="+ Add Member"
  />
);
