import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/Source/configs/resourceSchema"
import {useData} from "@resources/Source/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"Source"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}