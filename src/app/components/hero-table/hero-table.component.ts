import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeroFormsComponent } from '../hero-forms/hero-forms.component';
import { HeroService } from 'src/app/service/hero.service';
import { CoreService } from 'src/app/service/core/core.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-table',
  standalone: true,
  imports: [
    CommonModule, 
    MatPaginatorModule, 
    MatTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSortModule, 
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
})
export class HeroTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 
    'name', 
    'type', 
    'publisher', 
    'actionbutton'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _heroService: HeroService,
    private _coreService: CoreService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit():void {
    this.getHeroList();
  }
  // openAddEditHeroForm() {
  //   const dialogRef = this._dialog.open(HeroFormsComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next: (val: any) => {
  //       if (val) {
  //         this.getHeroList();
  //       }
  //     },
  //   });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteHero(id: number) {
    this._heroService.deleteHero(id).subscribe({
      next: (_res: any) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this._heroService.getHeroList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(HeroFormsComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this._heroService.getHeroList();
        }
      },
    });
  }
  
  getHeroList() {
    this._heroService.getHeroList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

}