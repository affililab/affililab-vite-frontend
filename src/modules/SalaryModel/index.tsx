import ManageTable from "./pages/ManageTable";

export const SalaryModelModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "salarymodel",
                element: <ManageTable/>,
            }]
        }
    ]
};