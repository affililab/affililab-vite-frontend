import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/Role/configs/resourceSchema"
import {useData} from "@resources/Role/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"Role"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}