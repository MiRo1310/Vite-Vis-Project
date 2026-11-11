import { describe, it, expect } from "vitest";
import { type StringReplacerObj } from "@/types/string";
import "@/lib/prototype/string";

describe("mrReplaceAll", () => {
  it("replaces all occurrences", () => {
    const texts = [
      { val: "Test", expect: "Test" },
      {
        val: "Abc. Def. Ghi.//.",
        expect: "Abc  Def  Ghi // ",
      },
    ];

    texts.forEach((text) => {
      const result = text.val.mrReplaceAll(".", " ");
      expect(result).to.equal(text.expect);
    });
  });
});

describe("mrStringReplacer", () => {
  it("removes all matches without newValue", () => {
    const valueToReplace: StringReplacerObj[] = [{ val: "Hello" }, { val: "World" }];
    expect("Hello World!".mrStringReplacer(valueToReplace)).to.equal(" !");
  });

  it("replaces all matches with newValue", () => {
    const valueToReplace = [
      { val: "Hello", newValue: "Hi" },
      { val: "World", newValue: "Earth" },
    ];
    expect("Hello World!".mrStringReplacer(valueToReplace)).to.equal("Hi Earth!");
  });

  it("returns the original string if nothing matches", () => {
    const valueToReplace = [{ val: "Test" }];
    const result = "Hello World!".mrStringReplacer(valueToReplace);
    expect(result).to.equal("Hello World!");
  });

  it("returns the original string for an empty replacement list", () => {
    const valueToReplace: StringReplacerObj[] = [];
    const result = "Hello World!".mrStringReplacer(valueToReplace);
    expect(result).to.equal("Hello World!");
  });

  it("returns an empty string for an empty string", () => {
    const valueToReplace: StringReplacerObj[] = [{ val: "Hello" }, { val: "World" }];
    const result = "".mrStringReplacer(valueToReplace);
    expect(result).to.equal("");
  });
});

describe("mrIsBooleanString", () => {
  it("returns true for 'true'", () => {
    expect("true".mrIsBooleanString()).toBeTruthy();
  });

  it("returns true for 'false'", () => {
    expect("false".mrIsBooleanString()).toBeTruthy();
  });

  it("returns false for non-boolean strings", () => {
    expect("yes".mrIsBooleanString()).toBeFalsy();
    expect("no".mrIsBooleanString()).toBeFalsy();
    expect("".mrIsBooleanString()).toBeFalsy();
  });
});

describe("mrIsEmptyString", () => {
  it("returns true for an empty string", () => {
    expect("".mrIsEmptyString()).toBeTruthy();
  });

  it("returns true for a string with only spaces", () => {
    expect("   ".mrIsEmptyString()).toBeTruthy();
  });

  it("returns false for a non-empty string", () => {
    expect("hello".mrIsEmptyString()).toBeFalsy();
  });
});

describe("mrDecomposeText", () => {
  it("splits the text at the start and end markers", () => {
    const result = "Das ist ein __Test. Das ist ein Test2".mrDecomposeText("__", ".");
    expect(result).to.deep.equal({
      startIndex: 12,
      endIndex: 18,
      substring: "__Test.",
      textExcludeSubstring: "Das ist ein  Das ist ein Test2",
      substringExcludeSearch: "Test",
    });

    const result2 = "Das ist ein __Test.".mrDecomposeText("?", ".");
    expect(result2).to.deep.equal({
      startIndex: -1,
      endIndex: 18,
      substring: "Das ist ein __Test.",
      textExcludeSubstring: "",
      substringExcludeSearch: "Das ist ein __Test",
    });

    const result3 = "Das ist ein __Test.".mrDecomposeText("?", "-");
    expect(result3).to.deep.equal({
      startIndex: -1,
      endIndex: -1,
      substring: "",
      textExcludeSubstring: "Das ist ein __Test.",
      substringExcludeSearch: "",
    });
  });
});

describe("mrFirstLetterToUpperCase", () => {
  it("capitalizes the first letter", () => {
    expect("hello world".mrFirstLetterToUpperCase()).to.equal("Hello world");
    expect("Hello world".mrFirstLetterToUpperCase()).to.equal("Hello world");
    expect("h".mrFirstLetterToUpperCase()).to.equal("H");
    expect("".mrFirstLetterToUpperCase()).to.equal("");
  });
});

describe("mrRemoveDuplicatedSpaces", () => {
  it("keeps a string without duplicate spaces unchanged", () => {
    expect("Test".mrRemoveDuplicatedSpaces()).to.be.equal("Test");
  });

  it("trims and removes duplicate spaces", () => {
    expect(" Test  Test   ".mrRemoveDuplicatedSpaces()).to.be.equal("Test Test");
  });

  it("trims a single word", () => {
    expect("  Test   ".mrRemoveDuplicatedSpaces()).to.be.equal("Test");
  });
});

describe("mrSingleQuotesToDoubleQuotes", () => {
  it("keeps a string without single quotes unchanged", () => {
    expect("Test".mrSingleQuotesToDoubleQuotes()).to.be.equal("Test");
  });

  it("replaces all single quotes", () => {
    // prettier-ignore
    expect("'Test':''Test'".mrSingleQuotesToDoubleQuotes()).to.be.equal("\"Test\":\"\"Test\"");
  });

  it("keeps existing double quotes", () => {
    // prettier-ignore
    expect("'Test':''Test' \"test\"".mrSingleQuotesToDoubleQuotes()).to.be.equal("\"Test\":\"\"Test\" \"test\"");
  });
});

describe("mrRemoveQuotes", () => {
  it("keeps a string without quotes unchanged", () => {
    expect("Test".mrRemoveQuotes()).to.be.equal("Test");
  });

  it("removes all single and double quotes", () => {
    expect("'Test'\":'\"'Test'".mrRemoveQuotes()).to.be.equal("Test:Test");
  });
});
