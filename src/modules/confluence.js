import { config } from '../config';
import fetch from 'node-fetch';

const Confluence = () => {

    const search = (terms) => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${config.confluence.basicAuth}`
            } 
        };
        const cql = terms
            .map(term => `label=${term}`)
            .join(' OR ')
            .concat(` OR title ~ "${terms.join(' ')}"`);

        const query = `cql=${encodeURIComponent(cql)}&expand=space,metadata.labels&limit=${config.confluence.limit}`;
        const url = `${config.confluence.baseUrl}/rest/api/content/search?${query}`;

        return fetch(url, options)
            .then(res => res.json())
            //.then(res => { console.log(res); return res; })
            .then(res => {
                if(res.size <= 0) {
                    return `I'm sorry, I didn't find anything related to your search criteria.`;
                }

                return (`*Here are the most relevant ${res.size} results*\n`).concat(res.results
                    .map(result => (`${result.title} - ${config.confluence.baseUrl}${result._links.tinyui}`))
                    .join('\n')) 
            });
    };

    return {
        search
    };
};

const instance = new Confluence();

export const confluence = {
    search: instance.search
};
