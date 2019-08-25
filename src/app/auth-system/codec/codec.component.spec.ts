import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodecComponent } from './codec.component';

describe('CodecComponent', () => {
  let component: CodecComponent;
  let fixture: ComponentFixture<CodecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
