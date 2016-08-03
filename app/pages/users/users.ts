import { Component }       from '@angular/core';
import { NavController }   from 'ionic-angular';
import { GithubUsers }     from '../../providers/github-users/github-users';
import { GithubFollowers } from '../../providers/github-followers/github-followers';
import { User }            from '../../models/user';
import { UserDetailsPage } from '../user-details/user-details';

@Component({
  templateUrl: 'build/pages/users/users.html',

})
export class UsersPage {
  // Declare users as an array of User model
  users: User[];
  followers: User[];
  login: string;

  // Inject the GithubUsers in the constructor of our page component
  constructor(public nav: NavController, private githubUsers: GithubUsers, private githubFollowers: GithubFollowers ) {
    // Test whether or not the github provider returns data
    githubUsers
      .load()
      // User arrow function notation
      .then(users => this.users = users);
  }

  // Search for users from github
  // Handle input from search bar
  search(searchTerm) {
    let term = searchTerm.target.value;

    // Search if more than 2 characters
    if (term.trim() == '' || term.trim().length < 3) {
      // Get Github users and assign to local user's variable
      this.githubUsers
        .load()
        // Load original users in this case
        .then(users => this.users = users)
    } else {
      // Get the searched users from Github
      this.githubUsers.searchUsers(term)
        .then(users => this.users = users)
    }
  }

  // Navigate to user details page with the login as a parameter
  gotoDetails(event, login) {
    this.nav.push(UserDetailsPage, {
      login: login
    });
  }
}
