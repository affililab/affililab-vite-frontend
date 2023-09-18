import ManageTable from "./pages/ManageTable";

export const TrackingTypeModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "trackingtype",
                element: <ManageTable/>,
            }]
        }
    ]
};