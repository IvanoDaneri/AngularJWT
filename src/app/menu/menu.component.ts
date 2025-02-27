import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IMenuStructure } from "../interfaces/menu"

/*
  MenuComponent is the component to create an horizontal menu.
  MenuComponent gets an input structure (IMenuStructure) to receave menu items details
  and use ngFor directive to create an horizontal menu with router url linked to menu items
*/

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() menuStructureList!: IMenuStructure[];

}
