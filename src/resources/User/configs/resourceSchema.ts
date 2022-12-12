import {Yup} from "my-lib";
import {GET_ALL_ROLES} from "@schemas/role";

export const resourceSchema = () => {
    return [
        {
            key: "avatar",
            formConfig: {
                defaultValue: null,
                type: "avatar",
                validation: Yup.object().nullable(),
                fieldConfig: {
                    type: "avatar",
                    label: "Avatar"
                },
            },
            showInTable: false,
        },
        {
            key: "name",
            formConfig: {
                fieldConfig: {
                    label: "Name"
                },
                type: "textField",
                defaultValue: '',
                validation: Yup.string().required('Title is required'),
            },
            showInTable: true,
            tableConfig: {
                type: "avatarName",
                label: "Name",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "email",
            formConfig: {
                fieldConfig: {
                    label: "E-Mail"
                },
                type: "textField",
                defaultValue: '',
                validation: Yup.string().required('Email is required'),
            },
            showInTable: true,
            tableConfig: {
                type: "text",
                label: "E-Mail",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "verifiedAt",
            formConfig: {
                fieldConfig: {
                    label: "Verified"
                },
                type: "date",
                defaultValue: '',
                validation: Yup.date().nullable(),
            },
            showInTable: true,
            tableConfig: {
                type: "verified",
                label: "Verified",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "status",
            formConfig: {
                fieldConfig: {
                    label: "Status",
                    options: {
                        1: "active",
                        2: "inactive"
                    }
                },
                type: "options",
                defaultValue: '',
                validation: Yup.string(),
            },
            showInTable: true,
            tableConfig: {
                type: "options",
                label: "Status",
                cellTypeParams: {
                    options: {
                        1: {
                            color: "success",
                            label: "active"
                        },
                        2: {
                            color: "warning",
                            label: "inactive"
                        }
                    },
                },
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "role",
            formConfig: {
                fieldConfig: {
                    label: "Roles",
                    optionsQuery: GET_ALL_ROLES,
                    optionsQueryName: "getAllRoles"
                },
                type: "relationSingle",
                defaultValue: null,
                validation: Yup.string(),
            },
            showInTable: true,
            tableConfig: {
                type: "relationSingle",
                label: "Role",
                cellConfig: {
                    alignRight: false
                }
            }
        },
        {
            key: "password",
            formConfig: {
                type: "password",
                defaultValue: null,
                validation: Yup.string().min(6, 'Password must be at least 6 characters'),
                fieldConfig: {
                    placeholder: "password"
                }
            },
            showInTable: false
        },
        {
            key: "passwordConfirmation",
            formConfig: {
                type: "password",
                defaultValue: null,
                validation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
                fieldConfig: {
                    placeholder: "confirm password"
                }
            },
            showInTable: false
        },
    ];
}