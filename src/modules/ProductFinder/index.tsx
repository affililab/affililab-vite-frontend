import { IndexPage } from "./pages"
import {Router as ReactRouter} from "my-lib"

const { Navigate } = ReactRouter;
export const ProductFinderModule = {
    path: "",
    children: [
        {
            index: true,
            element: <Navigate to="partnerPrograms" replace />,
        },
        {
            path: ":tab",
            element: <IndexPage/>,
        },
    ]
};