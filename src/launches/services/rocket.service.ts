import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { envs } from 'src/config';

@Injectable()
export class RocketService {
  private readonly apiUrl = envs.spacex_api;

  constructor(private readonly httpService: HttpService) {}

  async getRocketById(id: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.apiUrl}/rockets/${id}`),
      );
      return response.data;
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'No se pudo obtener la información del cohete',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
