import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersLocationsComponent } from './characters-locations.component';

describe('CharactersLocationsComponent', () => {
  let component: CharactersLocationsComponent;
  let fixture: ComponentFixture<CharactersLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactersLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
