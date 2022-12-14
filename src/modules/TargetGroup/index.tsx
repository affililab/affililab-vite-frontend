import ManageTable from "./pages/ManageTable";

export const TargetGroupModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "targetgroup",
                element: <ManageTable/>,
            }]
        }
    ]
};