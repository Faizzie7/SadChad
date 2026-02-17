import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistDirectory } from './therapist-directory';

describe('TherapistDirectory', () => {
  let component: TherapistDirectory;
  let fixture: ComponentFixture<TherapistDirectory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapistDirectory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TherapistDirectory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
