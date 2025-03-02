import { Injectable } from '@nestjs/common';
import { DynamodbService } from 'src/dynamodb/dynamodb.service';
import { envs } from 'src/config';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { PaginateDto } from '../dto/paginate.dto';
import { RocketService } from './rocket.service';

@Injectable()
export class LaunchesService {
  constructor(
    private readonly dynamoDbService: DynamodbService,
    private readonly rocketService: RocketService,
  ) {}

  async findAll(paginateDto: PaginateDto) {
    const { limit = 10, lastKey } = paginateDto;

    const params: any = {
      TableName: envs.dynamodb_table,
      Limit: limit,
    };

    if (lastKey) {
      params.ExclusiveStartKey = JSON.parse(
        Buffer.from(lastKey, 'base64').toString('utf8'),
      );
    }

    const command = new ScanCommand(params);
    const result = await this.dynamoDbService.getClient().send(command);

    for (const element of result.Items as any[]) {
      const rocketInfo = await this.rocketService.getRocketById(element['rocket_id'].S);
      element['rocket_info'] = rocketInfo;

      for (const key in element) {
      if (element[key].S) {
        element[key] = element[key].S;
      }
      }
    }

    return {
      items: result.Items,
      lastKey: result.LastEvaluatedKey
        ? Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString(
            'base64',
          )
        : null,
      limit,
    };
  }

  async analyticsPeryear() {
    const params: any = {
      TableName: envs.dynamodb_table,
    };

    const command = new ScanCommand(params);
    const result = await this.dynamoDbService.getClient().send(command);

    const yearStats = (result.Items || []).reduce(
      (acc: { [key: number]: number }, item: any) => {
        const launchDate = item.launch_date?.S;
        if (launchDate) {
          const year = new Date(launchDate).getFullYear();
          if (!acc[year]) {
            acc[year] = 0;
          }
          acc[year]++;
        }
        return acc;
      },
      {},
    );

    return yearStats;
  }
}
