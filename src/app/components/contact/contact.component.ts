import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { List } from '../../../List';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  lists: List[];    
  name: string;
  email: string;
  pnumber: number;
  _id: number;
  
  constructor(private taskService:TaskService) { 
  this.taskService.getTasks()
            .subscribe(lists =>{
               this.lists = lists;
               console.log("getting the list from the database")
            });
        
  }
  
  ngOnInit() {
        
  }
  
  addTask(event){
    event.preventDefault();
    console.log(this.name);
    var newtask = {
    name : this.name,
    email : this.email,
    pnumber : this.pnumber
    }
    
    this.taskService.addTask(newtask)
        .subscribe(list => {
            this.lists.push(list);
            this.name = '';
            this.email = '';
            this.pnumber = null;
            console.log(this.lists);
        });
        
  }
  
  deleteTask(id){
    var lists = this.lists; 
    this.taskService.deleteTask(id).subscribe(data => {
        if(data.n == 1){
            for(var i = 0; i < lists.length;i++){

                if(lists[i]._id == id){
                        lists.splice(i, 1);

                }
            }
        }
    });
  }
  
  
  update(list){
    console.log('update is working');
    var _list = {
        _id:list._id,
        name : list.name,
        email : list.email,
        pnumber : list.pnumber
        }
    
    console.log(_list);
    
    this.taskService.update(_list).subscribe(_list => {
        if(_list.n == 1){
            for(var i = 0; i < _list.length;i++){
            
                this.lists.push(_list);

            }
        }
    });
  }

}
