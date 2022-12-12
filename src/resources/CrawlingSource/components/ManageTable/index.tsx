import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/CrawlingSource/configs/resourceSchema"
import {useData} from "@resources/CrawlingSource/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"CrawlingSource"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
};