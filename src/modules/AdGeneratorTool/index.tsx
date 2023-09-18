import Generator from "./pages/Generator";

export const AdGeneratorTool = {
    path: "",
    children: [
        {
            path: "tools",
            children: [{
                path: "ad-generator",
                element: <Generator />,
            }]
        }
    ]
};