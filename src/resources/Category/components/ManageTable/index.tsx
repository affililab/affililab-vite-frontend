import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/Category/configs/resourceSchema"
import {useData} from "@resources/Category/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"Category"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}