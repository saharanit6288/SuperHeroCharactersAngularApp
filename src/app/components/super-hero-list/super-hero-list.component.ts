import { Component, OnInit } from '@angular/core';
import { SuperHero } from '../../models/super-hero.model';
import { SuperHeroService } from '../../services/super-hero.service';

@Component({
  selector: 'app-super-hero-list',
  templateUrl: './super-hero-list.component.html',
  styleUrls: ['./super-hero-list.component.css']
})
export class SuperHeroListComponent implements OnInit {
  heroes?: SuperHero[];
  currentHero: SuperHero = {};
  currentIndex = -1;

  constructor(private superHeroService: SuperHeroService) {}

  ngOnInit(): void {
    this.retrieveHeroes();
  }

  retrieveHeroes(): void {
    this.superHeroService.getAll().subscribe({
      next: (data) => {
        this.heroes = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  setActiveHero(hero: SuperHero, index: number): void {
    this.currentHero = hero;
    this.currentIndex = index;
  }

}
