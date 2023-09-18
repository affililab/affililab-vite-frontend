import {Yup} from "my-lib";
import {GET_ALL_CAMPAIGNSUPPORTCATEGORIES} from "@schemas/campaignSupportCategory";
import {GET_ALL_TOOLTYPES} from "@schemas/toolType";

export const resourceSchema = () => {
    return [
        {
            key: "cover",
            formConfig: {
                defaultValue: null,
                type: "image",
                visibility: "hidden",
                validation: Yup.object().nullable(),
                fieldConfig: {
                    label: "Cover"
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
            key: "images",
            formConfig: {
                defaultValue: [],
                type: "images",
                validation: Yup.array(),
                fieldConfig: {
                    label: "Images",
                },
            },
            showInTable: false
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
            key: "link",
            formConfig: {
                fieldConfig: {
                    label: "Link"
                },
                type: "textField",
                defaultValue: '',
                validation: Yup.string().required('Link is required'),
            },
            showInTable: true,
            tableConfig: {
                type: "link",
                label: "Link",
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
            showInTable: false
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
        // {
        //     key: "toolType",
        //     formConfig: {
        //         fieldConfig: {
        //             label: "Type",
        //             optionsQuery: GET_ALL_TOOLTYPES,
        //             optionsQueryName: "getallToolTypes"
        //         },
        //         type: "relation",
        //         defaultValue: [],
        //         validation: Yup.array().of(Yup.string()),
        //     },
        //     showInTable: true,
        //     tableConfig: {
        //         type: "toolType",
        //         label: "Type",
        //         cellConfig: {
        //             alignRight: false
        //         }
        //     }
        // },
        {
            key: "categories",
            formConfig: {
                fieldConfig: {
                    label: "Categories",
                    optionsQuery: GET_ALL_CAMPAIGNSUPPORTCATEGORIES,
                    optionsQueryName: "getAllCampaignSupportCategories"
                },
                type: "relation",
                defaultValue: [],
                validation: Yup.array().of(Yup.string()),
            },
            showInTable: true,
            tableConfig: {
                type: "category",
                label: "Categories",
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
                            key: "icon",
                            label: "Icon",
                            type: "icon"
                        },
                        {
                            key: "title",
                            label: "Title",
                            type: "text"
                        },
                        {
                            key: "description",
                            label: "description",
                            type: "text"
                        },
                        {
                            key: "link",
                            label: "link",
                            type: "link",
                        }
                    ]
                },
                type: "dynamic",
                defaultValue: [],
                validation: Yup.array(),
            },
            showInTable: false
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
        },
        /* PLOP_INJECT_RESOURCE_FIELD */
        {
            key: "logo",
            formConfig: {
                fieldConfig: {
                    label: "Logo"
                },
                type: "image",
                defaultValue: '',
                validation: Yup.string(),
            },
            showInTable: true,
            tableConfig: {
                type: "image",
                label: "Logo",
                cellConfig: {
                    alignRight: false
                }
            }
        },

    ];
}