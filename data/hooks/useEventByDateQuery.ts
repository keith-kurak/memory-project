import { useQuery } from "@tanstack/react-query";
import { sortBy } from "lodash";

const eventsSorted = sortBy(require("../events.json"), "date");

export const useEventByDateQuery = function (date: string) {
  // Queries
  const query = useQuery({
    queryKey: [`events-by-date-${date}`],
    queryFn: async () => {
      let eventIndex = -1;
      if (date === "latest") {
        eventIndex = eventsSorted.length - 1; // Get the latest event
      } else {
        // assumes a single event per date, which will not always work
        eventIndex = eventsSorted.findIndex((event) => event.date === date);
      }
      // If the event is not found, return
      if (eventIndex === -1) {
        return null;
      }

      const event = eventsSorted[eventIndex];

      const result = {
        data: event,
        nextDate: eventsSorted[eventIndex + 1]?.date || null,
        previousDate: eventsSorted[eventIndex - 1]?.date || null,
      };

      return result;
    },
  });

  return query;
};
