export type RawEvent = {
  name: string;
  event: {
    type: string;
    eventDate: string;
  };
};

// TODO: Replace eventDate in RawEvent["event"], then replace event in RawEvent.
export type ParsedEvent = RawEvent;

export function parseEvent(raw: RawEvent): ParsedEvent {
  // TODO: Construct a new event with a Date at event.eventDate.
  return raw;
}
