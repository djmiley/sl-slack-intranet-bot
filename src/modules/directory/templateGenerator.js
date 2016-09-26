import { alphabeticalSorter, formatExternalPhone } from './formatter';

let directoryLength = 0;

const formDirectoryRecord = (record, index) => {
    let directoryRecord = ``;
    if (index % 3 === 0) {
        directoryRecord += `<tr>`;
    }
    directoryRecord += `<th>${record.name}</th><td>${record.phoneI}</td><td>${formatExternalPhone(record.phoneE)}</td>`;
    if (index % 3 === 2 || index === directoryLength - 1) {
        directoryRecord += `</tr>`;
    }
    return directoryRecord;
};

const formDirectoryTable = directory => {
    let directoryRecords = '';
    directory
        .sort(alphabeticalSorter)
        .forEach((record, index) => directoryRecords += formDirectoryRecord(record, index));

    return [
        `<table>`,
        `   <tbody>`,
        directoryRecords,
        `   </tbody>`,
        `</table>`
    ].join('');
};

const formTableHeaders = headers => {
    let tableHeaders = '';
    headers.forEach(header => tableHeaders += `<th>${header}</th>`)
    return tableHeaders;
};

const formPhoneRecord = (record, index) => {
    const officeTableCell = record.rowspan ? `<td rowspan="${record.rowspan}">${record.office}</td>` : ``;
    return [
        `<tr>`,
        officeTableCell,
        `   <td>${record.name}</td>`,
        `   <td>${record.phoneI}</td>`,
        `   <td>${formatExternalPhone(record.phoneE)}</td>`,
        `</tr>`
    ].join('');
};

const formPhoneTable = phones => {
    let phoneTableRecords = '';
    phones.records.forEach((record, index) => phoneTableRecords += formPhoneRecord(record, index));

    return [
        `<table>`,
        `   <thead>`,
        formTableHeaders(phones.headers),
        `   </thead>`,
        `   <tbody>`,
        phoneTableRecords,
        `   </tbody>`,
        `</table>`
    ].join('');
};

const formRoomRecord = (record, index) => {
    const officeTableCell = record.rowspan ? `<td rowspan="${record.rowspan}">${record.office}</td>` : ``;
    return [
        `<tr>`,
        officeTableCell,
        `   <td>${record.phoneI}</td>`,
        `   <td>${formatExternalPhone(record.phoneE)}</td>`,
        `   <td>${record.userP}</td>`,
        `   <td>${record.adminP}</td>`,
        `</tr>`
    ].join('');
};

const formRoomTable = rooms => {
    let roomTableRecords = '';
    rooms.records.forEach((record, index) => roomTableRecords += formRoomRecord(record, index));

    return [
        `<table>`,
        `   <thead>`,
        formTableHeaders(rooms.headers),
        `   </thead>`,
        `   <tbody>`,
        roomTableRecords,
        `   </tbody>`,
        `</table>`
    ].join('');
};

export default function(directory, phones, rooms) {
    directoryLength = directory.length;

    return [
        `<ac:layout>`,
        `   <ac:layout-section>`,
        `       <ac:layout-cell>`,
        formDirectoryTable(directory),
        `       </ac:layout-cell>`,
        `   </ac:layout-section>`,
        `   <ac:layout-section ac:type="two_equal">`,
        `       <ac:layout-cell>`,
        `           <h2>Office Numbers</h2>`,
        formPhoneTable(phones),
        `       </ac:layout-cell>`,
        `       <ac:layout-cell>`,
        `           <h2>Conference Rooms</h2>`,
        formRoomTable(rooms),
        `       </ac:layout-cell>`,
        `   </ac:layout-section>`,
        `</ac:layout>`
    ].join('');
};