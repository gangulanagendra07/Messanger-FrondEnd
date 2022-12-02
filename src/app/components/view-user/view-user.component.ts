import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit, AfterViewInit {

  tabElement: any;
  postsTab = true;
  followingTab = false;
  followersTab = false;
  posts: any = [];
  following: any = [];
  followers: any = [];
  user: any;
  name: any;


  constructor(private route: ActivatedRoute, private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    const tabs = document.querySelector('.tabs')
    M.Tabs.init(tabs!, {});
    this.tabElement = document.querySelector('.nav-content');
    this.route.params.subscribe(params => {
      this.name = params.name;
      this.GetUserData(this.name);
    })
  }

  ngAfterViewInit(): void {
    this.tabElement.style.display = 'none';
  }
  GetUserData(name: any) {
    this.userService.GetUserByName(name).subscribe(data => {
      console.log(data);
      this.user = data.results;
      this.posts = data.results.posts.reverse();
      this.following = data.results.following;
      this.followers = data.results.followers;

    }, err => {
      console.log(err);
    })
  }
  ViewPerson(name: any) {
    this.router.navigate([name]);
  }

  ChangeTab(value: any) {
    if (value === 'posts') {
      this.postsTab = true;
      this.followersTab = false;
      this.followingTab = false;
    }
    if (value === 'following') {
      this.postsTab = false;
      this.followersTab = false;
      this.followingTab = true;
    }
    if (value === 'followers') {
      this.postsTab = false;
      this.followersTab = true;
      this.followingTab = false;
    }
  }
  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }
}
