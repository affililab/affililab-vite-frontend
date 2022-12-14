import ManageTable from "./pages/ManageTable";

export const CampaignSupportCategoryModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "campaignsupportcategory",
                element: <ManageTable/>,
            }]
        }
    ]
};