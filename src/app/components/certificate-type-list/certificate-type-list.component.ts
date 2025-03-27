import { Component, AfterViewInit, ViewChild} from '@angular/core';
import { CertificateType } from '../../models/certificate-type';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog,  MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { CertificateTypeService } from '../../services/certificate-type.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { CertificateTypeFormComponent } from '../certificate-type-form/certificate-type-form.component';
@Component({
  selector: 'app-certificate-type-list',
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    TranslateModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './certificate-type-list.component.html',
  styleUrl: './certificate-type-list.component.scss'
})
export class CertificateTypeListComponent implements AfterViewInit{
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CertificateType>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private certificateTypeService: CertificateTypeService, 
    private dialog: MatDialog) {}

    ngOnInit() {
      this.certificateTypeService.certificateTypes$.subscribe(certificates => {
        this.dataSource.data = certificates;
      });
      this.certificateTypeService. getCertificateTypes();  
    }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    openCertificateForm(certificateType?: CertificateType) {
      const dialogRef = this.dialog.open(CertificateTypeFormComponent, {
        width: '400px',
        data: certificateType || { id: null, name: '', description: '' }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.id) {
            this.certificateTypeService.updateCertificateType(result).subscribe();
          } else {
            this.certificateTypeService. addCertificateType(result).subscribe();
          }
        }
      });
    }
  
    confirmDelete(certificateType: CertificateType) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        data: { message: `${certificateType.name} adlı sertifikayı silmek istiyor musunuz?` }
      });
  
      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.certificateTypeService.deleteCertificateType(certificateType.id!).subscribe();
        }
      });
    }
}
