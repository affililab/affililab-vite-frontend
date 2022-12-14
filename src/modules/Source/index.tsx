import ManageTable from "./pages/ManageTable";

export const SourceModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "source",
                element: <ManageTable/>,
            }]
        }
    ]
};