import { Component, Inject, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Crew } from '../../models/crew';
import { CrewService } from '../../services/crew.service';
import { CertificateFormComponent } from '../certificate-form/certificate-form.component';
import { Certificate } from '../../models/certificate';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crew-form',
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
    MatButtonModule
  ],
  templateUrl: './crew-form.component.html',
  styleUrl: './crew-form.component.scss'
})
export class CrewFormComponent implements OnInit {
  @Input() crewData: any;
  crewForm: FormGroup;
  certificates: Certificate[] = [];
  titles: string[] = ['Captain', 'First Officer', 'Engineer', 'Deckhand', 'Steward'];
  nationalities: string[] = ['United States', 'United Kingdom', 'France', 'Germany', 'Spain', 'Italy', 'Turkey'];
  currencies: string[] = ['USD', 'EUR', 'GBP', 'TRY'];
  constructor(
    private fb: FormBuilder,
    private crewService: CrewService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CrewFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { crew?: Crew }
  ) {
    this.crewForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      title: ['', Validators.required],
      daysOnBoard: ['', [Validators.required, Validators.min(1)]],
      dailyRate: ['', [Validators.required, Validators.min(1)]],
      currency: ['', Validators.required]
    });

    if (data.crew) {
      this.crewForm.patchValue(data.crew);
      this.certificates = data.crew.certificates || [];
    }
  }

  ngOnInit(): void {
    if (this.data && this.data.crew) {
      this.crewForm.patchValue(this.data.crew);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCertificate(): void {
    const dialogRef = this.dialog.open(CertificateFormComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.certificates.push(result);
      }
    });
  }

  save(): void {
    if (this.crewForm.valid) {
      const crewData: Crew = {
        ...this.crewForm.value,
        certificates: this.certificates
      };

      if (this.data.crew?.id) {
        crewData.id = this.data.crew.id;
        this.crewService.updateCrew(crewData);
      } else {
        this.crewService.addCrew(crewData);
      }

      this.dialogRef.close(crewData);
    }
  }
}
