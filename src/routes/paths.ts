const ROOTS_APP = '/';
const ROOTS_ADMIN = '/app/admin';
const ROOTS_SUPPORT = '/app/support';

function paths(root: string, sublink: string) {
    return `${root}${sublink}`;
}

export const PATH_APP = {
    user: {
        account: paths(ROOTS_APP, '/account')
        /* PLOP_INJECT_TYPE_NAVCONFIG_USER_ITEMS */
    },
    general: {
        dashboard: paths(ROOTS_APP, '/dashboard'),
        campaign: paths(ROOTS_APP, '/campaign'),
        tools: paths(ROOTS_APP, '/'),
        products: paths(ROOTS_APP, '/products'),
        eLearning: paths(ROOTS_APP, '/e-learning'),
        savedFilter: paths(ROOTS_APP, '/saved-filter'),
        events: paths(ROOTS_APP, '/events'),
        /* PLOP_INJECT_TYPE_PATHS_GENERAL_ITEMS */
    },
    admin: {
        analytics: paths(ROOTS_ADMIN, '/analytics'),
        userManagement: paths(ROOTS_ADMIN, '/users'),
        // userManagement: paths(ROOTS_APP, ''),
        role: paths(ROOTS_ADMIN, '/role'),
        /* PLOP_INJECT_TYPE_PATHS_ADMIN_ITEMS */
    },
    support: {
        tickets: paths(ROOTS_SUPPORT, '/tickets'),
        partnerProgramRequests: paths(ROOTS_SUPPORT, '/requests'),
        tools: paths(ROOTS_SUPPORT, '/tools'),
        products: paths(ROOTS_SUPPORT, '/products'),
        eLearning: paths(ROOTS_SUPPORT, '/e-learning'),
        /* PLOP_INJECT_TYPE_PATHS_SUPPORT_ITEMS */
        plan: paths(ROOTS_SUPPORT, '/plan'),
        advertisingtype: paths(ROOTS_SUPPORT, '/advertisingtype'),
        targetGroupType: paths(ROOTS_SUPPORT, '/targetgrouptype'),
        categoryGroup: paths(ROOTS_SUPPORT, '/categorygroup'),
        campaignSupportCategory: paths(ROOTS_SUPPORT, '/campaignsupportcategory'),
        salaryModel: paths(ROOTS_SUPPORT, '/salarymodel'),
        targetGroup: paths(ROOTS_SUPPORT, '/targetgroup'),
        category: paths(ROOTS_SUPPORT, '/category'),
        trackingType: paths(ROOTS_SUPPORT, '/trackingtype'),
        source: paths(ROOTS_SUPPORT, '/source'),
        eLearningResourcesType: paths(ROOTS_SUPPORT, '/elearningresourcestype'),
        crawlingSource: paths(ROOTS_SUPPORT, '/crawlingsource'),
        advertismentAsset: paths(ROOTS_SUPPORT, '/advertismentAsset')
    }
}