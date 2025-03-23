import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crew } from '../../models/crew';
import { CrewService } from '../../services/crew.service';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-crew-list',
  imports: [
    MatTableModule,  
    MatPaginatorModule,
    MatSort,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './crew-list.component.html',
  styleUrl: './crew-list.component.scss'
})
export class CrewListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Crew>([]);
  displayedColumns: string[] = ['actions', 'firstName', 'lastName', 'nationality', 'title', 'daysOnBoard', 'dailyRate', 'currency', 'certificates'];


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private crewService: CrewService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCrewData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadCrewData(): void {
    this.crewService.getCrew().subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  getTotalIncome(crew: Crew): number {
    return this.crewService.calculateTotalIncome(crew);
  }

  getCertificateCount(crew: Crew): number {
    return crew.certificates!.length;
  }

  confirmDelete(crew: Crew): void {
    // const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
    //   width: '400px',
    //   data: `${crew.firstName} ${crew.lastName}`
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.crewService.deleteCrew(crew.id);
    //     this.snackBar.open('Tayfa başarıyla silindi.', 'Tamam', { duration: 3000 });
    //   }
    // });
  }

  openDialog(crew?: Crew): void {
    // const dialogRef = this.dialog.open(CrewDialogComponent, {
    //   width: '600px',
    //   data: crew ? { ...crew } : {
    //     id: 0,
    //     firstName: '',
    //     lastName: '',
    //     nationality: '',
    //     title: '',
    //     daysOnBoard: 0,
    //     dailyRate: 0,
    //     currency: 'USD',
    //     certificates: []
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     if (result.id === 0) {
    //       this.crewService.addCrew(result);
    //       this.snackBar.open('Tayfa başarıyla eklendi.', 'Tamam', { duration: 3000 });
    //     } else {
    //       this.crewService.updateCrew(result);
    //       this.snackBar.open('Tayfa bilgileri güncellendi.', 'Tamam', { duration: 3000 });
    //     }
    //   }
    // });
  }





}

