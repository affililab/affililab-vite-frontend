import {Yup} from "my-lib";
import {GET_ALL_TARGETGROUPTYPES} from "@schemas/targetGroupType";

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
            key: "title",
            formConfig: {
                fieldConfig: {
                    label: "Title"
                },
                type: "textField",
                defaultValue: '',
                validation: Yup.string().required('Title is required'),
            },
            showInTable: true,
            tableConfig: {
                type: "text",
                label: "Title",
                cellConfig: {
                    alignRight: false
                }
            }
        },

        {
            key: "description",
            formConfig: {
                fieldConfig: {
                    label: "Description"
                },
                type: "editor",
                defaultValue: '',
                validation: Yup.string()
            },
            showInTable: true,
            tableConfig: {
                type: "text",
                label: "Description",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "targetGroupType",
            formConfig: {
                fieldConfig: {
                    label: "Group",
                    optionsQuery: GET_ALL_TARGETGROUPTYPES,
                    optionsQueryName: "getAllTargetGroupTypes"
                },
                type: "relationSingle",
                defaultValue: null,
                validation: Yup.string(),
            },
            showInTable: true,
            tableConfig: {
                type: "relationSingle",
                label: "Type",
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