import EventForm from "../components/EventForm";
import { useRouteLoaderData, json, redirect } from "react-router-dom";

//"UseRoaterLoaderData" hook it used for the  deep nested routes.Given hook reqires the chertain id  when the thoader funciton is used.

const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");
  return <EventForm event={data.event} method="patch" />;
};

export default EditEventPage;
