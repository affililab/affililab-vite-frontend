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
        <Page title="Tools">
            <OverviewItems />
        </Page>
    </>
}