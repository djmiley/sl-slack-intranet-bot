export const alphabeticalSorter = (a, b) => {
    return a.name < b.name ? -1 : (a.name > b.name) ? 1 : 0;
};

export const verticalColumnSort = columnLength => {
    return (a, b) => {
        console.log(a.index);
        console.log(b.index);
        // if (a.index >= columnLength * 3) {
        //     return 0;
        // }
        return a.index % columnLength === b.index % columnLength ?
            a.index - b.index :
            a.index % columnLength - b.index % columnLength;
    }
}

export const formatExternalPhone = phoneNumber => {
    if (!phoneNumber) {
        return ``;
    };
    const internationalisedNumber = phoneNumber[0] === '0' ? phoneNumber.replace('0', '44') : phoneNumber;
    const spacedNumber = internationalisedNumber[2] === '7' ?
        internationalisedNumber.match(/^(\d{2})(\d{4})(\d{3})(\d{3})$/) :
        internationalisedNumber.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
    return `+${spacedNumber[1]} ${spacedNumber[2]} ${spacedNumber[3]} ${spacedNumber[4]}`;
};

export const formatRecord = record => {
    return (`:telephone_receiver:\t${record.name}, Ext: ${record.phoneI}`) +
        (record.phoneE ? (`, DDI: ${formatExternalPhone(record.phoneE)}`) : (``));
};

export const formatRecords = records => {
    return records.length <= 0 ? 
        `I'm sorry, I can't find any phone user by that name.` :
        (records.length === 1) ?
        formatRecord(records[0]) :
        (`*_Here are the ${records.length} most relevant records_*\n\n`).concat(records
            .map(record => formatRecord(record))
            .join('\n')
        );
};