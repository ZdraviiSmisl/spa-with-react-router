import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/Home";
import EventsPage, { loader as eventLoader } from "./Pages/Events";
import EventDetailPage, {
  loader as eventDitailLoader,
  action as eventDitailAction,
} from "./Pages/EventDetail";
import NewEventPage, { action as eventAction } from "./Pages/NewEvent";
import EditEventPage from "./Pages/EditEvent";
import RootLayout from "./Pages/Root";
import EventsRootLayout from "./Pages/EventsLayout";
import ErrorPage from "./Pages/Error";

//In order to unload the app.js component we can move logic of the loader function  to that component where on which we assigned the rout.. In this case it's the event page.. And in app.js component we can call it as Eventloader using alias in import loader function.. EventLoader(name can be any) will be a pointer to function has being determined in events page.

//Is's  possable to use error element at the any level of nesting but enough to set it at the top of hierarchy..Doing it this way we ensure that all mistakes occuring at any lavel will be bobbled up.. !ERORR Element works including for errors occuring dispite sending and geting request. NOt only for useing wrong url address
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventLoader,
          },

          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDitailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDitailAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: ManipulateEventsAction,
              },
            ],
          },

          {
            path: "new",
            element: <NewEventPage />,
            action: ManipulateEventsAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
