import { Routes } from '@angular/router';
import { CrewListComponent } from './components/crew-list/crew-list.component';
import { CrewCardComponent } from './components/crew-card/crew-card.component';

export const routes: Routes = [
    { path: '', component: CrewListComponent },
    { path: 'crew/:id', component: CrewCardComponent },
    { path: '**', redirectTo: '' }
];
