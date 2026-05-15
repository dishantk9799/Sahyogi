import app from "./app.js";
import { env } from "./configs/env.js";
import { connectDatabase } from "./configs/database.js";
async function bootstrap() {
  await connectDatabase();
  app.listen(env.PORT, () => {
    console.log(`Sahyogi API listening on http://localhost:${env.PORT}`);
  });
}
bootstrap().catch((error) => {
  console.error("Failed to start Sahyogi API", error);
  process.exit(1);
});
