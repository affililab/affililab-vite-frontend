import OverviewPage from "./pages/Overview";
import ManageTable from "./pages/ManageTable";

export const ELearningModule = {
    path: "",
    children: [{
        path: "e-learning",
        children: [{
            index: true,
            element: <OverviewPage />,
        }]
    },
        {
            path: "support",
            children: [{
                path: "e-learning",
                element: <ManageTable />,
            }]
        }
    ]
};