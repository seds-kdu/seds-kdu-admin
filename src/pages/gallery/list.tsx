import { GenericList } from "../../components/generic-list";

export const GalleryList = () => (
  <GenericList
    resource="gallery"
    label="Gallery"
    columns={["url", "caption", "category", "event_name"]}
    createLabel="+ Add Photo"
  />
);
