import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
          password: ['', [Validators.required, Validators.minLength(6)]]
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
      this.accountService.register(this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                Swal.fire({
                  position: "top-end",
                  icon: 'success',
                  title: 'Registration successful!',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigate(['/account/login'], { queryParams: { registered: true }});
              },
              error: error => {
                Swal.fire({
                  position: "top-end",
                  icon: 'error',
                  title: 'Error Occured!',
                  showConfirmButton: false,
                  timer: 2000
                });
                //this.error = error;
                this.loading = false;
              }
          });
  }
}