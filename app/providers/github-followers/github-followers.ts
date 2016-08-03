import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import                     'rxjs/add/operator/map';
import { User }       from '../../models/user';

@Injectable()
export class GithubFollowers {
  githubUsers: any = null;
  githubFollowers: any = null;

  constructor(public http: Http) {
  }

  load(login: String) {
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(`https://api.github.com/users/${login}/followers`)
        .map(res => <Array<User>>(res.json()))
        .subscribe(followers => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.githubFollowers = followers;
          console.log(this.githubFollowers);
          resolve(this.githubFollowers);
        });
    });
  }
}
