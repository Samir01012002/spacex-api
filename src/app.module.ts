import { Module } from '@nestjs/common';
import { DynamodbModule } from './dynamodb/dynamodb.module';
import { LaunchesModule } from './launches/launches.module';

@Module({
  imports: [DynamodbModule, LaunchesModule],
})
export class AppModule {}
