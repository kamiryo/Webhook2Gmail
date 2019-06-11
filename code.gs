var DEST_ADDRESS = PropertiesService.getScriptProperties().getProperty("_DEST_ADDRESS");
var TOKEN = PropertiesService.getScriptProperties().getProperty("_TOKEN");

function doGet(){
  return ;
}

function doPost(e) {
  Logger.log("【START】doPost");

  //認証トークン抽出
  var auth = jsonParse(e,"auth");
  
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  //TODO:セキュリティ実装
  if(tokenCHK(auth)){ 
    //TODO:メール送信の本文の値渡し
    var sendmsg = jsonParse(e,"mailbody");  
    toGmail(sendmsg);
    output.setContent(JSON.stringify({ message: "success!" }));
  }else{
    output.setContent(JSON.stringify({ message: "fail!" }));
  }
  Logger.log("【END】doPost");
  return output; 
}

function jsonParse(e,parseName){
  Logger.log("【START】jsonParse");
  var params = JSON.parse(e.postData.getDataAsString());
  var param = params[parseName];
  Logger.log("【DEBUG】jsonParse %s",param);
  Logger.log("【END】jsonParse");
  return param;
}

function tokenCHK(auth){
  Logger.log("【START】tokenCHK");
  Logger.log("【END】tokenCHK");
  return true;
}

function toGmail(mailBody){
  if(!mailBody) {
    mailBody = "this messeage is default";
  }
  MailApp.sendEmail(DEST_ADDRESS,'fromGoogleAppsScript',mailBody);
  return true;
}