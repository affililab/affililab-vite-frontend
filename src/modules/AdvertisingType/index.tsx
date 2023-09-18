import ManageTable from "./pages/ManageTable";

export const AdvertisingTypeModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "advertisingtype",
                element: <ManageTable/>,
            }]
        }
    ]
};