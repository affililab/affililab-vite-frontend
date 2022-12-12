import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/CampaignSupportCategory/configs/resourceSchema"
import {useData} from "@resources/CampaignSupportCategory/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"CampaignSupportCategory"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}