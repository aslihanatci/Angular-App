import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { NgFor, CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-language-selector',
  imports: [
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatMenuTrigger
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
