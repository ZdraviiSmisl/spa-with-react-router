import EventsList from "../components/EventsList";

import { useLoaderData, json } from "react-router-dom";

//There is one more way by which we can differentiante 440  status  error from error with status 500. In this case it need's to throw a enw Response with object and status. It works with errors page

//Combined with react routers suport "response object" cant be returned without extracting data from json.

function EventsPage() {
  //events is wrpapped with promise

  // data is the response which we're getting and returning below in the Loader Function
  const data = useLoaderData();
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  const events = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;
//loader function need to specify in route defenition otherwise it doesn't work
export async function loader() {
  //It's possable to use here all brousers build-in futures such as  cookie, Local storage  etc. But it isn't alowed to used the hooks here. It does't work
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Failed to fetch the data" };
    //or throw new Error("Faild to fetch the data")
    //But the best way is to add error element to the router defenition and create separate error page
    // throw new Response(
    //   JSON.stringify({ message: "Failed to fetch the data" }),
    //   { status: 500 }
    // );

    // with this json introuduced by react-router-dom we can simplphy the cod in error page deleting JSON.pars
    throw json({ message: "Failed to fetch the data" }, { status: 500 });
  } else {
    return response;
  }
}
