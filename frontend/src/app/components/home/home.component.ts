import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TodoService } from 'src/app/service/todo.service';
import { Clipboard } from '@angular/cdk/clipboard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private clipboard: Clipboard
  ) {
    this.onLoading();
  }

  check: boolean = false
  searchText!: string
  items!: any[]
  show_alert_del: boolean = true
  statusUpdate: boolean = false

  onLoading() {
    console.log("onLoading start!")
    try {
      this.todoService.getAllTodo().subscribe(
        data => {
          this.items = data
        },
        err => {
          console.log(err);
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  todo = new FormGroup({
    title: new FormControl(''),
    datetime: new FormControl(''),
  })

  async addTodo() {
    if (
      this.todo.value.title != '' &&
      this.todo.value.title != null
    ) {
      await this.todoService.addTodo(
        {
          title: this.todo.value.title,
          status: false,
          datetime: this.todo.value.datetime
        }
      ).subscribe(response => {
        console.log(response);
        this.todo.reset()
        this.onLoading()
      });
    } else {
      alert("Please fill all fields")
    }
  }

  changeStatus(index: number, item: any) {
    // console.log("status", status)
    // this.statusUpdate = Boolean(item.status);
    if (item.status === "true") {
      this.statusUpdate = false
    } else {
      this.statusUpdate = true
    }
    const todoData = {
      title: item.title,
      status: this.statusUpdate
    }
    this.todoService.updateTodo(item._id, todoData).subscribe(response => {
      this.onLoading()
      console.log(response)
    });
  }

  deleteTodo(index: number) {
    this.todoService.deleteTodo(this.items[index]._id).subscribe(response => {
      this.onLoading()
      console.log(response)
    })
  }

  deleteCheck(index: number) {
    if (this.show_alert_del) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        input: 'checkbox',
        inputPlaceholder: "Don't ask me again",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true
      }).then((result) => {
        console.log(result)
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your todo has been deleted.',
            'success'
          )
          this.deleteTodo(index)
        }
        if (result.value == 1) {
          this.show_alert_del = false
        }
      }
      )
    } else {
      this.deleteTodo(index)
    }
  }

  formatDate(date: Date) {
    var dateStr = String(date)
    var year = dateStr.substring(0, 4)
    var month = dateStr.substring(5, 7)
    var day = dateStr.substring(8, 10)
    return day + "/" + month + "/" + year
  }

  formatTime(date: Date) {
    if(date == null){
      return "-"
    } else {
      var dateStr = String(date)
      var hour = String(Number(dateStr.substring(11, 13)) + 7)
      var minute = dateStr.substring(14, 16)
      return hour + ":" + minute
    }
  }

  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
}
}
