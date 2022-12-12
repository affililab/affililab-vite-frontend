import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/AdvertisingType/configs/resourceSchema"
import {useData} from "@resources/AdvertisingType/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"AdvertisingType"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}