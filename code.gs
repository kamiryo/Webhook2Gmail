var DEST_ADDRESS = PropertiesService.getScriptProperties().getProperty("_DEST_ADDRESS");
var TOKEN = PropertiesService.getScriptProperties().getProperty("_TOKEN");

function doPost(e) {
  Logger.log("【START】doPost");
  
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  if(tokenCHK(jsonParse(e,"auth"))){ 
    toGmail(jsonParse(e,"mailbody"));
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

//TODO:セキュリティ実装
function tokenCHK(auth){
  Logger.log("【START】tokenCHK");
  var date = new Date();
  var datejst = Utilities.formatDate( date, 'Asia/Tokyo', 'yyyyMMddHHmm');
  var authkey = datejst + TOKEN;
  Logger.log("【DEBUG】tokenCHK %s",authkey);
  
  var authkey_sha256 = SHA256 (authkey)
  Logger.log("【DEBUG】tokenCHK %s",authkey_sha256);
  
  if(auth == authkey_sha256){
    flg = true;
  }else{
    flg = false;
  }
  
  Logger.log("【END】tokenCHK");
  return flg;
}

function toGmail(mailBody){
  if(!mailBody) {
    mailBody = "this messeage is default";
  }
  MailApp.sendEmail(DEST_ADDRESS,'fromGoogleAppsScript',mailBody);
  return true;
}

function SHA256 (input) {
  var rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, input);
  var txtHash = '';
  for (i = 0; i < rawHash.length; i++) {
    var hashVal = rawHash[i];
    if (hashVal < 0) {
      hashVal += 256;
    }
    if (hashVal.toString(16).length == 1) {
      txtHash += '0';
    }
    txtHash += hashVal.toString(16);
  }
  return txtHash;
}