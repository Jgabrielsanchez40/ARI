const doGet = () =>
  HtmlService.createTemplateFromFile("fend/index.html")
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag(
      "viewport",
      'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1"'
    )
    .setTitle("ARI");

const include = (ruta) =>
  HtmlService.createHtmlOutputFromFile(ruta).getContent();
