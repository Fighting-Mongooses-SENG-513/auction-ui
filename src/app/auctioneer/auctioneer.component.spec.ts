import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctioneerComponent } from './auctioneer.component';

describe('AuctioneerComponent', () => {
  let component: AuctioneerComponent;
  let fixture: ComponentFixture<AuctioneerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctioneerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctioneerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
