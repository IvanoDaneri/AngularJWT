import { Component } from '@angular/core';
import { StandaloneFooterComponent } from '../standalone-footer/standalone-footer.component';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [StandaloneFooterComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

}
