import {Yup} from "my-lib";
import {GET_ALL_SALARYMODELS} from "@schemas/salaryModel";
import {GET_ALL_CATEGORIES} from "@schemas/category";
import {GET_ALL_TARGETGROUPS} from "@schemas";

export const resourceSchema = () => {
    return [
        {
            key: "productImg",
            formConfig: {
                defaultValue: null,
                type: "image",
                validation: Yup.mixed(),
                fieldConfig: {
                    label: "ProductImg",
                },
            },
            showInTable: true,
            tableConfig: {
                type: "image",
                label: "ProductImg",
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
                validation: Yup.string().nullable()
            },
            showInTable: false,
            tableConfig: {
                type: "text",
                label: "Description",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "salesPageUrl",
            formConfig: {
                fieldConfig: {
                    label: "SalesPageUrl"
                },
                type: "textField",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "link",
                label: "SalesPageUrl",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "salespage",
            formConfig: {
                fieldConfig: {
                    label: "Salespage"
                },
                type: "textField",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "link",
                label: "Salespage",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "affiliateSupportURL",
            formConfig: {
                fieldConfig: {
                    label: "Affiliate Support URL"
                },
                type: "textField",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "link",
                label: "Affiliate Support URL",
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
                    optionsQuery: GET_ALL_CATEGORIES
                },
                type: "categories",
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
            key: "targetGroups",
            formConfig: {
                fieldConfig: {
                    label: "Target Groups",
                    optionsQuery: GET_ALL_TARGETGROUPS
                },
                type: "categories",
                defaultValue: [],
                validation: Yup.array().of(Yup.string()),
            },
            showInTable: true,
            tableConfig: {
                type: "category",
                label: "Target Groups",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "salaryModel",
            formConfig: {
                fieldConfig: {
                    label: "Salary Models",
                    optionsQuery: GET_ALL_SALARYMODELS,
                    optionsQueryName: 'getAllSalaryModels'
                },
                type: "relation",
                defaultValue: [],
                validation: Yup.array().of(Yup.string()),
            },
            showInTable: true,
            tableConfig: {
                type: "relation",
                label: "Salary Models",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        /* PLOP_INJECT_RESOURCE_FIELD */
        {
            key: "source",
            formConfig: {
                fieldConfig: {
                    label: "Source"
                },
                type: "textField",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "link",
                label: "Source",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "commissionInPercent",
            formConfig: {
                fieldConfig: {
                    label: "Commission %"
                },
                type: "percentage",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "percentage",
                label: "Commission %",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "commissionFixed",
            formConfig: {
                fieldConfig: {
                    label: "Commission €"
                },
                type: "currency",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "price",
                label: "Commission €",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "earningsPersSale",
            formConfig: {
                fieldConfig: {
                    label: "Earnings Per Sale"
                },
                type: "currency",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "price",
                label: "Earnings Per Sale",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "earningsPerCartVisitor",
            formConfig: {
                fieldConfig: {
                    label: "Earnings Per Cart Visitor"
                },
                type: "currency",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "price",
                label: "Earnings Per Cart Visitor",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "averageSalesPrice",
            formConfig: {
                fieldConfig: {
                    label: "Average Sales Price"
                },
                type: "currency",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "price",
                label: "Average Sales Price",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "performance",
            formConfig: {
                fieldConfig: {
                    label: "Performance"
                },
                type: "number",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "text",
                label: "Performance",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "salesPrestige",
            formConfig: {
                fieldConfig: {
                    label: "Sales Prestige"
                },
                type: "number",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "text",
                label: "Sales Prestige",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "trackingLifetime",
            formConfig: {
                fieldConfig: {
                    label: "Tracking Lifetime"
                },
                type: "number",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "text",
                label: "Tracking Lifetime",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "cartConversionInPercent",
            formConfig: {
                fieldConfig: {
                    label: "Cart Conversion %"
                },
                type: "percentage",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "percentage",
                label: "Cart Conversion %",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "directActivation",
            formConfig: {
                fieldConfig: {
                    label: "Direct Activation"
                },
                type: "switch",
                defaultValue: '',
                validation: Yup.boolean().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "active",
                label: "Direct Activation",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "vendor",
            formConfig: {
                fieldConfig: {
                    label: "Vendor"
                },
                type: "textField",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "text",
                label: "Vendor",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "created",
            formConfig: {
                fieldConfig: {
                    label: "Created"
                },
                type: "date",
                defaultValue: '',
                validation: Yup.string(),
            },
            showInTable: true,
            tableConfig: {
                type: "date",
                label: "Created",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "lastUpdated",
            formConfig: {
                fieldConfig: {
                    label: "Last Updated"
                },
                type: "date",
                defaultValue: '',
                validation: Yup.string().nullable()
            },
            showInTable: true,
            tableConfig: {
                type: "date",
                label: "Last Updated",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "createdAt",
            showInForm: false,
            formConfig: {
                type: "hidden"
            },
            showInTable: true,
            tableConfig: {
                type: "datetime",
                label: "Created AT",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "updatedAt",
            showInForm: false,
            formConfig: {
                type: "hidden"
            },
            showInTable: true,
            tableConfig: {
                type: "datetime",
                label: "Updated At",
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