import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/Home";
import EventsPage from "./Pages/Events";
import EventDetailPage from "./Pages/EventDetail";
import NewEventPage from "./Pages/NewEvent";
import EditEventPage from "./Pages/EditEvent";
import RootLayout from "./Pages/Root";
import EventsRootLayout from "./Pages/EventsLayout";

import useHttp from "./components/hooks/response-hook";

// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: async () => {
              try {
                const response = await fetch(requestConfig.url, {
                  method: requestConfig.method ? requestConfig.method : "GET",
                  headers: requestConfig.headers ? requestConfig.headers : {},
                  body: requestConfig.body
                    ? JSON.stringify(requestConfig.body)
                    : null,
                });

                if (!response.ok) {
                  throw new Error("Request failed!");
                }

                const data = await response.json();
                applyData(data.events);

                setIsloading(false);
              } catch (error) {
                setError(error.message || "Somting went wrong");
              }
            },
          },
          { path: ":eventId", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
