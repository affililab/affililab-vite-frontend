import {Router as ReactRouter, useAuth} from "my-lib";
import navConfig from "@routes/NavConfig";
const {Navigate} = ReactRouter;


export const Index = () => {
    const {user} = useAuth();
    const accessibleNavConfig = navConfig.filter((navItem) => navItem.roles.includes(user?.role?.title ?? "visitor"));

    // navigate4 to first item in navconfig list
    return <Navigate to={accessibleNavConfig[0].items[0].path} replace/>
};