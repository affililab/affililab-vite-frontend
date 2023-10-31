import {useDispatch, useSelector} from "@store";
import {closeWelcomeModal} from "@slices/welcomeModal";
import {finishFirstWizard} from "@slices/firstWizardModal";

export const useWelcomeModal = () => {
    const dispatch = useDispatch();

    const {welcomeDone} = useSelector((state) => state.welcomeModal);
    const {firstWizardDone} = useSelector((state) => state.firstWizardModal);

    const handleCloseWelcomeModal = () => {
        dispatch(closeWelcomeModal());
    };

    const handleFinishFirstWizard = () => {
        dispatch(finishFirstWizard());
    };

    return {
        firstWizardDone,
        welcomeDone,
        handleCloseWelcomeModal,
        handleFinishFirstWizard
    }
}