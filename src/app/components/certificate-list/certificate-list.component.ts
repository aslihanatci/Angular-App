import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Certificate } from '../../models/certificate';
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-certificate-list',
  imports: [],
  templateUrl: './certificate-list.component.html',
  styleUrl: './certificate-list.component.scss'
})
export class CertificateListComponent implements OnInit {
  certificates: Certificate[] = [];
  displayedColumns: string[] = ['type', 'issueDate', 'expiryDate'];

  constructor(
    private certificateService: CertificateService,
    public dialogRef: MatDialogRef<CertificateListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { certificates: Certificate[], crewId: number }
  ) {
    this.certificates = data.certificates;
  }

  ngOnInit(): void {
    if (this.certificates && this.certificates.length > 0) {
      this.certificateService.enrichCertificatesWithTypeNames(this.certificates)
        .subscribe((enrichedCertificates: Certificate[]) => {
          this.certificates = enrichedCertificates;
        });
    }
  }
}
