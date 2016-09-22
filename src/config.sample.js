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
        interval: 100000,
        limit: 10,
        voipservers: []
    }
};
