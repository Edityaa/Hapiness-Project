import mongoose from 'mongoose';

// Look for the URI in .env.local first, otherwise fallback to local
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/birthday_db";

let cached = global.mongoose || { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("尝试连接 MongoDB...");
    
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      // This will log 'birthday_db' if the connection is successful
      console.log(`📡 Connected to Database: ${m.connection.name}`);
      return m;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("MongoDB Connection Error:", e);
    throw e;
  }

  return cached.conn;
}