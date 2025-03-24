import { Component, Inject, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CertificateFormComponent } from '../certificate-form/certificate-form.component';
import { Certificate } from '../../models/certificate';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule, AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CertificateType } from '../../models/certificate-type';
import { CertificateTypeService } from '../../services/certificate-type.service';

@Component({
  selector: 'certificate-type-form',
  imports: [
    TranslateModule, 
    MatDialogModule, 
    MatIconModule, 
    MatListModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './certificate-type-form.component.html',
  styleUrl: './certificate-type-form.component.scss'
})
export class CertificateTypeFormComponent implements OnInit {
  certificateTypeForm!: FormGroup;
  certificateTypes$ = new BehaviorSubject<CertificateType[]>([]);
  displayedColumns: string[] = ['name', 'description', 'actions'];
  editingCertificateType: CertificateType | null = null; 

  constructor(
    private fb: FormBuilder,
    private certificateTypeService: CertificateTypeService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CertificateFormComponent>,,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.certificateTypeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.certificateTypeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }



  saveCertificateType(): void {
    if (this.certificateTypeForm.invalid) return;

    const formData = this.certificateTypeForm.value;
    
      this.certificateTypeService.addCertificateType(formData);
      this.dialogRef.close(formData);
  }


}
