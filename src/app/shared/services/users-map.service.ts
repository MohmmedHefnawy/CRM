import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersMapService {
  usersMap= {
    '2' : 'DA',
    '3': 'AM',
    '4': 'PH',
    '5': 'GD',
    '6': 'CM',

  }
  constructor() { }
}
