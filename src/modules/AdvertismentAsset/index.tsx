import ManageTable from "./pages/ManageTable";

export const AdvertismentAssetModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "advertismentAsset",
                element: <ManageTable/>,
            }]
        }
    ]
};