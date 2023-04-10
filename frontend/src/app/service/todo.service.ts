import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient,
  ) { }

  todo!: any

  addTodo(todoData: any) {
    console.log('service post start!', todoData)
    // return this.http.post<any>('http://localhost:3000/todo', todoData)
    //   .pipe(map(datas => {
    //     console.log('service post http', datas)
    //     return datas;
    //   }))
    return this.http.post<any>('http://localhost:3000/todo', todoData)
  }

  getAllTodo() {
    return this.http.get<any>('http://localhost:3000/todo')
      .pipe(map(datas => {
        if (datas) {
          this.todo = datas;
        }
        console.log('service get', this.todo)
        return this.todo;
      }))
  }

  updateTodo(_id: string, todoData: any) {
    return this.http.patch<any>('http://localhost:3000/todo/' + _id, todoData);
  } 

  deleteTodo(_id: string) {
    return this.http.delete<any>('http://localhost:3000/todo/' + _id)
  }

}
