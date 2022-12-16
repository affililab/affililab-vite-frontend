import {Page, useSettings} from "my-lib";
import {SavedFiltersTable} from "@resources/SavedFilter/components/SavedFiltersTable"
import React from "react";

export default function () {
    return <>
        <Page title="Saved Filters Table">
                <SavedFiltersTable />
        </Page>
    </>
}