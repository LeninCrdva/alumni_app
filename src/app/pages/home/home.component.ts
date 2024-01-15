import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import * as $ from 'jquery';
import 'venobox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './xd.css']
})
export class HomeComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    
  }
}