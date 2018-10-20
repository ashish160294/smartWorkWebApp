import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() message: string;
  @Output() Close: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }
  ngOnInit() {}
  closeClicked() {
    this.Close.emit('close');
  }

}
