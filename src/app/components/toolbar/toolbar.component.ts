import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { HeroFormsComponent } from '../hero-forms';
import { HeroService } from 'src/app/service/hero.service';
import { HeroTableComponent } from '../hero-table';

@Component({
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatDialogModule, 
    MatMenuModule, 
    MatButtonModule
  ],
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _heroService: HeroService,
    private _tableData: HeroTableComponent
    ) {}
  ngOnInit(): void {}
  openAddEditHeroForm() {
    const dialogRef = this.dialog.open(HeroFormsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getHeroList();
        }
      },
    });
  }

  getHeroList() {
    this._heroService.getHeroList().subscribe({
      next: (res: any) => {
        this._tableData.dataSource = new MatTableDataSource(res);
        this._tableData.dataSource.sort = this._tableData.dataSource.sort;
        this._tableData.paginator = this._tableData.paginator;
      },
      error: console.log,
    });
  }
}