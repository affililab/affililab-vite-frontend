import React from "react";
import {
    useSettings,
    Page,
    Container
} from "my-lib";
import { OverviewItems } from "@resources/ELearningResources/components/OverviewItems"


export default function () {
    const {themeStretch} = useSettings();

    return <Page title="Dashboard" sx={{p: 0, height: "100%"}}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
            <OverviewItems />
        </Container>
    </Page>
}