import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
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
import { Hero } from 'src/app/models';

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
    MatButtonModule,
    NgFor, 
    NgIf
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
})
export class HeroTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 
    'name', 
    'type', 
    'publisher'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Hero | null;
  row: any;

  constructor(
    private _heroService: HeroService,
    private _coreService: CoreService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit():void {
    this.getHeroList();
  }

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