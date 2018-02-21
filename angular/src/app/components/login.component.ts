import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'; 
import {UserService} from '../services/user.service';


@Component({
	selector: 'login',
	templateUrl: '../views/login.html',
	providers: [UserService]
})
export class LoginComponent implements OnInit{
	public title: string;
	public user;
	public identity;
	public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
		this.title = 'Login';
		this.user = {
			"email" : "",
			"password" : "",
			"getHash" : "true"
		};
	}

	ngOnInit(){
		console.log('Login component created!');
		//console.log(JSON.parse(localStorage.getItem('identity')));
		//console.log(this._userService.getIdentity());
		//console.log(JSON.parse(localStorage.getItem('token')));
		//console.log(this._userService.getToken());
		this.logout();
		this.redirectIfIdentity();
	}

	logout(){
		this._route.params.forEach((params:Params)=>
		{

			let logout = +params['id'];
			if(logout == 1){//delete all session
				localStorage.removeItem('identity');
				localStorage.removeItem('token');
				console.log('entra aqui2');


				this.identity = null;
				this.token = null;

				window.location.href = '/login';
			}
		});
	}

	redirectIfIdentity(){
		let identity = this._userService.getIdentity();
		if(identity != null && identity.sub){
			this._router.navigate(["/"]);
		}
	}

	onSubmit(){
		console.log(this.user);
		this._userService.signup(this.user).subscribe(
			response => {
				this.identity = response;

				if(this.identity.lenght <= 1){
					console.log("Server error");
				}{
					if(!this.identity.status){
						localStorage.setItem('identity', JSON.stringify(this.identity))

						//to get token
						this.user.getHash = null;
						this._userService.signup(this.user).subscribe(
							response => {
								this.token = response;

								if(this.identity.lenght <= 1){
									console.log("Server error");
								}{
									if(!this.identity.status){
										localStorage.setItem('token', JSON.stringify(this.token))										
										window.location.href = '/';
									}
								}
							},
							error => {
								console.log(<any>error);
							}
						);

					}
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
}

