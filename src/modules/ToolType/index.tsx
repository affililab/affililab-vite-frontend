import ManageTable from "./pages/ManageTable";

export const ToolTypeModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "tooltype",
                element: <ManageTable/>,
            }]
        }
    ]
};