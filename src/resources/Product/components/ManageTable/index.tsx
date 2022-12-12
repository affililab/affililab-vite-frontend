import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/Product/configs/resourceSchema"
import {useData} from "@resources/Product/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"Products"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}