import { config } from '../config';
import fetch from 'node-fetch';

const Directory = () => {
    let directory = [];

    const fetchDirectory = () => {
        const options = {
            method: 'GET'
        };

        directory = [];

        config.activeDirectory.voipservers.forEach(voipserver => {
            fetch(`http://${voipserver}/prov/cgi-bin/directory.cgi`, options)
                .then(res => res.json())
                .then(res => directory = [...directory, ...res]);
        });

        setTimeout(fetchDirectory, config.activeDirectory.interval);
    };

    const formatExternalPhone = phoneNumber => {
        const spacedNumber = phoneNumber[2] === '7' ?
            phoneNumber.match(/^(\d{2})(\d{4})(\d{3})(\d{3})$/) :
            phoneNumber.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
        return `+${spacedNumber[1]} ${spacedNumber[2]} ${spacedNumber[3]} ${spacedNumber[4]}`;
    };

    const formatRecord = record => {
        return (`:telephone_receiver:\t${record.name}, Ext: ${record.phoneI}`) +
            (record.phoneE ? (`, DDI: ${formatExternalPhone(record.phoneE)}`) : (``));
    };

    const formatRecords = records => {
        return records.length <= 0 ? 
            `I'm sorry, I can't find any phone user by that name.` :
            (records.length === 1) ?
            formatRecord(records[0]) :
            (`*_Here are the ${records.length} most relevant records_*\n\n`).concat(records
                .map(record => formatRecord(record))
                .join('\n')
            );
    };

    const filterRecord = (record, terms) => {
        return record.name.replace(/\s+/g, '').toUpperCase().includes(terms.join('').toUpperCase());
    };

    const alphabeticalSorter = (a, b) => {
        return a.name < b.name ? -1 : (a.name > b.name) ? 1 : 0;
    };

    const search = terms => {
        if (directory.length) {
            const records = directory
                .filter(record => filterRecord(record, terms))
                .sort(alphabeticalSorter)
                .slice(0, config.activeDirectory.limit);
            return Promise.resolve(formatRecords(records));
        } else {
            return Promise.reject('Directory values have not loaded');
        }
    };

    fetchDirectory();

    return {
        search
    };
};

const instance = new Directory();

export const directory = {
    search: instance.search
};
