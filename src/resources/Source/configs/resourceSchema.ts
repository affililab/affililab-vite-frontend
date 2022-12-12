import {Yup} from "my-lib";

export const resourceSchema = () => {
    return [
        {
            key: "cover",
            formConfig: {
                defaultValue: null,
                type: "image",
                validation: Yup.mixed(),
                fieldConfig: {
                    label: "Cover",
                },
            },
            showInTable: true,
            tableConfig: {
                type: "image",
                label: "Cover",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "smallLogo",
            formConfig: {
                defaultValue: null,
                type: "image",
                validation: Yup.mixed(),
                fieldConfig: {
                    label: "Cover",
                },
            },
            showInTable: true,
            tableConfig: {
                type: "image",
                label: "Small Logo",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "source",
            formConfig: {
                fieldConfig: {
                    label: "Source"
                },
                type: "textField",
                defaultValue: '',
                validation: Yup.string().required('Source is required'),
            },
            showInTable: true,
            tableConfig: {
                type: "text",
                label: "Source",
                cellConfig: {
                    alignRight: false
                }
            }
        },

        {
            key: "approved",
            formConfig: {
                fieldConfig: {
                    label: "approved"
                },
                type: "switch",
                defaultValue: false,
                validation: Yup.boolean().nullable(),
            },
            showInTable: true,
            tableConfig: {
                type: "approved",
                label: "approved",
                cellConfig: {
                    alignRight: false
                }
            }
        }
    ];
}