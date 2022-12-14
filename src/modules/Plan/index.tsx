import ManageTable from "./pages/ManageTable";

export const PlanModule = {
    path: "support",
    children: [{
        path: "plan",
        element: <ManageTable />
    }]
};