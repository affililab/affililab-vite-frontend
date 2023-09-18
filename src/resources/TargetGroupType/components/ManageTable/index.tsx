import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/TargetGroupType/configs/resourceSchema"
import {useData} from "@resources/TargetGroupType/hooks/useData";
import React, {useContext, useEffect} from "react";
import {HeaderItemsContext, SearchInput} from "my-lib";

export const ManageTable = () => {
    const resourceData = useData();

    const { setCenterItems } = useContext(HeaderItemsContext);

    useEffect(() => {
        setCenterItems([<SearchInput placeholder={"Suche Target Group Types ..."} searchValue={resourceData.searchValue} updateInput={resourceData.setSearchValue} key={1} />]);
    }, []);

    return <>
        <CommonManageTable resourceName={"TargetGroupType"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
};
