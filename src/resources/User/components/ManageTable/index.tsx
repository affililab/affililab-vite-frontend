import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/User/configs/resourceSchema"
import {useData} from "@resources/User/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"User"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}