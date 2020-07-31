import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login/login.service";
import { User } from "../../models/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(public httpLogin: LoginService) {}

  ngOnInit() {}

  email: string = "";
  password: string = "";
  loginAttempted: boolean = true;

  private onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.email + this.password);

    // Using Promise in httpLogin.getUsers() so that api call finishes before executing next method
    this.httpLogin.getUsers().then(() => {
      return this.printUsers();
    });
  }

  printUsers() {
    console.log("PRINTING");
    for (var i = 0; i < this.httpLogin.users.length; i++) {
      console.log(this.httpLogin.users[i].email);
    }
  }
}
