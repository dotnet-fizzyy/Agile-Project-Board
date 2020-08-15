import { Component, Input, OnInit } from '@angular/core';
import {ISelectItem, IStory} from "../../utils/interfaces";
import { mockedStories } from "../../utils/constants/mocks";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  constructor() { }

  @Input() public column: ISelectItem;
  public stories: IStory[];

  ngOnInit(): void {
    this.stories = mockedStories.filter(story => story.column === this.column.value);
  }

}
