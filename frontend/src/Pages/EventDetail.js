import { Link, useParams } from "react-router-dom";
import styles from "./EventDetail.module.css";

const EventDetailPage = () => {
  const params = useParams();
  return (
    <>
      <h1>Informaiton about the event</h1>
      <p>Event ID: {params.eventId}</p>
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
};

export default EventDetailPage;
