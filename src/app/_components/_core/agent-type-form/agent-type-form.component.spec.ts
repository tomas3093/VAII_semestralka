import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTypeFormComponent } from './agent-type-form.component';

describe('AgentTypeFormComponent', () => {
  let component: AgentTypeFormComponent;
  let fixture: ComponentFixture<AgentTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
