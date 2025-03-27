import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Crew } from '../models/crew';
import { Certificate } from '../models/certificate';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-certificate-list-dialog',
  imports: [
    TranslateModule, 
    MatDialogModule,
    CommonModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './certificate-list-dialog.component.html',
  styleUrls: ['./certificate-list-dialog.component.scss']
})
export class CertificateListDialogComponent implements OnInit{
  certificates: Certificate[] = []; 
  dataSource: MatTableDataSource<Certificate> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'issueDate', 'expiryDate'];

  constructor(
    public dialogRef: MatDialogRef<CertificateListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { crew: Crew }
  ) {}

  ngOnInit(): void {
    this.certificates = this.data.crew.certificates || [];
    this.dataSource = new MatTableDataSource(this.certificates);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
