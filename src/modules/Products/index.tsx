import OverviewPage from "./pages/overview";
import ManageTable from "./pages/ManageTable";

export const ProductsModule = {
    path: "",
    children: [{
        path: "products",
        children: [
            {
                index: true,
                element: <OverviewPage />,
            },
            {
                path: ":savedFilterId",
                element: <OverviewPage />,
            }
        ]
    },
        {
            path: "support",
            children: [{
                path: "products",
                element: <ManageTable />,
            }]
        }
    ]
};