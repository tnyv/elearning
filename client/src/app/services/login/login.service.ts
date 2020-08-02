import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../models/user";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // PRODUCTION LINK: private baseUrl = '';
  // DEBUG LINK: private baseUrl = "https://localhost:5001/user";
  private baseUrl = "https://localhost:5001/user";

  users: User[];

  token: string =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJ0ZXN0QGVtYWlsLmNvbSIsIm5iZiI6MTU5NjIyODk3NywiZXhwIjoxNTk2MzE1Mzc3LCJpYXQiOjE1OTYyMjg5Nzd9.OfuCyzA0S1JJZXTzpYOYtifkn8j1Z7AvD7_e29svieatehc7kaFyX2mtcL58uxivQplXv2cc7OeFJPE3lz7sgw";

  getUsers() {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + this.token);

    // Promise used so that api call finished before executing another function
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + "/getall", { headers: headers }).subscribe(
        (res: Response) => {
          console.log(res);

          // Converting returned JSON into parsable object
          var response = JSON.parse(JSON.stringify(res));
          this.users = response.data;
          resolve();
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
