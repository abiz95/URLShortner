import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/admin/service/adminAuth/admin-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe : EventEmitter<any> = new EventEmitter();
  
  constructor(private adminAuth: AdminAuthService, private router: Router) { }

  ngOnInit() {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 300);
  }

  logoutAdmin() {
    this.adminAuth.logout();
  }

  profileLink() {
    console.log('Navigate to profile')
    this.router.navigate(['admin/profile'])
  }
  
}
