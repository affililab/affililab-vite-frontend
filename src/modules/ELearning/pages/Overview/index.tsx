import React from "react";
import {
    useSettings,
    Page,
    Container
} from "my-lib";
import { OverviewItems } from "@resources/ELearningResources/components/OverviewItems"


export default function () {
    const {themeStretch} = useSettings();

    return <Page title="E Learning">
            <OverviewItems />
    </Page>
}