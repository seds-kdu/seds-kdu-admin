import { GenericList } from "../../components/generic-list";

export const EventsList = () => (
  <GenericList
    resource="events"
    label="Events"
    columns={["name", "date", "venue", "category", "is_upcoming", "image"]}
    createLabel="+ Create Event"
  />
);
