const fs = require("fs")
const content = fs.readFileSync("README.md", "utf-8")

const wordCount = content.trim().split(" ").length
const reactWordCount = content.match(/React/gi).length

console.log("Palabras:", wordCount)
console.log("Palabras:", reactWordCount)
