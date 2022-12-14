import ManageTable from "./pages/ManageTable";

export const CategoryModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "category",
                element: <ManageTable/>,
            }]
        }
    ]
};