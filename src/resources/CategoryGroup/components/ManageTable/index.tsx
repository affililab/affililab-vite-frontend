import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/CategoryGroup/configs/resourceSchema"
import {useData} from "@resources/CategoryGroup/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"CategoryGroup"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}