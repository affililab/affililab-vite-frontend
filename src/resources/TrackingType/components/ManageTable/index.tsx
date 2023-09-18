import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/TrackingType/configs/resourceSchema"
import {useData} from "@resources/TrackingType/hooks/useData";
import React, {useContext, useEffect} from "react";
import {HeaderItemsContext, SearchInput} from "my-lib";

export const ManageTable = () => {
    const resourceData = useData();

    const { setCenterItems } = useContext(HeaderItemsContext);

    useEffect(() => {
        setCenterItems([<SearchInput placeholder={"Suche Tracking Types ..."} searchValue={resourceData.searchValue} updateInput={resourceData.setSearchValue} key={1} />]);
    }, []);

    return <>
        <CommonManageTable resourceName={"TrackingType"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}