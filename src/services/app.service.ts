import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { SERVER_PORT } from 'src/main';
import { RequestModel } from 'src/model/request.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async processRequest(request: RequestModel) {
    const startTime = Date.now();
    const myuuid = uuidv4();
    request.uuid = `${myuuid}`;
    try {
      if (request.requests && request.requests.length > 0) {
        const requests = request.requests.map((item) => {
          const hostname = `http://${item.name}:${SERVER_PORT}`;
          // const hostname = `http://localhost:${SERVER_PORT}`;
          console.log(`hostname: ${hostname}`);
          const result = firstValueFrom(
            this.httpService.post<RequestModel>(hostname, item).pipe(
              map((response) => {
                return response.data;
              }),
            ),
          );
          return result;
        });
        const results = await Promise.all(requests);
        request.requests = results;
      }
    } catch (error) {
      console.error(error);
      request.requests = [];
    }
    const endTime = Date.now();
    request.processTime = endTime - startTime;
    return request;
  }
}
