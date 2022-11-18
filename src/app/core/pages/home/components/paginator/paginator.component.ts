import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  constructor() {
    this.pagination = 1;
    this.characterCount = 0;
  }

  @Input('pagination') pagination: number;
  @Input('characterCount') characterCount: number;
  @Output() directionPages = new EventEmitter<string>();

  // Emite el evento que el usuario desea ir a una paginacion anterior
  previusPage() {
    this.directionPages.emit('prev');
  }

  // Emite el evento que el usuario desea ir a una paginacion siguiente
  nextPage() {
    this.directionPages.emit('next');
  }

  ngOnInit(): void {
  }

}
