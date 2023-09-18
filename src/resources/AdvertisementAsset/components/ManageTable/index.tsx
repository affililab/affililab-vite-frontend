import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/AdvertisementAsset/configs/resourceSchema"
import {useData} from "@resources/AdvertisementAsset/hooks/useData";
import React, {useContext, useEffect} from "react";
import {HeaderItemsContext, SearchInput} from "my-lib";

export const ManageTable = () => {
    const resourceData = useData();

    const { setCenterItems } = useContext(HeaderItemsContext);

    useEffect(() => {
        setCenterItems([<SearchInput placeholder={"Suche Advertisement Asset ..."} searchValue={resourceData.searchValue} updateInput={resourceData.setSearchValue} key={1} />]);
    }, []);

    return <>
        <CommonManageTable resourceName={"AdvertisementAsset"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}