import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'; 
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task';


@Component({
	selector: 'task-detail',
	templateUrl: '../views/task.detail.html',
	providers: [UserService,TaskService]
})
export class TaskDetailComponent implements OnInit{
	public page_title: string;
	public identity;
	public token;
	public task:Task;
	public status_task;
	public loading;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _taskService: TaskService
	){
		this.page_title = 'Task Detail';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit(){
		if(this.identity && this.identity.sub){
			//call the task service
			this.getTask();
		}else{
			this._router.navigate(['/login']);
		}
	}

	getTask(){
		this.loading = 'show';
		this._route.params.forEach((params: Params) => {
			let id = +params['id'];

			this._taskService.getTask(this.token, id).subscribe(
				response => {
					
					if(response.status == 'success'){
						
						if(response.data.users.id == this.identity.sub){
							this.task = response.data;

							console.log(this.task);

							this.loading = 'hide';
						}else{
							this._router.navigate(['/']);
						}

					}else{
						this._router.navigate(['/login']);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	deleteTask(id){
		this._taskService.deleteTask(this.token, id).subscribe(
			response => {
				if(response.status == 'success'){
					this._router.navigate(['/']);
				}else{
					alert('Task was not deleted');
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
	}
}