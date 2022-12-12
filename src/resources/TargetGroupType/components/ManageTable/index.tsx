import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/TargetGroupType/configs/resourceSchema"
import {useData} from "@resources/TargetGroupType/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"TargetGroupType"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
};
