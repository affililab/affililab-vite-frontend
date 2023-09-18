import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/SalaryModel/configs/resourceSchema"
import {useData} from "@resources/SalaryModel/hooks/useData";
import React, {useContext, useEffect} from "react";
import {HeaderItemsContext, SearchInput} from "my-lib";

export const ManageTable = () => {
    const resourceData = useData();

    const { setCenterItems } = useContext(HeaderItemsContext);

    useEffect(() => {
        setCenterItems([<SearchInput placeholder={"Suche Salary Models ..."} searchValue={resourceData.searchValue} updateInput={resourceData.setSearchValue} key={1} />]);
    }, []);

    return <>
        <CommonManageTable resourceName={"SalaryModel"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}