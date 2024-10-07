import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user-service/user-service.component';

@Component({
  selector: 'app-idor-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './idor-demo.component.html',
  styleUrls: ['./idor-demo.component.css']
})
export class IdorDemoComponent implements OnInit {
  users: any[] = [];
  selectedUserId: string = '1';
  attemptedUserId: string = '1';
  userDetails: any;
  error: string = '';

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.route.params.subscribe(params => {
      this.attemptedUserId = params['userId'] || '1';
      this.getUserDetails();
    });
  }

  getUserDetails() {
    const token = this.userService.getToken(this.selectedUserId);
    const headers = new HttpHeaders({
      'Authorization': token
    });

    if (this.attemptedUserId === this.selectedUserId) {
      this.http.get(`/api/user/${this.selectedUserId}`, { headers }).subscribe({
        next: (data: any) => {
          this.userDetails = data;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.error || 'Error fetching user details';
          this.userDetails = null;
        }
      });
    } else {
      this.error = 'Error fetching user details: Access denied.';
      this.userDetails = null;
    }
  }

  login() {
    this.getUserDetails();
    this.router.navigate(['/profile', this.selectedUserId]);
  }

  changeProfile() {
    this.router.navigate(['/profile', this.attemptedUserId]);
    this.getUserDetails();
  }
}