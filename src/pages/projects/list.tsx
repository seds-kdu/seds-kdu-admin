import { GenericList } from "../../components/generic-list";

export const ProjectsList = () => (
  <GenericList
    resource="projects"
    label="Projects"
    columns={["name", "year", "status", "team_lead", "image"]}
    createLabel="+ Add Project"
  />
);
