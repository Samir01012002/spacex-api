import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';
import { envs } from 'src/config';

dotenv.config();

@Injectable()
export class DynamodbService {
  private readonly client: DynamoDBClient;
  private readonly docClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: envs.aws_region,
      credentials: {
        accessKeyId: envs.aws_access_key_id,
        secretAccessKey: envs.aws_secret_access_key,
      },
    });

    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  getClient() {
    return this.docClient;
  }
}
