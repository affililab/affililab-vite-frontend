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
            key: "icon",
            formConfig: {
                fieldConfig: {
                    label: "Icon"
                },
                type: "textField",
                defaultValue: '',
                validation: Yup.string(),
            },
            showInTable: true,
            tableConfig: {
                type: "icon",
                label: "Icon",
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
            key: "shortDescription",
            formConfig: {
                fieldConfig: {
                    label: "shortDescription"
                },
                type: "textField",
                defaultValue: '',
                validation: Yup.string()
            },
            showInTable: true,
            tableConfig: {
                type: "text",
                label: "shortDescription",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        /* PLOP_INJECT_RESOURCE_FIELD */
    ];
}