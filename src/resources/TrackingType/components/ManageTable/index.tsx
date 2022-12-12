import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/TrackingType/configs/resourceSchema"
import {useData} from "@resources/TrackingType/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"TrackingType"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}