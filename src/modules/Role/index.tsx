import ManageTable from "./pages";

export const RoleModule = {
    path: "",
    children: [
        {
            path: "admin",
            children: [{
                path: "role",
                element: <ManageTable/>,
            }]
        }
    ]
};