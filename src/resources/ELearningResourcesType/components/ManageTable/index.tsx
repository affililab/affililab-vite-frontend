import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/ELearningResourcesType/configs/resourceSchema"
import {useData} from "@resources/ELearningResourcesType/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"ELearningResourcesType"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
};