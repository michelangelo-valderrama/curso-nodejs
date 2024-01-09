import { ServerApp } from "./presentation/server-app"
import { args } from "./config/plugins/args.plugin"

async function main() {
  const {
    b: base,
    l: limit,
    s: showTable,
    n: fileName,
    d: fileDestination,
  } = args

  ServerApp.run({
    base,
    limit,
    showTable,
    fileName,
    fileDestination,
  })
}

;(async () => {
  await main()
})()
