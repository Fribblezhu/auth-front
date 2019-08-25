import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodecEditComponent } from './codec-edit.component';

describe('CodecEditComponent', () => {
  let component: CodecEditComponent;
  let fixture: ComponentFixture<CodecEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodecEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodecEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
