import {Yup} from "my-lib";

export const resourceSchema = () => {
    return [
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
        {
            key: "monthlyPrice",
            formConfig: {
                fieldConfig: {
                    label: "monthlyPrice"
                },
                type: "currency",
                defaultValue: '',
                validation: Yup.string()
            },
            showInTable: true,
            tableConfig: {
                type: "price",
                label: "Monatlicher Preis",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "yearlyPrice",
            formConfig: {
                fieldConfig: {
                    label: "yearlyPrice"
                },
                type: "currency",
                defaultValue: '',
                validation: Yup.string()
            },
            showInTable: true,
            tableConfig: {
                type: "price",
                label: "Jährlicher Preis",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "features",
            formConfig: {
                fieldConfig: {
                    label: "Features",
                    elements: [
                        {
                            key: "amount",
                            label: "Anzahl",
                            type: "number"
                        },
                        {
                            key: "title",
                            label: "Title",
                            type: "text"
                        },
                        {
                            key: "disabled",
                            label: "Disabled",
                            type: "switch"
                        }
                    ]
                },
                type: "dynamic",
                defaultValue: [],
                validation: Yup.array(),
            },
            showInTable: false
        },
        /* PLOP_INJECT_RESOURCE_FIELD */
    ];
}