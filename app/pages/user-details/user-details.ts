import { Component }                from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GithubUsers }              from '../../providers/github-users/github-users';
import { GithubFollowers }          from '../../providers/github-followers/github-followers';
import { UserFollowersPage }        from '../user-followers/user-followers';
import { UserFollowingPage }        from '../user-following/user-following';
import { User }                     from '../../models/user';

@Component({
  templateUrl: 'build/pages/user-details/user-details.html',
})
export class UserDetailsPage {
  user: User = new User;
  followers: Array<User>;
  login: string;

  constructor(public nav: NavController, navParams: NavParams, githubUsers: GithubUsers, private githubFollowers: GithubFollowers) {
    // Retrieve the login from the navigation parameters
    this.login = navParams.get('login');

    // Get the user details and log
    githubUsers.loadDetails(this.login)
      .then( user => {
        this.user = user;
      })

    /*githubFollowers
      .load(this.login)
      // User arrow function notation
      .then(followers => this.followers = followers);*/


  }

  gotoFollowers(event, login) {
    this.nav.push(UserFollowersPage, {
      login: login
    });
  }

  gotoFollowing(event, login) {
    this.nav.push(UserFollowingPage, {
      login: login
    });
  }
}
