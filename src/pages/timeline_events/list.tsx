import { GenericList } from "../../components/generic-list";

export const TimelineEventsList = () => (
  <GenericList
    resource="timeline_events"
    label="Timeline Events"
    columns={["year", "title", "description", "sort_order"]}
    createLabel="+ Add Milestone"
  />
);
