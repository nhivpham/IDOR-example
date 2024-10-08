import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from './user.interface'

interface APIResponse {
  user: User
  message?: string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)
  token = "token1"

  getUser(id: string) {
    return this.http.get<APIResponse>(`/api/user/${id}`, {
      headers: {
        "Authorization": this.token
      }
    })
  }

}