import OverviewPage from "./pages/overview"
import ManageTable from "./pages/ManageTable"

export const ToolsModule = {
    path: "",
    children: [{
        path: "tools",
        children: [{
            index: true,
            element: <OverviewPage />,
        }]
    },
    {
        path: "support",
        children: [{
            path: "tools",
            element: <ManageTable />,
        }]
    }]
};