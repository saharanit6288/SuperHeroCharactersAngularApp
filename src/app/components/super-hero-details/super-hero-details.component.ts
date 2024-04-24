import { Component, Input, OnInit } from '@angular/core';
import { SuperHeroService } from '../../services/super-hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHero } from '../../models/super-hero.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-super-hero-details',
  templateUrl: './super-hero-details.component.html',
  styleUrls: ['./super-hero-details.component.css']
})
export class SuperHeroDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentHero: SuperHero = {
    name: '',
    firstName: '',
    lastName: '',
    place: ''
  };


  constructor(
    private superHeroService: SuperHeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.getHero(this.route.snapshot.params['id']);
    }
  }

  getHero(id: string): void {
    this.superHeroService.get(id).subscribe({
      next: (data) => {
        this.currentHero = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updateHero(): void {
    this.superHeroService
      .update(this.currentHero.id, this.currentHero)
      .subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire({
            position: "top-end",
            icon: 'success',
            title: 'This Super Hero was updated successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (e) => console.error(e)
      });
  }

  deleteHero(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.superHeroService.delete(this.currentHero.id).subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire({
              position: "top-end",
              icon: 'success',
              title: 'This Super Hero was deleted successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/superheroes']);
          },
          error: (e) => console.error(e)
        });
      }
    });
    
  }
}
