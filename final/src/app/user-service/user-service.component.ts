import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
    { id: '3', name: 'Charlie', email: 'charlie@example.com' }
  ];
  private tokens: { [userId: string]: string } = {};

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find(user => user.id === id);
  }

  generateToken(userId: string): string {
    const token = `token${userId}`;
    this.tokens[userId] = token;
    return token;
  }

  getToken(userId: string): string {
    return this.tokens[userId] || this.generateToken(userId);
  }

  getUserByToken(token: string) {
    const userId = token.replace('token', '');
    return this.getUserById(userId);
  }
}