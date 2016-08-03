import { Component }                from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GithubFollowers }          from '../../providers/github-followers/github-followers';
import { GithubUsers }              from '../../providers/github-users/github-users';
import { User }                     from '../../models/user';

@Component({
  templateUrl: 'build/pages/user-followers/user-followers.html',
})
export class UserFollowersPage {
  followers: User;
  login: string;

  constructor(private nav: NavController, navParams: NavParams, private githubFollowers: GithubFollowers, private githubUsers: GithubUsers ) {
    this.login = navParams.get('login');

    githubUsers.loadFollowers(this.login)
      .then( followers => {
        this.followers = followers;
        console.log(this.followers);
      })
  }

}
