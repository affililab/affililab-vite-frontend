import {FC, useState} from "react";

export const useExternalLink = (setCurrentPartnerProgram = (partnerProgram) => {}) => {

    const [showExternalLinkModal, setShowExternalLinkModal] = useState(false);
    const [currentPartnerProgramLink, setCurrentPartnerProgramLink] = useState('');
    const [showNoticedPartnerPrograms, setShowNoticedPartnerPrograms] = useState(false);

    const toggleExternalLink = (partnerProgram, url) => {
        setCurrentPartnerProgram(partnerProgram);
        setCurrentPartnerProgramLink(url);
        setShowExternalLinkModal(!showExternalLinkModal);
    }

    return {
        showNoticedPartnerPrograms,
        setShowNoticedPartnerPrograms,
        showExternalLinkModal,
        toggleExternalLink,
        setShowExternalLinkModal,
        currentPartnerProgramLink
    }
}