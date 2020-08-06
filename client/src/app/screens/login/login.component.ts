import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(public httpUser: UserService) {}

  ngOnInit() {
    console.log("isLogged: " + this.httpUser.isLogged());
  }

  email: string = "";
  password: string = "";
  loginAttempted: boolean = true;

  private onSubmit(event: Event) {
    event.preventDefault();

    // Using Promise in httpLogin.getUsers() so that api call finishes before executing next method
    // this.httpLogin.getUsers().then(() => {
    //   return this.printUsers();
    // });

    this.httpUser.login(this.email, this.password).then(() => {
      return this.printStatus();
    })
  }

  printUsers() {
    console.log("PRINTING");
    for (var i = 0; i < this.httpUser.users.length; i++) {
      console.log(this.httpUser.users[i].email);
    }
  }

  printStatus() {
    var jwt = localStorage.getItem('jwt');
    console.log("isLogged: " + this.httpUser.isLogged());
  }
}
