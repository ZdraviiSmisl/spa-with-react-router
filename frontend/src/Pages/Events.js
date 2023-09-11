import { useEffect, useState } from "react";
import useHttp from "../components/hooks/response-hook";
import EventsList from "../components/EventsList";

const EventsPage = () => {
  const { isLoading: isFetching, error, sendRequest: fetchEvents } = useHttp();
  const [fetchedEvents, setFetchedEvents] = useState();

  useEffect(() => {
    const transformData = (events) => {
      const transformedEvents = [];
      for (const key in events) {
        transformedEvents.push({
          id: events[key].id,
          title: events[key].title,
          date: events[key].date,
          image: events[key].image,
        });
      }

      setFetchedEvents(transformedEvents);
    };

    fetchEvents({ url: "http://localhost:8080/events" }, transformData);
  }, [fetchEvents]);

  return (
    <>
      {isFetching && <p>Loading Events</p>}
      {error && <p>{error.message}</p>}
      {!isFetching && fetchedEvents && <EventsList events={fetchedEvents} />}
    </>
  );
};

export default EventsPage;
