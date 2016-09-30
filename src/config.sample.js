export const config = {
    slack: {
        botuser: 'intranet-bot'
    },
    confluence: {
        basicAuth: 'Base64 Username and Password Here',
        baseUrl: 'https://scottlogic.atlassian.net/wiki',
        limit: 10
    },
    activeDirectory: {
        interval: 86400000,
        limit: 10,
        pageId: null,
        phoneHeaders: [
            'Office',
            'Name',
            'Ext.',
            'DDI'
        ],
        roomHeaders: [
            'Office',
            'Ext.',
            'DDI',
            'User PIN',
            'Admin PIN'
        ],
        voipservers: []
    }
};
