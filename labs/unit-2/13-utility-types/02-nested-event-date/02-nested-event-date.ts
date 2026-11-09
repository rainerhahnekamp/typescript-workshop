export type RawEvent = {
  name: string;
  event: {
    type: string;
    eventDate: string;
  };
};

export type ParsedEvent = Omit<RawEvent, "event"> & {
  event: Omit<RawEvent["event"], "eventDate"> & { eventDate: Date };
};

export function parseEvent(raw: RawEvent): ParsedEvent {
  return {
    ...raw,
    event: { ...raw.event, eventDate: new Date(raw.event.eventDate) },
  };
}
