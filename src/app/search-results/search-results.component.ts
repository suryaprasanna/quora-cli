import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HomeService } from '../home.service';
import { Question } from '../question';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public questions = [];
  searchTerm = '';

  questionResults = [];
  
  private queryText = '';
  constructor(private userService: UserService, private router: Router, private homeService: HomeService) { }

  ngOnInit() {
    
    this.searchTerm = this.userService.searchString;
    console.log("ser " + this.userService.questions);
    if(this.userService.questions.length != 0) {
      for(let i = 0; i < this.userService.questions.length; i++) {
        this.questions[i] = this.userService.questions[i];
      }
    }
    else {
      this.questions[0] = ['No results!'];
    }
  }

  onSubmit(searchTerm:string) {
    
        this.userService.searchString = searchTerm;
        this.queryText = searchTerm;
    
        this.searchTerm = '';

        this.homeService.getSearch(searchTerm).then(data => {
          console.log(data);
          if(data.sucess){
            this.questionResults = data.body
            this.userService.questions = this.questionResults;
            
            this.queryText = '';
  
            this.router.navigate(['/search-results']);
          } else{
            console.log("not success");
          }
        });
        console.log(this.questionResults);
      }

  logout() {
    this.router.navigate(['/login']);
  }
  
}
