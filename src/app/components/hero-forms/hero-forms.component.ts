import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HeroService } from 'src/app/service/hero.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CoreService } from 'src/app/service/core/core.service';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-hero-forms',
  templateUrl: './hero-forms.component.html',
  styleUrls: ['./hero-forms.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    FormsModule, 
    MatButtonModule, 
    MatDatepickerModule, 
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
  ],
})
export class HeroFormsComponent implements OnInit {
  heroForm: FormGroup;

  publisher: string[] = [
    'Marvel Comics',
    'DC Comics',
    'Xmen Comics',
  ];

  constructor(
    private _fb: FormBuilder,
    private _heroService: HeroService,
    private _dialogRef: MatDialogRef<HeroFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.heroForm = this._fb.group({
      name: '',
      real_name: '',
      dob: '',
      type: '',
      publisher: '',
      company: '',
      story: '',
    });
  }

  ngOnInit(): void {
    this.heroForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.heroForm.valid) {
      if (this.data) {
        this._heroService
          .updateHero(this.data.id, this.heroForm.value)
          .subscribe({
            next: (_val: any) => {
              this._coreService.openSnackBar('Hero detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._heroService.addHero(this.heroForm.value).subscribe({
          next: (_val: any) => {
            this._coreService.openSnackBar('Hero added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
