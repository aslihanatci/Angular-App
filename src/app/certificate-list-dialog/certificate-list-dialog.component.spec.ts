import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateListDialogComponent } from './certificate-list-dialog.component';

describe('CertificateListDialogComponent', () => {
  let component: CertificateListDialogComponent;
  let fixture: ComponentFixture<CertificateListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateListDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
