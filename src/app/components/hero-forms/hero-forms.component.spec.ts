import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFormsComponent } from './hero-forms.component';

describe('HeroFormsComponent', () => {
  let component: HeroFormsComponent;
  let fixture: ComponentFixture<HeroFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroFormsComponent]
    });
    fixture = TestBed.createComponent(HeroFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
