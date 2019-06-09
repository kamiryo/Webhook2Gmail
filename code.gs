var DEST_ADDRESS = PropertiesService.getScriptProperties().getProperty("_DEST_ADDRESS");
var TOKEN = PropertiesService.getScriptProperties().getProperty("_TOKEN");

function doPost(e) {
  Logger.log("【START】doPost");

  //TODO:セキュリティ実装
  if(!tokenCHK()){
    Logger.log("【START】tokenCHK");
    Logger.log("【END】tokenCHK");
    return ;
  }
  //TODO:json解析
  
  toGmail();
  
  Logger.log("【END】doPost");
  return ;
}

function tokenCHK(){
  return true;
}

function toGmail(){
    MailApp.sendEmail(DEST_ADDRESS, 'fromGoogleAppsScript', 'てすと');
}
