import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "@store";
import {toggleNoticedPartnerProgram} from "@slices/noticedPartnerPrograms";

export const useNoticedPartnerProgram = () => {

    const [showNoticedPartnerPrograms, setShowNoticedPartnerPrograms] = useState(false);

    const {items: noticedPartnerPrograms} = useSelector((state) => state.noticedPartnerPrograms);

    const dispatch = useDispatch();

    const dipatchToggleNoticedPartnerProgram = (item: any) => {
        dispatch(toggleNoticedPartnerProgram(item));
    };

    const handleCloseNoticedPartnerProgramsModal = () => {
        setShowNoticedPartnerPrograms(false);
    };

    return {
        showNoticedPartnerPrograms,
        setShowNoticedPartnerPrograms,
        noticedPartnerPrograms,
        handleCloseNoticedPartnerProgramsModal,
        dipatchToggleNoticedPartnerProgram
    }
};
