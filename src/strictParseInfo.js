const Parsed=require("./parsed.js");
const ParseInfo=require("./parseInfo.js");
const InvalidKeyError=require("./errors/invalidKeyError.js");

const contains=function(list,key,caseSensitive) {
  return list.find(function(validKey){
    console.log("caseSensitive at execution",caseSensitive);
    if(!caseSensitive){
      key=key.toLowerCase();
      validKey=validKey.toLowerCase()
    }
    return key==validKey;
  });
}

var StrictParseInfo=function(initialParsingFunction,validKeys,caseSensitivity) {
  ParseInfo.call(this,initialParsingFunction);
  this.validKeys=validKeys;
  this.caseSensitive = caseSensitivity
}

StrictParseInfo.prototype=Object.create(ParseInfo.prototype);

StrictParseInfo.prototype.pushKeyValuePair=function() {
  // console.log("case state at execution block:",this.caseSensitive);
  if(!contains(this.validKeys,this.currentKey,this.caseSensitive))
    throw new InvalidKeyError("invalid key",this.currentKey,this.currentPos);
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

module.exports=StrictParseInfo;
