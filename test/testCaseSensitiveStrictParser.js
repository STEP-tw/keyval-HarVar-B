const src=function(filePath){return "../src/"+filePath};

const assert=require('chai').assert;
const Parsed=require(src('parsed.js'));
const StrictParser=require(src('index.js')).StrictParser;

describe("strict parser that is case insensitive",function(){
  it("should parse when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    // console.log("strictParser : ",kvParser);
    let expected=new Parsed();
    expected["NaMe"]="jayanth";
    let parsed=kvParser.parse("NaMe=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse only specified keys even in case-insensitive mode",function(){
    let kvParser=new StrictParser(["name"],false);
    let expected=new Parsed();
    assert.throws(()=>{
        kvParser.parse("NaMe=jayanth age=thirtyEight");
    }
    );
  })
});

describe("strict parser that is case sensitive",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("NaMe=jayanth");
    });
  });
  it("should parse when the booleanState is not passed as argument",function(){
    let kvParser=new StrictParser(["name"]);
    //when the boolean condition is not given, true is taken as default strict state
    assert.throws(()=>{
      kvParser.parse("NaMe=jayanth");
    });
  });
});
