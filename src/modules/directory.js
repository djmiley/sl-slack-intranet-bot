import { config } from '../config';
import templateGenerator from './directory/templateGenerator';
import { alphabeticalSorter, formatRecords } from './directory/formatter';
import { phoneIds, phones } from './directory/phones';
import rooms from './directory/rooms';
import fetch from 'node-fetch';

const Directory = () => {
    let directory = [];

    const fetchDirectory = () => {
        const options = {
            method: 'GET'
        };

        directory = [];

        let i = 0;

        config.activeDirectory.voipservers.forEach(voipserver => {
            fetch(`http://${voipserver}/prov/cgi-bin/directory.cgi`, options)
                .then(res => res.json())
                .then(res => {
                    i++;
                    directory = [...directory, ...res];
                    if (i === config.activeDirectory.voipservers.length) {
                        putToConfluence(directory);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });

        setTimeout(fetchDirectory, config.activeDirectory.interval);
    };

    const putToConfluence = (directory) => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + config.confluence.basicAuth
            }
        };

        fetch('https://scottlogic.atlassian.net/wiki/rest/api/content/' + config.activeDirectory.pageId, options)
            .then(res => res.json())
            .then(res => formJsonAndPutContent(directory, res.version.number + 1))
            .catch(error => console.log(error));
    };

    const formJsonAndPutContent = (directory, versionNumber) => {
        const filteredDirectory = directory.filter(record => !phoneIds.includes(record.username) && !record.name.includes('Spare'))
        const mainNumbers = directory.filter(record => phoneIds.includes(record.username));

        const json = {
            id: config.activeDirectory.pageId,
            type: 'page',
            title: 'Phone Directory',
            body: {
                storage: {
                    value: templateGenerator(filteredDirectory, phones(mainNumbers), rooms),
                    representation: 'storage'
                }
            },
            version: {
                number: versionNumber
            }
        };

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + config.confluence.basicAuth
            },
            body: JSON.stringify(json)
        };

        fetch('https://scottlogic.atlassian.net/wiki/rest/api/content/' + config.activeDirectory.pageId, options)
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    const filterRecord = (record, terms) => {
        return record.name.replace(/\s+/g, '').toUpperCase().includes(terms.join('').toUpperCase());
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
