import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-tab-data-selection',
  templateUrl: './tab-data-selection.component.html',
  styleUrls: ['./tab-data-selection.component.css'],
})
export class TabDataSelectionComponent {
  selectedTabIndex = 0; // Index de l'onglet sélectionné, par défaut le premier onglet (index 0).

  onTabChange(event: MatTabChangeEvent) {
    // Mettre à jour l'index de l'onglet sélectionné.
    this.selectedTabIndex = event.index;
  }
}
