import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "../../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  // PRODUCTION LINK: private baseUrl = '';
  // DEBUG LINK: private baseUrl = "https://localhost:5001/user";
  private baseUrl = "https://localhost:5001/user";

  // Use for getUsers() method below. Only Admin & Instructor roles are allowed to utilize this.
  users: User[];

  login(email: string, password: string) {
    const headers = { "Content-Type": "application/json" };
    const body = { email: email, password: password };

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

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    organization: string
  ) {
    const headers = { "Content-Type": "application/json" };
    const body = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      organization: organization,
    };

    return new Promise((resolve, reject) => {
      this.http
        .post<any>(this.baseUrl + "/register", body, { headers })
        .subscribe(
          (res: Response) => {
            resolve();
          },
          (error) => {
            reject();
          }
        );
    });
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
