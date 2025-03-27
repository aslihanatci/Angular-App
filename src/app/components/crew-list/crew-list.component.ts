import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crew } from '../../models/crew';
import { CrewService } from '../../services/crew.service';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CrewFormComponent } from '../crew-form/crew-form.component';
import { CertificateFormComponent } from '../certificate-form/certificate-form.component';
import { CertificateTypeFormComponent } from '../certificate-type-form/certificate-type-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CertificateType } from '../../models/certificate-type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { CertificateListDialogComponent } from '../../certificate-list-dialog/certificate-list-dialog.component';

@Component({
  selector: 'app-crew-list',
  imports: [
    MatTableModule,  
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    TranslateModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    MatListModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './crew-list.component.html',
  styleUrl: './crew-list.component.scss'
})
export class CrewListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Crew>([]);
  crewList: Crew[] = [];
  displayedColumns: string[] = ['actions', 'firstName', 'lastName', 'nationality', 'title', 'daysOnBoard', 'dailyRate', 'currency', 'discount', 'totalIncome', 'certificates'];
  currencyTotals: { [currency: string]: number } = {};

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private crewService: CrewService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCrewData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadCrewData(): void {
    this.crewService.getCrew().subscribe((crews: Crew[]) => {
      this.dataSource = new MatTableDataSource(crews);
      this.crewList = crews;
      this.cdRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.calculateTotalIncomeByCurrency();
    });
  }

  onDiscountChange(crew: Crew) {
    this.calculateTotalIncomeByCurrency();
  }

  calculateTotalIncomeByCurrency(): void {
    this.currencyTotals = {};
    
    this.crewList.forEach((crew: Crew) => {
      const totalIncome = this.getTotalIncome(crew); 
      if (this.currencyTotals[crew.currency]) {
        this.currencyTotals[crew.currency] += totalIncome; 
      } else {
        this.currencyTotals[crew.currency] = totalIncome; 
      }
    });
  }

  getTotalIncome(crew: Crew): number {
    let totalIncome = this.crewService.calculateTotalIncome(crew);

    if (crew.discount) {
      totalIncome -= (totalIncome * crew.discount) / 100; 
    }

    return totalIncome;
  }

  getCertificateCount(crew: Crew): number {
    return crew.certificates!.length;
  }

  confirmDelete(crew: Crew): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Silme Onayı',
        message: 'Bu ekibi silmek istediğinizden emin misiniz?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crewService.deleteCrew(crew.id!);
        this.snackBar.open('Tayfa başarıyla silindi.', 'Tamam', { duration: 3000 });
      }
    });
  }

  openCrewForm(crew?: Crew): void {
    const dialogRef = this.dialog.open(CrewFormComponent, {
      width: '600px',
      disableClose: true, 
      restoreFocus: false,
      data: { crew }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadCrewData(); 
      }
    });
  }


  openCertificateForm(certificateType?: CertificateType): void {
    const dialogRef = this.dialog.open(CertificateTypeFormComponent, {
      width: '600px',
      data: { certificateType}
    });
  }

  openCertificateDialog(crew: Crew): void {
    this.dialog.open(CertificateListDialogComponent, {
      width: '600px',
      data: { crew: crew }
    });
  }




}

