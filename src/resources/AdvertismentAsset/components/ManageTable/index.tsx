import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/AdvertismentAsset/configs/resourceSchema"
import {useData} from "@resources/AdvertismentAsset/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"AdvertismentAsset"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}