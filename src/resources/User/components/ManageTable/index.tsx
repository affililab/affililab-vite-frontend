import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/User/configs/resourceSchema"
import {useData} from "@resources/User/hooks/useData";
import React, {useContext, useEffect} from "react";
import {HeaderItemsContext, SearchInput} from "my-lib";

export const ManageTable = () => {
    const resourceData = useData();

    const { setCenterItems } = useContext(HeaderItemsContext);

    useEffect(() => {
        setCenterItems([<SearchInput placeholder={"Suche User ..."} searchValue={resourceData.searchValue} updateInput={resourceData.setSearchValue} key={1} />]);
    }, []);

    return <>
        <CommonManageTable resourceName={"User"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}