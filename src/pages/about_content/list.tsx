import { GenericList } from "../../components/generic-list";
export const AboutContentList = () => <GenericList resource="about_content" label="About Content" columns={["id","section","content"]} createLabel="+ Add Section" />;
