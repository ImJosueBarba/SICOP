import { Component, EventEmitter, Output, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  encapsulation: ViewEncapsulation.None
})
export class Header {
  private authService = inject(AuthService);
  
  @Output() toggleSidebar = new EventEmitter<void>();
  
  currentUser: any = null;
  showUserMenu = false;
  darkMode = false;

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      this.darkMode = JSON.parse(savedDarkMode);
      this.applyDarkMode();
    }
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
    this.applyDarkMode();
    console.log('Dark mode toggled:', this.darkMode);
    console.log('HTML classes:', document.documentElement.classList.toString());
  }

  private applyDarkMode() {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    if (this.darkMode) {
      htmlElement.classList.add('dark');
      bodyElement.classList.add('dark');
      htmlElement.style.backgroundColor = '#0f172a';
      bodyElement.style.backgroundColor = '#0f172a';
      console.log('Dark mode ACTIVATED');
    } else {
      htmlElement.classList.remove('dark');
      bodyElement.classList.remove('dark');
      htmlElement.style.backgroundColor = '';
      bodyElement.style.backgroundColor = '';
      console.log('Dark mode DEACTIVATED');
    }
    console.log('HTML element classes:', htmlElement.className);
  }

  logout() {
    this.authService.logout();
    this.showUserMenu = false;
  }
}
