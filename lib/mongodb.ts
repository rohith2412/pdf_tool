import { MongoClient, type Collection, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}

export function getMongoClient(): Promise<MongoClient> {
  if (!clientPromise) {
    throw new Error("MONGODB_URI is not set");
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db();
}

export type StatsDoc = { _id: string; count: number; createdAt?: Date };
export type UserDoc = {
  _id?: unknown;
  googleId: string;
  email: string;
  name?: string | null;
  image?: string | null;
  createdAt?: Date;
  lastLoginAt?: Date;
};

export async function statsCollection(): Promise<Collection<StatsDoc>> {
  const db = await getDb();
  return db.collection<StatsDoc>("stats");
}

export async function usersCollection(): Promise<Collection<UserDoc>> {
  const db = await getDb();
  return db.collection<UserDoc>("users");
}

export const isMongoConfigured = () => Boolean(uri);
