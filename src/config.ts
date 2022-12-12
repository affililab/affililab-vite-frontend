export type configType = {
    apiURL: string | undefined;
    filesEndpoint: string | undefined;
    previewFilesEndpoint: string | undefined;
};

export const partnerProgramsBackend: configType = {
    apiURL: import.meta.env.VITE_APP_AFFILILAB_BACKEND_SERVICE,
    filesEndpoint: process.env.VITE_APP_AFFILILAB_BACKEND_SERVICE_FILES,
    previewFilesEndpoint: process.env.VITE_APP_AFFILILAB_BACKEND_SERVICE_FILES_PREVIEW
};