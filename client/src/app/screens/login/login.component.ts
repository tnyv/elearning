import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(public httpUser: UserService) {}

  ngOnInit() {}

  email: string = "";
  password: string = "";

  loginValid: boolean = true;

  private onSubmit(event: Event) {
    event.preventDefault();

    // Using Promise in httpLogin.getUsers() so that api call finishes before executing next method
    // this.httpUser.login(this.email, this.password).then(
    //   () => {
    //     return this.respond();
    //   },
    //   (reject) => {
    //     // this.emailValid = false;
    //     // this.emailWarning = "Email address already exists.";
    //   }
    // );

    console.log(this.isValid());
  }

  respond() {
    console.log("PRINTING");
  }

  isValid() {
    this.loginValid = true;
    var isValid = true;

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (!EMAIL_REGEXP.test(this.email)) {
      this.loginValid = false;
      isValid = false;
    }

    if (this.email == "") {
      this.loginValid = false;
      isValid = false;
    }

    if (this.password == "") {
      this.loginValid = false;
      isValid = false;
    }

    return isValid;
  }
}
