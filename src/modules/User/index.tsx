import ManageTable from "./pages/ManageTable"

export const UserModule = {
    path: "admin",
    children: [{
        path: "users",
        element: <ManageTable />
    }]
};