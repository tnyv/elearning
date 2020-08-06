import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(public httpUser: UserService) {}

  ngOnInit() {}

  firstName: string = "";
  lastName: string = "";
  organization: string = "";
  email: string = "";
  password1: string = "";
  password2: string = "";

  firstNameValid: boolean = true;
  lastNameValid: boolean = true;

  emailValid: boolean = true;
  emailWarning: string = "";

  pwLengthValid: boolean = true;
  pwMatch: boolean = true;

  onSubmit($event) {
    $event.preventDefault();

    if (this.isValid()) {
      this.httpUser
        .register(
          this.email,
          this.password1,
          this.firstName,
          this.lastName,
          this.organization
        )
        .then(
          () => {
            return this.respond();
          },
          (reject) => {
            this.emailValid = false;
            this.emailWarning = "Email address already exists.";
          }
        );
    }
  }

  respond() {
    var responseMessage = localStorage.getItem("registrationResponse");
    console.log(responseMessage);
  }

  isValid(): boolean {
    this.reset();
    var isValid = true;

    if (this.firstName == "") {
      this.firstNameValid = false;
      isValid = false;
    }

    if (this.lastName == "") {
      this.lastNameValid = false;
      isValid = false;
    }

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (!EMAIL_REGEXP.test(this.email)) {
      this.emailValid = false;
      this.emailWarning = "Email address is invalid.";
      isValid = false;
    }

    if (this.email == "") {
      this.emailValid = false;
      this.emailWarning = "Email address cannot be empty.";
      isValid = false;
    }

    if (this.password1.length <= 5) {
      this.pwLengthValid = false;
      isValid = false;
    }

    if (this.password1 != this.password2) {
      this.pwMatch = false;
      isValid = false;
    }

    return isValid;
  }

  reset() {
    this.firstNameValid = true;
    this.lastNameValid = true;
    this.emailValid = true;
    this.emailWarning = "";
    this.pwLengthValid = true;
    this.pwMatch = true;
  }
}
