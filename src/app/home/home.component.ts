import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HomeService } from '../home.service';
import { Question } from '../question';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
// import { AnswerService } from '../services/answer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions: any = {};
  statusMessage: string;
  askquestionform: FormGroup;
  currentUser = '';
  isConnected = false;
  
  form: FormGroup;
  status: string;

  questionResults = [];

  private queryText = '';
  searchTerm = '';

  private readonly INDEX = 'testquestions';
  private readonly TYPE = 'question';

  constructor(private userService: UserService, private cd: ChangeDetectorRef, private fb: FormBuilder, private router: Router, private home: HomeService) {
    this.askquestionform = fb.group({
      'question': ['']
    });
    // this.answerForm = fb.group({
    //   'answerQ': ['']
    // });
  }

  ngOnInit() {
    this.getQuestions();
  }

  // postAnswer(value, question_id) {
  //   this.answerService.postAnswer(value, question_id);
  //   this.getQuestions();
  // }

  getQuestions() {
    this.homeService.getQuestions().then(data => {
      console.log(data);
      if(data.success == true){
        this.questions = data.body
      } else{
        console.log("not success");
      }
    });
    console.log(this.questions); 
  }


  askQuestion(value): void {
    this.homeService.askQuestion(value.question)
      .then(data => {
        console.log("saved !"); 
        this.statusMessage = 'Question posted successfully';
        this.askquestionform.reset();
        this.getQuestions();
      });
  }

  onSubmit(searchTerm:string) {
    
        this.userService.searchString = searchTerm;
        this.queryText = searchTerm;
    
        this.searchTerm = '';

        this.home.getSearch(searchTerm).then(data => {
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

      //   this.es.fullTextSearch(
      //     this.INDEX,
      //     this.TYPE,
      //     this.queryText).then(
      //       response => {
    
      //         this.questionResults = response.hits.hits;
    
              
    
      //     }, err => {
      //       console.error(err);
      //     }).then(() => {
      //       console.log('Search completed!');
      //     });
      }
}
