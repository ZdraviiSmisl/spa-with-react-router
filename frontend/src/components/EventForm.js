import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

//Form componet is introduced by "react rounter" allows to pass our request(with the form) to our action.(It's importan to specify a method post  for the Form component).It's was't sent to backend directly

function EventForm({ method, event }) {
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {actionData && actionData.errors && (
        <ul>
          {Object.values(actionData.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.data : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

//Actions is created as well as loaders and use the same parameters

export async function action({ request, params }) {
  const data = await request.formData();

  const method = request.method;

  //using "get" method we can exctract the specific data by tag property name

  const sentData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  if (request.method === "PATCH") {
    const id = params.eventId;
    url = url + id;
  }

  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sentData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ massage: "Faled to save the event" }, { status: 500 });
  }

  return redirect("/events");
}
