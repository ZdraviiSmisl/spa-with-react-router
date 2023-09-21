import { json, redirect, useRouteLoaderData } from "react-router-dom";
import styles from "./EventDetail.module.css";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const dataEvent = useRouteLoaderData("event-detail");
  //At the backend is requered to pass this specific parameter "event" as it was specified
  return <EventItem event={dataEvent.event} />;
};

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({ massage: "Not found any events" }, { status: 500 });
  }

  return response;
}

export async function action({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ massage: "Faild to delete the event" }, { status: 500 });
  }

  return redirect("/events");
}
