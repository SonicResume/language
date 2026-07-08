import fs from "fs";

const cldr = JSON.parse(
  fs.readFileSync("./localeDisplayNames.json", "utf8")
);

const languages =
  cldr.main["en-001"].localeDisplayNames.languages;

const output = Object.entries(languages).map(
  ([code, name]) => ({
    code,
    name
  })
);

fs.mkdirSync("./src/react-app/data", {
  recursive: true
});

fs.writeFileSync(
  "./src/react-app/data/languages.json",
  JSON.stringify(output, null, 2)
);

console.log(`Done: ${output.length} languages created`);