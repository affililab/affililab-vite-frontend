import {CREATE_ELEARNINGRESOURCE, UPDATE_ELEARNINGRESOURCE} from "@schemas/eLearningResources";
import {EditCreateForm} from "@components/EditCreateForm";
import {resourceSchema} from "../../configs/resourceSchema"

export const Form = ({refetchingOptions = {}, isEdit, item, finishCallBack}) => <EditCreateForm resourceSchema={resourceSchema()} refetchingOptions={refetchingOptions} isEdit={isEdit} item={item} finishCallBack={finishCallBack} createMutation={CREATE_ELEARNINGRESOURCE} editMutation={UPDATE_ELEARNINGRESOURCE} />
