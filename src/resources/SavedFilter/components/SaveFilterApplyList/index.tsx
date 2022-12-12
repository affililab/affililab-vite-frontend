import { SavedFiltersTable } from "@resources/SavedFilter/components/SavedFiltersTable"

export const SaveFilterApplyList = ({applyFilter = () => {}}) => {
    return <SavedFiltersTable embedded applyFilter={applyFilter} />
}