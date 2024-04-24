import { Component, OnInit } from '@angular/core';
import { SuperHero } from '../../models/super-hero.model';
import { SuperHeroService } from '../../services/super-hero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-super-hero',
  templateUrl: './add-super-hero.component.html',
  styleUrls: ['./add-super-hero.component.css']
})
export class AddSuperHeroComponent implements OnInit {
  hero: SuperHero = {
    name: '',
    firstName: '',
    lastName: '',
    place: ''
  };
  submitted = false;

  constructor(private superHeroService: SuperHeroService) {}

  ngOnInit() {
  }

  saveHero(): void {
    const data = {
      name: this.hero.name,
      firstName: this.hero.firstName,
      lastName: this.hero.lastName,
      place: this.hero.place,
    };

    this.superHeroService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        Swal.fire({
          position: "top-end",
          icon: 'success',
          title: 'Data saved successfully!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (e) => console.error(e)
    });
  }

  newHero(): void {
    this.submitted = false;
    this.hero = {
      name: '',
      firstName: '',
      lastName: '',
      place: ''
    };
  }
}
