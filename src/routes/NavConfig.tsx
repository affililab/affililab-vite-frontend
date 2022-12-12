import React from 'react';
// components
import {Icon, Label} from 'my-lib';
import {PATH_APP} from "./paths";

const getIcon = (name: string) => <Icon icon={name}/>;

const ICONS = {
    dashboard: getIcon('carbon:dashboard'),
    campaign: getIcon('tabler:speakerphone'),
    tools: getIcon('clarity:tools-line'),
    products: getIcon('tabler:package'),
    eLearning: getIcon('bx:movie-play'),
    savedFilters: getIcon('tabler:filter'),
    analytics: getIcon('tabler:device-analytics'),
    userManagement: getIcon('tabler:users'),
    tickets: getIcon('tabler:layout-list'),
    partnerProgramRequests: getIcon('tabler:checks'),
    events: getIcon('bi:calendar-event'),
    /* PLOP_INJECT_TYPE_ICON_ITEM */
    plan: getIcon('material-symbols:payments-outline'),
    advertisingtype: getIcon('fluent:megaphone-loud-16-filled'),
    targetGroupType: getIcon('tabler:category-2'),
    categoryGroup: getIcon('clarity:node-group-line'),
    campaignSupportCategory: getIcon('bx:category'),
    user: getIcon('tabler:users'),
    role: getIcon('carbon:user-role'),
    salaryModel: getIcon('akar-icons:money'),
    targetGroup: getIcon('fluent:target-arrow-16-filled'),
    category: getIcon('dashicons:screenoptions'),
    trackingType: getIcon('carbon:chart-area'),
    source: getIcon('mdi:relation-many-to-many'),
    eLearningResourcesType: getIcon('tabler:category-2'),
    crawlingSource: getIcon('akar-icons:link-chain'),
    advertismentAsset: getIcon('ri:advertisement-line'),
};

const navConfig = [
        // GENERAL
        // ----------------------------------------------------------------------
        {
            subheader: 'app',
            roles: ["user"],
            items: [
                {
                    title: 'dashboard', path: PATH_APP.general.dashboard, icon: ICONS.dashboard
                },
                {
                    title: 'campaign planner', path: PATH_APP.general.campaign, icon: ICONS.campaign
                },
                {
                    title: 'tools', path: PATH_APP.general.tools, icon: ICONS.tools
                },
                {
                    title: 'products', path: PATH_APP.general.products, icon: ICONS.products
                },
                {
                    title: 'e-learning', path: PATH_APP.general.eLearning, icon: ICONS.eLearning
                },
                {
                    title: 'saved filters', path: PATH_APP.general.savedFilter, icon: ICONS.savedFilters
                },
                {
                    title: 'events calendar', path: PATH_APP.general.events, icon: ICONS.events
                },
                /* PLOP_INJECT_TYPE_NAVCONFIG_USER_ITEMS */
            ],
        },
        {
            subheader: 'admin',
            roles: ["admin"],
            items: [
                // {
                //     title: 'analytics', path: PATH_APP.admin.analytics, icon: ICONS.analytics, info: (
                //         <Label variant="outlined" color="info">
                //             later #10
                //         </Label>
                //     )
                // },
                {
                    title: 'user management', path: PATH_APP.admin.userManagement, icon: ICONS.userManagement
                },
                {
                    title: 'role', path: PATH_APP.admin.role, icon: ICONS.role
                },
                {
                    title: 'plan', path: PATH_APP.support.plan, icon: ICONS.plan
                },
                /* PLOP_INJECT_TYPE_NAVCONFIG_ADMIN_ITEMS */
            ],
        },
        {
            subheader: 'contributor',
            roles: ["contributor", "admin"],
            items: [
                // {
                //     title: 'tickets', path: PATH_APP.support.tickets, icon: ICONS.tickets, info: (
                //         <Label variant="outlined" color="info">
                //             later #10
                //         </Label>
                //     )
                // },
                // {
                //     title: 'Product Requests',
                //     path: PATH_APP.support.partnerProgramRequests,
                //     icon: ICONS.partnerProgramRequests,
                //     info: (
                //         <Label variant="outlined" color="info">
                //             later #4
                //         </Label>
                //     )
                // },
                {
                    title: 'e-learning', path: PATH_APP.support.eLearning, icon: ICONS.eLearning,
                    children: [
                        {
                            title: 'items',
                            path: PATH_APP.support.eLearning,
                            icon: ICONS.eLearning
                        },
                        {
                            title: 'types',
                            path: PATH_APP.support.eLearningResourcesType,
                            icon: ICONS.eLearningResourcesType,
                        },
                    ]
                },
                {
                    title: 'tools', path: PATH_APP.support.tools, icon: ICONS.tools,
                },
                /* PLOP_INJECT_TYPE_NAVCONFIG_CONTRIBUTOR_ITEMS */
                {
                    title: 'advertisingtype', path: PATH_APP.support.advertisingtype, icon: ICONS.advertisingtype,
                },
                {
                    title: 'categories', path: PATH_APP.support.campaignSupportCategory, icon: ICONS.campaignSupportCategory,
                },
                {
                    title: 'targetgroup', path: PATH_APP.support.targetGroup, icon: ICONS.targetGroup,
                    children: [
                        {
                            title: 'items',
                            path: PATH_APP.support.targetGroup,
                            icon: ICONS.targetGroup
                        },
                        {
                            title: 'types', path: PATH_APP.support.targetGroupType, icon: ICONS.targetGroupType
                        },
                    ]
                },
                {
                    title: 'advertismentAsset',
                    path: PATH_APP.support.advertismentAsset,
                    icon: ICONS.advertismentAsset,
                },
                {
                    title: 'partnerprogramme',
                    path: PATH_APP.support.products,
                    icon: ICONS.products,
                    children: [
                        {
                            title: 'products', path: PATH_APP.support.products, icon: ICONS.products
                        },
                        {
                            title: 'categorygroup', path: PATH_APP.support.categoryGroup, icon: ICONS.categoryGroup
                        },
                        {
                            title: 'category',
                            path: PATH_APP.support.category,
                            icon: ICONS.category
                        },
                        {
                            title: 'crawlingsource', path: PATH_APP.support.crawlingSource, icon: ICONS.crawlingSource
                        },
                        {
                            title: 'trackingtype', path: PATH_APP.support.trackingType, icon: ICONS.trackingType
                        },
                        {
                            title: 'source', path: PATH_APP.support.source, icon: ICONS.source
                        },
                        {
                            title: 'salarymodel', path: PATH_APP.support.salaryModel, icon: ICONS.salaryModel
                        },
                    ],
                },
            ],
        }
    ]
;

export default navConfig;
