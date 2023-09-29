import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "@store";
import {toggleNoticedPartnerProgram} from "@slices/noticedPartnerPrograms";
import { InteractionType, useProductInteraction } from "@resources/User/hooks/useProductInteraction";

export const useNoticedPartnerProgram = () => {

    const { registerInteraction } = useProductInteraction();

    const [showNoticedPartnerPrograms, setShowNoticedPartnerPrograms] = useState(false);

    const {items: noticedPartnerPrograms} = useSelector((state) => state.noticedPartnerPrograms);

    const dispatch = useDispatch();

    const dipatchToggleNoticedPartnerProgram = (item: any) => {
        const noticed = noticedPartnerPrograms.find((noticedPartnerProgram: any) => noticedPartnerProgram.id === item.id);
        const interactionType : InteractionType = noticed ? "unnoticed" : "noticed";
        registerInteraction(item.id, interactionType);
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
