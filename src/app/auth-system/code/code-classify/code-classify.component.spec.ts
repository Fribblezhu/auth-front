import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeClassifyComponent } from './code-classify.component';

describe('CodeClassifyComponent', () => {
  let component: CodeClassifyComponent;
  let fixture: ComponentFixture<CodeClassifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeClassifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeClassifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
