import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "../../models/user";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // PRODUCTION LINK: private baseUrl = '';
  // DEBUG LINK: private baseUrl = "https://localhost:5001/user";
  private baseUrl = "https://localhost:5001/user";

  // Use for getUsers() method below. Only Admin & Instructor roles are allowed to utilize this.
  users: User[];

  login(username: string, password: string) {
    const headers = { "Content-Type": "application/json" };
    const body = { email: username, password: password };

    return new Promise((resolve, reject) => {
      this.http
        .post<any>(this.baseUrl + "/login", body, { headers })
        .subscribe((res: Response) => {
          console.log(res);

          // Converting returned JSON into parsable object
          var response = JSON.parse(JSON.stringify(res));

          // Set global states
          // this.state.jwt = response.data;

          // Storing jwt in browser's localstorage
          localStorage.setItem("jwt", response.data);

          resolve();
        });
    });
  }

  // One instance of jwt is stored on clientsude "state.ts" file in directory and another
  // is stored in browser's localstorage upon successfully logging in. This isLogged() will
  // be called each time user navigates to a page where login status needs to be verified.
  isLogged() {
    // return localStorage.getItem("jwt") == this.state.jwt;
  }

  getUsers() {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    // headers.append("Authorization", "Bearer " + this.state.jwt);

    // Promise used so that api call finishes before executing another function
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
