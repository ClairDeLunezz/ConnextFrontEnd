import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuscontatosComponent } from './meuscontatos.component';

describe('MeuscontatosComponent', () => {
  let component: MeuscontatosComponent;
  let fixture: ComponentFixture<MeuscontatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeuscontatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeuscontatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
