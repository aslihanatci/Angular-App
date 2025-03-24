import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common'; 
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-language-selector',
  imports: [
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  isDropdownOpen = false;

  constructor(public languageService: LanguageService) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  changeLanguage(langCode: string): void {
    this.languageService.changeLanguage(langCode);
  }

  getCurrentLanguageName(): string {
    const currentCode = this.languageService.getCurrentLanguage();
    const language = this.languageService.availableLanguages.find(lang => lang.code === currentCode);
    return language ? language.name : 'English';
  }

}
