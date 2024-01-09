import mongoose from "mongoose"

interface ConnectionOptios {
  mongoUrl: string
  dbName: string
}

export class MongoDatabase {
  static async connect({ dbName, mongoUrl }: ConnectionOptios) {
    try {
      const mongoConnection = await mongoose.connect(mongoUrl, { dbName })
      console.log("[mongo] connected.")
      return mongoConnection.connection.readyState
    } catch (error) {
      console.log("[mongo] connection error.")
      throw error
    }
  }
}
