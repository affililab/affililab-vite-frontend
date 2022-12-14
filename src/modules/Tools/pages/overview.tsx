import React from "react";
import {
    useSettings,
    Page,
    Container
} from "my-lib";
import {OverviewItems} from "@resources/Tools/components/OverviewItems";

export default function () {

    const {themeStretch} = useSettings();

    return <>
        <Page title="Dashboard">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <OverviewItems />
            </Container>
        </Page>
    </>
}