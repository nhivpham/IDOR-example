import { Component, inject, Input, OnChanges} from "@angular/core";
import { NgClass, NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { User } from "../../user.interface";
import { UserService } from "../../user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  imports: [ NgOptimizedImage, NgClass, FormsModule ],
  standalone: true,
  styleUrl: "./profile.component.css"
})
export class ProfilePage implements OnChanges {
  @Input() userId!: string
  user: User | null = null
  userService = inject(UserService)
  error = ""

  ngOnChanges(): void {
    this.user = null
    this.userService.getUser(this.userId).subscribe({
      next: (resp) => {  
        console.log("resp in proile is ", resp)
        this.user = resp.user
        this.error = ""
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.error = error.body.error
      }
    })
  }

}