import OverviewPage from "./pages/Overview"
import ItemPage from "./pages/Item"
export const CampaignModule = {
    path: "campaign",
    children: [
        {
          index: true,
          element: <OverviewPage />,
        },
        {
            path: ":campaignId",
            element: <ItemPage />,
        }
    ]
};