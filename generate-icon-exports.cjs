/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs")
const path = require("path")
const glob = require("glob")

const ICONS_DIR = path.resolve(__dirname, "public/icons")

const toPascalCase = str =>
  str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("") + "Icon"

const iconFiles = glob
  .sync(`${ICONS_DIR}/*.svg`)
  .map(file => path.basename(file, ".svg"))
  .map(name => ({ original: name, pascal: toPascalCase(name) }))
  .sort((a, b) => a.pascal.localeCompare(b.pascal))

const OUTPUT_FILE = path.resolve(ICONS_DIR, "index.ts")

const content =
  iconFiles.map(({ original, pascal }) => `import ${pascal} from "./${original}.svg"`).join("\n") +
  "\n\nexport {\n  " +
  iconFiles.map(({ pascal }) => pascal).join(",\n  ") +
  ",\n}\n"

fs.writeFileSync(OUTPUT_FILE, content)
console.log("✅ svg 파일 export 완료")
