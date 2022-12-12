import {useMutation} from "@apollo/client";
import {CREATE_SAVED_FILTER, UPDATE_SAVED_FILTER} from "@schemas/savedFilters";

export const useSaveFilter = (isEdit: boolean) => {
    return useMutation(isEdit ? UPDATE_SAVED_FILTER : CREATE_SAVED_FILTER);
};