function save(data) {
    const dat = JSON.parse(data)
    try {
        const sheet = obtenerSheet(env_().SH_REGISTRO_DATA);
        Insert(JSON.parse(data), sheet);
        crearFileARI(dat.id, dat.ci, dat.nombre)
        return {
            titulo:" Registro Exitoso",
            descripcion: "ARI Cargado En Sistema"
        }
    } catch (error) {
        return {
            titulo: "Ha Ocurrido un Error! " + error,
            descripcion: "Datos No Almacenados, Intente Otra Vez"
        }
    }
}

function crearFileARI(id, ci, nombre) {
    const origen = fileOrigen();
    var newSpreadsheet = DriveApp.getFileById(origen.getId()).makeCopy('ARI de ' + ci + '_' + nombre, DriveApp.getFolderById('1okZo6taoo8bykCnsoIne9BV1PpNn1xwB'));
    var url = newSpreadsheet.getUrl()
    const dbARI = updateURL(id, url, "Creado")

    return dbARI
}

function updateURL(id, url, estado) {
    try {
        const sheet = obtenerSheet(env_().SH_REGISTRO_DATA);
        const cRows = obtenerRows(env_().SH_REGISTRO_DATA);
        var rango = sheet.getDataRange().getValues();
        for(var i = 1; i < cRows; i++) {
            if(rango[i][0] == id)  { 
                var j = 1 + i;
                sheet.getRange(j, 7).setValue(url);
                sheet.getRange(j, 8).setValue(estado);
                return {
                    titulo:" Actualización Exitoso",
                    descripcion: "Ticket Cargado En Sistema"
                }
        } 
    }
    } catch (error) {
        return {
            titulo: "Ha Ocurrido un Error! " + error,
            descripcion: "Datos No Almacenados, Intente Otra Vez"
        }
    }
}

function listarUser(id = undefined) {
    return JSON.stringify(_read(obtenerSheet(env_().SH_REGISTRO_DATA), id))
  
}

function listarRequest(id = undefined, fn = undefined) {
    try {
        if(fn === 1) return JSON.stringify(_read(obtenerSheet(env_().SH_REGISTRO_CASOS), id))
        else if(fn === 2) return JSON.stringify(_readFecha(obtenerSheet(env_().SH_REGISTRO_CASOS), id))
    } catch(error) {
        console.error(error)
    }
}

function listarEstado(estado) {
   return JSON.stringify(readEstado(obtenerSheet(env_().SH_REGISTRO_DATA), estado))
 }

function cantRows() {
   return obtenerRows(env_().SH_REGISTRO_DATA)
}

function perfil() {
    return perfilUsuario();
}

function validarUser(user) {
    var useracceso = 'vacio';
    const sheet = obtenerSheet(env_().SH_REGISTRO_ADMIN);
    const cRows = obtenerRows(env_().SH_REGISTRO_ADMIN);
    var cant = sheet.getDataRange().getValues();
    for(var i = 1; i < cRows; i++) {
        if(cant[i][0] == user)  { 
            useracceso = cant[i][0]
    } 
 } return useracceso
}

function updateTicket(id, ci=undefined, empresa=undefined, estado, gthadmin=undefined, modificado=undefined, url=undefined) {
    try {
        const sheet = obtenerSheet(env_().SH_REGISTRO_DATA);
        const cRows = obtenerRows(env_().SH_REGISTRO_DATA);
        var rango = sheet.getDataRange().getValues();
        for(var i = 1; i < cRows; i++) {
            if(rango[i][0] == id)  { 
                var j = 1 + i;
                sheet.getRange(j, 2).setValue(ci);
                sheet.getRange(j, 6).setValue(empresa);
                sheet.getRange(j, 7).setValue(url);
                sheet.getRange(j, 8).setValue(estado);
                sheet.getRange(j, 9).setValue(gthadmin);
                sheet.getRange(j, 10).setValue(modificado);
                return {
                    titulo:" Actualización Exitoso",
                    descripcion: "Ticket Cargado En Sistema"
                }
        } 
    }
    } catch (error) {
        return {
            titulo: "Ha Ocurrido un Error! " + error,
            descripcion: "Datos No Almacenados, Intente Otra Vez"
        }
    }
}

function email(TR, creado, fechaCreado, NombreApellido, Departamento, TipoSolicitud, TipoServicio, FechaServicio, Horarequerida, estado) {
    const usuario = { TR, creado, fechaCreado, NombreApellido, Departamento, TipoSolicitud, TipoServicio, FechaServicio, Horarequerida, estado }
    var repo = HtmlService.createTemplateFromFile('frontend/report.html')
    repo.usuario = usuario
    var message = repo.evaluate().getContent()

    GmailApp.sendEmail(
        'bmarquez@integra-ws.com',
        "Ticket: " + usuario.TR,
        'message',
        {htmlBody: message}
    );
}

function emailUser(TR, creado, fechaCreado, NombreApellido, Departamento, TipoSolicitud, TipoServicio, FechaServicio, Horarequerida, estado, vehiculo) {
    const usuario = { TR, creado, fechaCreado, NombreApellido, Departamento, TipoSolicitud, TipoServicio, FechaServicio, Horarequerida, estado, vehiculo }
    var repo = HtmlService.createTemplateFromFile('frontend/reportuser.html')
    repo.usuario = usuario
    var mes = repo.evaluate().getContent()
    
    GmailApp.sendEmail(
        usuario.creado,
        "Ticket: " + usuario.TR,
         "mes",
         {htmlBody: mes}
    );
}

