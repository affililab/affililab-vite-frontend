import ManageTable from "./pages/ManageTable";

export const TargetGroupTypeModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "targetgrouptype",
                element: <ManageTable/>,
            }]
        }
    ]
};