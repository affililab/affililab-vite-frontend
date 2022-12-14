import ManageTable from "./pages/ManageTable";

export const ELearningResourcesTypeModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "elearningresourcestype",
                element: <ManageTable/>,
            }]
        }
    ]
};