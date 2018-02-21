import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'; 
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task';


@Component({
	selector: 'task-new',
	templateUrl: '../views/task.new.html',
	providers: [UserService,TaskService]
})
export class TaskNewComponent implements OnInit{
	public page_title: string;
	public identity;
	public token;
	public task:Task;
	public status_task;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _taskService: TaskService
	){
		this.page_title = 'New Task';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit(){
		if(this.identity == null && !this.identity.sub ){
			this._router.navigate(['/login']);
		}else{
			this.task = new Task(1,'','','new','null','null');
		}
		
	}

	onSubmit(){
		console.log(this.task);
		this._taskService.create(this.token, this.task).subscribe(
			response=> {
				this.status_task = response.status;
				if(this.status_task != 'success'){
					this.status_task = 'error';
				}else{
					this.task = response.data;
					//this._router.navigate(['/task',this.task.id]);
					this._router.navigate(['/']);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
}