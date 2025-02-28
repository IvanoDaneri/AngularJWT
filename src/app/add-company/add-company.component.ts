import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StandaloneFooterComponent } from '../standalone-footer/standalone-footer.component';
import { CompanyService } from '../services/company.service';
import { ICompany } from "../interfaces/company"


@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    StandaloneFooterComponent],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.css'
})
export class AddCompanyComponent {

  companyService: CompanyService = inject(CompanyService);

  applyForm = new FormGroup({
    companyName: new FormControl(''),
    companyCode: new FormControl(''),
    companyAdress: new FormControl(''),
    companyType: new FormControl('')
  });

  submitApplication() {
    this.companyService.addCompany(
      this.applyForm.value.companyName ?? '',
      this.applyForm.value.companyCode ?? '',
      this.applyForm.value.companyAdress ?? '',
      this.applyForm.value.companyType ?? ''
    );
  }  


}
