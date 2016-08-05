import { Component }                from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GithubUsers }              from '../../providers/github-users/github-users';
import { User }                     from '../../models/user';
import { UserDetailsPage }          from '../user-details/user-details';

@Component({
  templateUrl: 'build/pages/user-following/user-following.html',
})
export class UserFollowingPage {
  following: User;
  login: string;

  constructor(private nav: NavController, navParams: NavParams, private githubUsers: GithubUsers ) {
    this.login = navParams.get('login');

    githubUsers.loadFollowing(this.login)
      .then( following => {
        this.following = following;
      })
  }
  gotoDetails(event, login) {
    this.nav.push(UserDetailsPage, {
      login: login
    });
  }
}
