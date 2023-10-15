import OverviewPage from "./pages/overview";
import ManageTable from "./pages/ManageTable";
import { Router as ReactRouter } from "my-lib";
const { Navigate } = ReactRouter

export const ProductsModule = {
    path: "",
    children: [{
        path: "products",
        children: [
            {
                index: true,
                // element: <Navigate to="/" replace />,
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