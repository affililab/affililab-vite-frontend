import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/ELearningResources/configs/resourceSchema"
import {useELearningResourceData} from "@resources/ELearningResources/hook/useELearningResourceData";

export const ManageTable = () => {
    const resourceData = useELearningResourceData();
    return <CommonManageTable resourceName={"E-Learning-Resource"} resourceData={resourceData} resourceSchema={resourceSchema()} />
}