function _read(sheet, id) {
    const data = sheet.getDataRange().getValues();
    const header = data.shift();
    //Buscar tod
    const resultado = data.map((row, indx) => {
        const reduced = header.reduce((accumulator, currentValue, currentIndex) => {
            accumulator[currentValue] = row[currentIndex];
            return accumulator;
        }, {});

        reduced.row = indx + 2;
        return reduced;
    });
    //filtrar si pasa un ID
    if (id) {
        return resultado.filter((dato) => dato.id === id)
    }
    return resultado;
}

function readEstado(sheet, estado) {
    const data = sheet.getDataRange().getValues();
    const header = data.shift();
    //Buscar tod
    const resultado = data.map((row, indx) => {
        const reduced = header.reduce((accumulator, currentValue, currentIndex) => {
            accumulator[currentValue] = row[currentIndex];
            return accumulator;
        }, {});

        reduced.row = indx + 2;
        return reduced;
    });
    //filtrar si pasa un ID
    if (estado) {
        return resultado.filter((dato) => dato.estado === estado || dato.estado === "En Progreso")
    }
    return resultado;
}

function _readFecha(sheet, id) {
    const data = sheet.getDataRange().getValues();
    const header = data.shift();
    //Buscar tod
    const resultado = data.map((row, indx) => {
        const reduced = header.reduce((accumulator, currentValue, currentIndex) => {
            accumulator[currentValue] = row[currentIndex];
            return accumulator;
        }, {});

        reduced.row = indx + 2;
        return reduced;
    });
    //filtrar si pasa un ID
    if (id) {
        return resultado.filter((dato) => dato.creado === id)
      }
    return resultado;
}
