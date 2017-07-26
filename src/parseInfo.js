const Parsed=require("./parsed.js");
const MissingValueError=require("./errors/missingValueError.js");
const MissingEndQuoteError=require("./errors/missingEndQuoteError.js");

var ParseInfo=function(initialParsingFunction) {
    this.currentToken="";
    this.currentKey="";
    this.currentValue="";
    this.parsedKeys={};
    this.parseWithQuotes=false;
    this.currentPos=-1;
    this.nextFunction=initialParsingFunction;
}

ParseInfo.prototype.incrementPosition=function() {
  this.currentPos++;
}

ParseInfo.prototype.resetKeysAndValues=function() {
  this.currentKey=this.currentValue=this.currentToken="";
}

ParseInfo.prototype.pushKeyValuePair=function() {
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

ParseInfo.prototype.endOfText=function() {
  if(this.currentToken!="") {
    throw new Error("incomplete key value pair");
  }
  if(this.currentValue!="") {
    if(this.currentKey!="") {
      if(!this.parseWithQuotes)
        this.pushKeyValuePair();
      else {
        throw new MissingEndQuoteError(this.currentKey, this.currentPos);
      }
    } else {
      throw new MissingKeyError(this.currentPos);
    }
  } else {
    if(this.currentKey!="")
      throw new MissingValueError(this.currentKey,this.currentPos);
  }
}


ParseInfo.prototype.parsed=function() {
  var parsed = new Parsed();
  var parsedKeys=this.parsedKeys;
  Object.keys(parsedKeys).forEach(function(key){
    parsed[key]=parsedKeys[key];
  });
  return parsed;
}

module.exports=ParseInfo;
