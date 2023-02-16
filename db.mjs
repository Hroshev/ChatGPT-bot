import {MongoClient} from 'mongodb'

export default await MongoClient.connect(process.env.MONGODB)