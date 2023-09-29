import { useMutation } from "@apollo/client";
import { REGISTER_PRODUCT_INTERACTION } from "@schemas/user";

export type InteractionType = 'viewed' | 'noticed' | 'unnoticed' | 'campaign_added' | 'removed_from_campaign';

export const useProductInteraction = () => {
    const [registerProductInteraction] = useMutation(REGISTER_PRODUCT_INTERACTION);
    
    const registerInteraction = async (id: string, interactionType: InteractionType) => {
        return registerProductInteraction({
            variables: {
                id,
                interactionType
            }
        });
    };

    return {
        registerInteraction
    }
};