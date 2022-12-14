import ManageTable from "./pages/ManageTable";

export const CategoryGroupModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "categorygroup",
                element: <ManageTable/>,
            }]
        }
    ]
};