import {useState} from "react";

export const useAddToCampaign = () => {
    const [showAddToCampaignModal, setShowAddToCampaignModal] = useState(false);
    const [addToCampaignItems, setAddToCampaignItems] = useState<string[]>([]);

    return {
        showAddToCampaignModal,
        setShowAddToCampaignModal,
        addToCampaignItems,
        setAddToCampaignItems
    }
};