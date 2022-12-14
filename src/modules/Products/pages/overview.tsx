import React from "react"
import {Page} from "my-lib";
import {ProductsTable} from "@resources/Product/components/ProductsTable"


export default function () {
    return <Page title="Dashboard">
        <ProductsTable/>
    </Page>
}