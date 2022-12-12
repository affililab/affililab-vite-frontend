import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/Plan/configs/resourceSchema"
import {useData} from "@resources/Plan/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"Plan"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
};