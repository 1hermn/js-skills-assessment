import { NestFactory } from '@nestjs/core';
import { Seeder } from './seeder';
import { SeederModule } from './seeder.module';
async function bootstrap() {
  await NestFactory.createApplicationContext(SeederModule).then(
    (appContext) => {
      const seeder = appContext.get(Seeder);
      seeder.seed();
    },
  );
}
bootstrap();
