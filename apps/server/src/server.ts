import app from "./app";
import { env } from "./configs/env";
import { connectDatabase } from "./configs/database";

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
