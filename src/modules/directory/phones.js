const Phone = (office, rowspan, record) => {
    return {
        office,
        rowspan,
        name: record.name,
        phoneI: record.phoneI,
        phoneE: record.phoneE
    };
};

export const phoneIds = [
    '516',
    '667',
    '668',
    '670',
    '533',
    '532',
    '647',
    '584',
    '582',
    '705',
    '716',
    '717',
    '718',
    '696'
];

export const phones = directory => {
    const offices = [
        'Newcastle',
        'Edinburgh',
        'Bristol',
        'London',
        'Projects'
    ];

    return [
        new Phone(offices[0], 5, { name: 'Main Line', phoneI: '', phoneE: '443331010020' }),
        new Phone(offices[0], 0, directory.find(record => record.username === '516')),
        new Phone(offices[0], 0, directory.find(record => record.username === '667')),
        new Phone(offices[0], 0, directory.find(record => record.username === '668')),
        new Phone(offices[0], 0, directory.find(record => record.username === '670')),
        new Phone(offices[1], 4, { name: 'Edinburgh Office', phoneI: '', phoneE: '441312028625' }),
        new Phone(offices[1], 0, directory.find(record => record.username === '533')),
        new Phone(offices[1], 0, directory.find(record => record.username === '532')),
        new Phone(offices[1], 0, directory.find(record => record.username === '647')),
        new Phone(offices[2], 6, directory.find(record => record.username === '584')),
        new Phone(offices[2], 0, directory.find(record => record.username === '582')),
        new Phone(offices[2], 0, directory.find(record => record.username === '705')),
        new Phone(offices[2], 0, directory.find(record => record.username === '716')),
        new Phone(offices[2], 0, directory.find(record => record.username === '717')),
        new Phone(offices[2], 0, directory.find(record => record.username === '718')),
        new Phone(offices[3], 1, directory.find(record => record.username === '696')),
        new Phone(offices[4], 3, { name: 'Recruitment', phoneI: '745', phoneE: '441915000724' }),
        new Phone(offices[4], 0, { name: 'Shinobi', phoneI: '', phoneE: '443331014500' }),
        new Phone(offices[4], 0, { name: 'Visiblox', phoneI: '', phoneE: '441316036326' })
    ];
}