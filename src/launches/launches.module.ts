import { Module } from '@nestjs/common';
import { LaunchesService } from './services/launches.service';
import { LaunchesController } from './launches.controller';
import { DynamodbModule } from 'src/dynamodb/dynamodb.module';
import { RocketService } from './services/rocket.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DynamodbModule, HttpModule],
  controllers: [LaunchesController],
  providers: [LaunchesService, RocketService],
})
export class LaunchesModule {}
