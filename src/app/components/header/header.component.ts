import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-header',
  imports: [
    LanguageSelectorComponent, 
    MatToolbarModule,
    TranslateModule,
    RouterModule,
    MatButtonModule 
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router) {}

}
