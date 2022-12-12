import {Yup} from "my-lib";
import {GET_ALL_CAMPAIGNSUPPORTCATEGORIES} from "@schemas/campaignSupportCategory";

export const resourceSchema = (toggleExternal = () => { alert("Implement toggle external link"); }) => [
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
            cellTypeParams: {
                toggleExternalLink: toggleExternal
            },
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
        key: "learnAssets",
        formConfig: {
            fieldConfig: {
                label: "What you learn",
                elements: [
                    {
                        key: "icon",
                        label: "Icon",
                        type: "text"
                    },
                    {
                        key: "title",
                        label: "Title",
                        type: "text"
                    },
                    {
                        key: "description",
                        label: "description",
                        type: "textarea"
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
    }
];