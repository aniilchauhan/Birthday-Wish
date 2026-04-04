import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var __mongooseBirthdayWish: MongooseCache | undefined;
}

const cache: MongooseCache = global.__mongooseBirthdayWish ?? { conn: null, promise: null };

if (!global.__mongooseBirthdayWish) {
  global.__mongooseBirthdayWish = cache;
}

export default async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        maxPoolSize: 1,
        serverSelectionTimeoutMS: 15_000,
        socketTimeoutMS: 45_000,
        family: 4,
      })
      .then((m) => m);
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
