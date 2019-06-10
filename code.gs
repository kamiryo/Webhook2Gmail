var DEST_ADDRESS = PropertiesService.getScriptProperties().getProperty("_DEST_ADDRESS");
var TOKEN = PropertiesService.getScriptProperties().getProperty("_TOKEN");

function doGet(){
  return ;
}

function doPost(e) {
  Logger.log("【START】doPost");

  //TODO:json解析
  
  //TODO:セキュリティ実装
  if(!tokenCHK()){
    Logger.log("【START】tokenCHK");
    Logger.log("【END】tokenCHK");
    return ;
  }
  
  //TODO:メール送信の本文の値渡し
  toGmail();
  
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({ message: "success!" }));

  Logger.log("【END】doPost");
  return output; 
}

function tokenCHK(){
  return true;
}

function toGmail(){
    MailApp.sendEmail(DEST_ADDRESS, 'fromGoogleAppsScript', 'てすとだよ！');
}
