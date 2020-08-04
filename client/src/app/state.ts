import { Injectable } from "@angular/core";
@Injectable()
export class State {
  jwt: string = "";
  username: string = "";
  role: string = "";
  firstName: string = "";
  lastName: string = "";
  points: number = 0;
}