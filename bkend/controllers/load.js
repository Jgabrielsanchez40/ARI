function save(data) {
  const dat = JSON.parse(data);
  try {
    const sheet = obtenerSheet(env_().SH_REGISTRO_DATA);
    Insert(JSON.parse(data), sheet);
    crearFileARI(dat.id, dat.ci, dat.nombre, dat.empresa);
    return {
      titulo: " Registro Exitoso",
      descripcion: "ARI Cargado En Sistema",
    };
  } catch (error) {
    return {
      titulo: "Ha Ocurrido un Error! " + error,
      descripcion: "Datos No Almacenados, Intente Otra Vez",
    };
  }
}

function searcCI(ci) {
  return JSON.stringify(readCI(obtenerSheet(env_().SH_REGISTRO_EMPCOTIZA), ci));
}

async function crearFileARI(id, ci, nombre, empresa) {
  try {
    const origen = fileOrigen();
    var newSpreadsheet = DriveApp.getFileById(origen.getId()).makeCopy(
      "ARI de " + ci + "_" + nombre,
      DriveApp.getFolderById("1okZo6taoo8bykCnsoIne9BV1PpNn1xwB")
    );
    var url = newSpreadsheet.getUrl();
    var address = newSpreadsheet.getId();
    // cargaEmpresaARI(address, empresa)
    const dbARI = updateURL(id, url, "Creado", ci, empresa, address);
    return dbARI;
  } catch (error) {
    console.error(error);
  }
}

function cargaEmpresaARI(address, empresa) {
  try {
    const dbemp = SpreadsheetApp.openById(address);
    const dbpage = dbemp.getSheetByName("Datos");
    dbpage.getRange(a, 4).setValue(empresa);
  } catch (error) {
    console.error(error);
  }
}

function updateURL(id, url, estado, ci, empresa, address) {
  try {
    const sheet = obtenerSheet(env_().SH_REGISTRO_DATA);
    const cRows = obtenerRows(env_().SH_REGISTRO_DATA);
    var rango = sheet.getDataRange().getValues();
    for (var i = 1; i < cRows; i++) {
      if (rango[i][0] == id) {
        var j = 1 + i;
        sheet.getRange(j, 7).setValue(url);
        sheet.getRange(j, 8).setValue(estado);
      }
    }
    updatedbemp(ci);
    const dbemp = SpreadsheetApp.openById(address);
    const dbpage = dbemp.getSheetByName("Datos");
    const dbtarifa = dbemp.getSheetByName("Tarifa 1");
    dbpage.getRange(4, 12).setValue(empresa);
    dbtarifa.getRange(1, 1).setValue(id);
  } catch (error) {
    console.error(error);
  }
}

function updatedbemp(ci) {
  try {
    const sheet = obtenerSheet(env_().SH_REGISTRO_EMPCOTIZA);
    const cRows = obtenerRows(env_().SH_REGISTRO_EMPCOTIZA);
    var rango = sheet.getDataRange().getValues();
    for (var i = 1; i < cRows; i++) {
      if (rango[i][0] == ci) {
        var j = 1 + i;
        sheet.getRange(j, 4).setValue("SI");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function listarUser(creadoPor) {
  return JSON.stringify(
    readCreatedBy(obtenerSheet(env_().SH_REGISTRO_DATA), creadoPor)
  );
}

function listarEmpresa(id = undefined) {
  return JSON.stringify(_read(obtenerSheet(env_().SH_REGISTRO_EMPRESA), id));
}

function listarEstado(estado) {
  return JSON.stringify(
    readEstado(obtenerSheet(env_().SH_REGISTRO_DATA), estado)
  );
}

function CompanyCotiza(id = undefined) {
  return JSON.stringify(_read(obtenerSheet(env_().SH_REGISTRO_EMPCOTIZA), id));
}

function cantRows() {
  return obtenerRows(env_().SH_REGISTRO_DATA);
}

function perfil() {
  return perfilUsuario();
}

function validarUser(user) {
  var useracceso = "vacio";
  const sheet = obtenerSheet(env_().SH_REGISTRO_ADMIN);
  const cRows = obtenerRows(env_().SH_REGISTRO_ADMIN);
  var cant = sheet.getDataRange().getValues();
  for (var i = 1; i < cRows; i++) {
    if (cant[i][2] == user) {
      useracceso = cant[i][2];
    }
  }
  return useracceso;
}

function updateARI(id, gthadmin, modificado, creadoPor, nombre) {
  try {
    const sheet = obtenerSheet(env_().SH_REGISTRO_DATA);
    const cRows = obtenerRows(env_().SH_REGISTRO_DATA);
    var rango = sheet.getDataRange().getValues();
    for (var i = 1; i < cRows; i++) {
      if (rango[i][0] == id) {
        var j = 1 + i;
        sheet.getRange(j, 8).setValue("Completado");
        sheet.getRange(j, 9).setValue(gthadmin);
        sheet.getRange(j, 10).setValue(modificado);
      }
    }
    return email(id, gthadmin, creadoPor, nombre);
  } catch (error) {
    console.error(error);
  }
}

function email(id, gthadmin, creadoPor, nombre) {
  const usuario = {id, gthadmin, creadoPor, nombre};
  var repo = HtmlService.createTemplateFromFile("fend/report.html");
  repo.usuario = usuario;
  var message = repo.evaluate().getContent();

  GmailApp.sendEmail(usuario.creadoPor, "ARI # " + usuario.id, "message", {
    htmlBody: message,
  });
 

}
