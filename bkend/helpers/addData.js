function Insert(data, table) {
    const header = table.getDataRange().getValues().shift();
    const newRow = prepareRow(data, header);
    table.appendRow(newRow);
}

function prepareRow(data, headers) {
    let sortArray = [];
    for (let p = 0; p < headers.length; p++) {
        let value = data[headers[p]];
        sortArray[p] = value;
    };
    return sortArray;
}