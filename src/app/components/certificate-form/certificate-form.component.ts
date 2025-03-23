import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { Certificate } from '../../models/certificate';
import { CertificateType } from '../../models/certificate-type';
import { CertificateTypeService } from '../../services/certificate-type.service';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-certificate-form',
  imports: [
    TranslateModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule 
  ],
  templateUrl: './certificate-form.component.html',
  styleUrl: './certificate-form.component.scss'
})
export class CertificateFormComponent implements OnInit{
  certificateForm: FormGroup;
  certificateTypes$: Observable<CertificateType[]>;

  constructor(
    private fb: FormBuilder,
    private certificateTypeService: CertificateTypeService,
    public dialogRef: MatDialogRef<CertificateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.certificateForm = this.fb.group({
      certificateTypeId: ['', Validators.required],
      issueDate: [new Date(), Validators.required],
      expiryDate: [new Date(new Date().setFullYear(new Date().getFullYear() + 2)), Validators.required]
    });

    this.certificateTypes$ = this.certificateTypeService.getCertificateTypes();
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.certificateForm.valid) {
      // Sertifika tipi adını eklemek için
      this.certificateTypeService.getCertificateTypeById(this.certificateForm.value.certificateTypeId)
        .subscribe((certificateType: CertificateType | undefined) => {
          if (certificateType) {
            const certificate: Certificate = {
              ...this.certificateForm.value,
              certificateTypeName: certificateType.name
            };
            
            this.dialogRef.close(certificate);
          } else {
            // certificateType undefined ise yapılacak işlem
            console.error('Sertifika tipi bulunamadı.');
          }
        });
    }
  }

}
