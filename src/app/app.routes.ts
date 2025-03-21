import { Routes } from '@angular/router';
import { CrewListComponent } from './components/crew-list/crew-list.component';

export const routes: Routes = [
    { path: '', component: CrewListComponent },
    { path: '**', redirectTo: '' }
];
