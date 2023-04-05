import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private fb: FormBuilder
  ) { }

  check: boolean = false
  searchText!: string
  items: any[] = [
    {
      title: "Wake up at 8.00 am",
      status: true
    },
    {
      title: "Eating",
      status: false
    }
  ]

  todo = new FormGroup({
    title: new FormControl(''),
  })
  // title = new FormControl('')

  // productForm: FormGroup = this.fb.group({
  //   todoList: this.fb.array([
  //     this.fb.group({
  //       title: '',
  //       status: false
  //     })
  //   ])
  // });

  addTodo() {
    if(this.todo.value.title != '' && this.todo.value.title != null){
      this.items.push(
        { 
          title: this.todo.value.title, 
          status: true
        }
      )
      this.todo.reset()
    } else {
      alert("Please fill task in Todo Task")
    }
  }

}
