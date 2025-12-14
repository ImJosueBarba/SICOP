import { Component, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, Sidebar, Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  encapsulation: ViewEncapsulation.None
})
export class MainLayout {
  @ViewChild(Sidebar) sidebar!: Sidebar;
  
  sidebarOpen = signal(true);

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.toggleSidebar();
    }
  }

  toggleSidebarMobile() {
    this.sidebarOpen.update(val => !val);
  }

  get sidebarCollapsed() {
    return this.sidebar?.sidebarCollapsed() || false;
  }
}
