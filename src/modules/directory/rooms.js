const Room = (office, rowspan, phoneI, phoneE, userP, adminP) => {
    return {office, rowspan, phoneI, phoneE, userP, adminP};
};

const offices = [
    'Newcastle',
    'Edinburgh',
    'Bristol',
    'London'
];

export default [
    new Room(offices[0], 4, '600', '441914060226', '004400', '006600'),
    new Room(offices[0], 0, '601', '', '114411', '116611'),
    new Room(offices[0], 0, '602', '', '224422', '226622'),
    new Room(offices[0], 0, '603', '', '334433', '336633'),
    new Room(offices[1], 4, '610', '441312020340', '002200', '008800'),
    new Room(offices[1], 0, '611', '', '112211', '118811'),
    new Room(offices[1], 0, '612', '', '222222', '228822'),
    new Room(offices[1], 0, '613', '', '332233', '338833'),
    new Room(offices[2], 4, '820', '441172310010', '003300', '005500'),
    new Room(offices[2], 0, '821', '', '113311', '115511'),
    new Room(offices[2], 0, '822', '', '223322', '225522'),
    new Room(offices[2], 0, '823', '', '333333', '335533'),
    new Room(offices[3], 4, '825', '442033583343', '553355', '555555'),
    new Room(offices[3], 0, '826', '', '663366', '665566'),
    new Room(offices[3], 0, '827', '', '773377', '775577'),
    new Room(offices[3], 0, '828', '', '883388', '885588')
];