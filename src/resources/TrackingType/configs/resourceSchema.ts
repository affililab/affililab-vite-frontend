import {Yup} from "my-lib";

export const resourceSchema = () => [
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