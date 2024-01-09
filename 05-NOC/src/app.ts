import { envs } from "./config/plugins/envs.plugin"
import { MongoDatabase } from "./data/mongo"
import { Server } from "./presentation/server"

//
;(async () => {
  main()
})()

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  })

  // const prisma = new PrismaClient()
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "LOW"
  //   }
  // })
  // console.log(logs)

  Server.start()
}
