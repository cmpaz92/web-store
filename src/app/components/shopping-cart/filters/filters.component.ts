import {Component, OnInit} from '@angular/core';
import {CategoryMessengerService} from "../../../services/category-messenger.service";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  categories: Object = []
  category = ''
  name = ''

  constructor(private filter: CategoryMessengerService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategories()
  }

  sendMessage(category): void {
    // send message to subscribers via observable subject
    this.filter.sendFilter('category');
  }

  clearCategory(): void {
    // clear messages
    this.filter.clearFilter();
  }

  onChange(newValue: string) {
    this.category = newValue;
    this.filter.sendFilter(this.category);
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((category) => {
      this.categories = category
    })
  }

}
