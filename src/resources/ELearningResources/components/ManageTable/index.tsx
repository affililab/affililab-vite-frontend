import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/ELearningResources/configs/resourceSchema"
import {useELearningResourceData} from "@resources/ELearningResources/hook/useELearningResourceData";
import React, {useContext, useEffect} from "react";
import {HeaderItemsContext, SearchInput} from "my-lib";

export const ManageTable = () => {
    const resourceData = useELearningResourceData();

    const { setCenterItems } = useContext(HeaderItemsContext);

    useEffect(() => {
        setCenterItems([<SearchInput placeholder={"Suche E-Learning Resources ..."} searchValue={resourceData.searchValue} updateInput={resourceData.setSearchValue} key={1} />]);
    }, []);

    return <CommonManageTable resourceName={"E-Learning-Resource"} resourceData={resourceData} resourceSchema={resourceSchema()} />
}