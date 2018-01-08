const Parser=require("./keyValueParser.js");
const strictParseInfoCreator=require("./parseInfoCreator.js").strict;
const basicParseInfoCreator = require("./parseInfoCreator.js").basic;

var StrictParser=function(listOfKeys,booleanState) {
  Parser.call(this);
  //above line gives thisObject the key-value pairs of Parser
  let sanitisedListOfKeys=listOfKeys||[];
  let caseSensitivity = undefined;
  if(booleanState==undefined){caseSensitivity=true;}
    else {caseSensitivity = booleanState;}
  // console.log("caseSensitivity at strictParser:",caseSensitivity);
    this.parseInfoCreator=strictParseInfoCreator(sanitisedListOfKeys,caseSensitivity);
  //above line gives the ability
}

StrictParser.prototype=Object.create(Parser.prototype);
module.exports=StrictParser;
