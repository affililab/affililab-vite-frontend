import {Card, Container, MotivationIllustration, Page, useSettings} from "my-lib";
// import { ComingSoon } from "@components/ComingSoon"
import {UsersList} from "../components/UsersLst"
import { ManageTable } from "@resources/User/components/ManageTable";

export default function () {
    const {themeStretch} = useSettings();

    return <Page sx={{ height: '100%', display: "flex", flexDirection: "column" }} title="Dashboard">
        {/*<UsersList/>*/}
        <ManageTable />
        {/*<Container maxWidth={themeStretch ? 'xl' : 'xxl'} sx={{ height: '100%', display: "flex", flexDirection: "column" }}>*/}
        {/*</Container>*/}
    </Page>
}