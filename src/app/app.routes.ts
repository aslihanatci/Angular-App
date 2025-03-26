import { Routes } from '@angular/router';
import { CrewListComponent } from './components/crew-list/crew-list.component';
import { CrewCardComponent } from './components/crew-card/crew-card.component';
import { CertificateTypeListComponent } from './components/certificate-type-list/certificate-type-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'crews', pathMatch: 'full' },
    { path: 'crews', component: CrewListComponent },
    { path: 'crew/:id', component: CrewCardComponent }, 
    { path: 'certificate-type-list', component: CertificateTypeListComponent },
    { path: '**', redirectTo: '' }
];
