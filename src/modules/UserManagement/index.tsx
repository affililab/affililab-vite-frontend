import UserList from "./pages/userList"

export const UserManagementModule = {
    path: "admin",
    children: [{
        path: "users",
        element: <UserList />
    }]
};