import CalendarPage from "./pages/CalendarPage";

export const EventsModule = {
    path: "",
    children: [{
        path: "events",
        children: [{
            index: true,
            element: <CalendarPage/>,
        }]
    }]
};