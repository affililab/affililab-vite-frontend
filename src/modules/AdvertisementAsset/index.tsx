import ManageTable from "./pages/ManageTable";

export const AdvertisementAssetModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "advertisementAsset",
                element: <ManageTable/>,
            }]
        }
    ]
};