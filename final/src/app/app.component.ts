import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'secure-code';
  router = inject(Router)
  activated = inject(ActivatedRoute)

  users = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' }
  ];

  selectedUser = "1"

  changeSelectedUser(event: Event) {
    const value = (event.target as HTMLSelectElement).value
    this.selectedUser = value
    this.router.navigate(['profile', value])


  }

}
