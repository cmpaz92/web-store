import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductService} from 'src/app/services/product.service';
import {CategoryService} from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  form: FormGroup;
  loading: boolean;
  error: Error = null;
  public obj: any = {};
  categories: Object = []
  selectedFile: File = null;
  fd = new FormData();

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router, private categoryService: CategoryService) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      media: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((category) => {
      this.categories = category
    })
  }

  onFileSelect(input) {
    console.log(input.files);
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.obj.media = e.target.result;
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    this.obj.media = this.selectedFile
  }

  onSubmit() {
    if (this.form.valid) {
      const {name, description, price, category} = this.form.value;
      this.obj.name = name
      this.obj.description = description
      this.obj.price = price
      this.obj.category = category
      this.loading = true;
      this.error = null;
      console.log(this.obj.media)
      //const product = new Product(0,name,description,price, category, media);
      this.productService.createProduct(this.obj)
    }
  }

}
