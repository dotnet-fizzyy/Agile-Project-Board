import {Component, Input, OnInit} from '@angular/core';
import {IStory} from "../../utils/interfaces";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() public story: IStory;

  constructor() { }

  ngOnInit(): void {
  }

  onClick = () => {
    console.log('click');
  }

}
