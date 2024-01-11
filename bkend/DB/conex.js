function conexion() {
    return SpreadsheetApp.openById(env_().ID_DATABASE);
}

function obtenerSheet(NAME) {
    return conexion().getSheetByName(NAME);
}

function obtenerDatos(NAME) {
    return obtenerSheet(NAME).getDataRange().getDisplayValues();
}

function obtenerRows(NAME) {
    return obtenerSheet(NAME).getLastRow();
}

function perfilUsuario() {
    return Session.getActiveUser().getEmail()

   //return google.script.run.withSuccessHandler(setEmail).getEmail();
}

function fileOrigen() {
    return SpreadsheetApp.openById(env_().ID_ARI);
}