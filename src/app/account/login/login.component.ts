import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
      // redirect to home if already logged in
      if (this.accountService.userValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.form = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  onSubmit() {
    this.submitted = true;

    // reset alert on submit
    this.error = '';

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.login(this.form.controls.email.value, this.form.controls.password.value)
        .pipe(first())
        .subscribe({
            next: () => {
              Swal.fire({
                position: "top-end",
                icon: 'success',
                title: 'Login successful!',
                showConfirmButton: false,
                timer: 1500
              });
              // get return url from query parameters or default to home page
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
              this.router.navigateByUrl(returnUrl);
            },
            error: error => {
              Swal.fire({
                position: "top-end",
                icon: 'error',
                title: 'Username/Email or Password Not Found!',
                showConfirmButton: false,
                timer: 2000
              });
              //this.error = error;
              this.loading = false;
            }
        });
  }
}
