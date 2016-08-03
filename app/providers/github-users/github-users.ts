import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import                     'rxjs/add/operator/map';
import { User }       from '../../models/user';

@Injectable()
export class GithubUsers {
  githubUsers: any = null;
  githubFollowers: any = null;

  constructor(public http: Http) {
  }

  load() {
    if (this.githubUsers) {
      // already loaded data
      return Promise.resolve(this.githubUsers);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('https://api.github.com/users')
        .map(res => <Array<User>>(res.json()))
        .subscribe(users => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.githubUsers = users;
          console.log(this.githubUsers);
          resolve(this.githubUsers);
        });
    });
  }

  // Get user details from the Github api
  loadDetails(login: String) {
    // get the data from the api and return it as a promise
    return new Promise<User>(resolve => {
      // Change the url to match https://api.github.com/users/{username}
      this.http.get(`https://api.github.com/users/${login}`)
        .map(res => <User>(res.json()))
        .subscribe(user => {
          resolve(user);
        });
    });
  }

  loadFollowers(login: String) {
    return new Promise<User>(resolve => {
      this.http.get(`https://api.github.com/users/${login}/followers`)
        .map(res => <User>(res.json()))
        .subscribe(followers => {
          resolve(followers);
        });
    });
  }


  searchUsers(searchParam: string) {
    // Get the data from the api and return it as a promise
    return new Promise<Array<User>>(resolve => {
      // Change the url to match https://api.github.com/search/users?q={searchParam}
      this.http.get(`https://api.github.com/search/users?q=${searchParam}`)
      // Cast the result into an array of users.
      .map(res => <Array<User>>(res.json().items))
      .subscribe(users => {
        resolve(users);
      });
    })
  }
}
