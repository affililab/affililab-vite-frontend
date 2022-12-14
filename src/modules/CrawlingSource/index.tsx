import ManageTable from "./pages/ManageTable";

export const CrawlingSourceModule = {
    path: "",
    children: [
        {
            path: "support",
            children: [{
                path: "crawlingsource",
                element: <ManageTable/>,
            }]
        }
    ]
};