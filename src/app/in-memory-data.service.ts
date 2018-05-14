import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {id: 1, name: 'Rafael'}
    ];
    return {users};
  }
}