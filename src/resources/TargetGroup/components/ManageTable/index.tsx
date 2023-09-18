import React, {FC, useContext, useEffect} from "react";
import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/TargetGroup/configs/resourceSchema"
import {useData} from "@resources/TargetGroup/hooks/useData";
import {HeaderItemsContext, SearchInput} from "my-lib";

export const ManageTable: FC<any> = () => {
    const resourceData = useData();

    const { setCenterItems } = useContext(HeaderItemsContext);

    useEffect(() => {
        setCenterItems([<SearchInput placeholder={"Suche Target Groups ..."} searchValue={resourceData.searchValue} updateInput={resourceData.setSearchValue} key={1} />]);
    }, []);

    return <>
        <CommonManageTable resourceName={"TargetGroup"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}