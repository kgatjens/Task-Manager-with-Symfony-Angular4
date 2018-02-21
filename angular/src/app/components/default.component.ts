import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task'; 

@Component({
	selector: 'default',
	templateUrl: '../views/default.html',
	providers: [UserService, TaskService]
})
export class DefaultComponent implements OnInit{
	public title: string;
	public identity;
	public token;
	public tasks: Array<Task>;
	public pages;
	public pagePrev;
	public pageNext;
	public loading;

	constructor(
		private _route	: ActivatedRoute,
		private _router	: Router,
		private _userService: UserService,
		private _taskService: TaskService
	){
		this.title = 'Homepage';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit(){
		console.log('Default component created!');
		this.getAllTask();
	}

	getAllTask(){
		this._route.params.forEach((params: Params) => {
			let page = +params['page'];

			if(!page){
				page=1;
			}

			this.loading = 'show';
			this._taskService.getTasks(this.token, page).subscribe(
				response => {
					if(response.status == 'success'){
						this.tasks = response.data;	
						this.loading = 'hide';
					
						console.log('***',this.tasks);
						//total pages
						this.pages = [];
						for(let i=0; i < response.total_pages; i++){
							this.pages.push(i);
						}
						//previous page
						if(page>=2){
							this.pagePrev = (page - 1);
						}else{
							this.pagePrev = page;
						}
						//next page
						if(page < response.total_pages){
							this.pageNext = (page+1);
						}else{
							this.pageNext = page;
						}

					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}


	public filter = 0;
	public order = 0;
	public searchString;

	search(){
		console.log(this.filter);
		console.log(this.order);
		console.log(this.searchString);

		this.loading = 'show';

		if(!this.searchString || this.searchString.trim().length == 0){
			this.searchString = null;
		}

		this._taskService.search(this.token, this.searchString, this.filter, this.order).subscribe(
			response => {

				console.log(response.status);
				if(response.status == 'success'){
					this.tasks = response.data;
					this.loading = 'hide';
				}else{
					this._router.navigate(['/index'])
				}
			},
			error=> {
				console.log(<any>error);
			}
		);
	}
}