import { Component, OnInit } from '@angular/core';
import { GiphyService } from '../giphy.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  showPopUp: boolean = false;
  chatLog:  any = [];
  myMessage: string = '';
  hardcodedMessage = 'This is a premade, hardcoded received Text'
  
  // variables to handle gifs and search
  trendingGifs: any = [];
  gifSearchKeyword: string = '';
  gifsToShow: any = []

  constructor(private _giphy: GiphyService) { }

  ngOnInit(): void {
    this.friendMessage()
    this.getTrendingGifs()
  }

  getTrendingGifs() {
    this._giphy.trendingGifs().subscribe(data => {
      // I have 2 variables. So I keep the trending gifs stored
      this.trendingGifs = data['data']
      this.gifsToShow = data['data']
    })
  }

  openPopUp() {
    this.showPopUp = !this.showPopUp
    this.gifSearchKeyword = ''
  }
  
  sendMessage() {
    if (this.myMessage == '') {
      return
    }
    this.chatLog.push({
      'who': 'me',
      'text': this.myMessage
    })
    this.myMessage = ''
    this.friendMessage()
  }

  // make this wait 1 or 2 seconds before sending
  friendMessage() {
    this.chatLog.push({
      'who': 'friend',
      'text': this.hardcodedMessage
    })
  }

  sendGif(gif) {
    this.chatLog.push({
      'who': "me",
      'gif': gif
    })
    this.openPopUp() 
  }

  gifSearch(keyword: string) {
    if (keyword != '') {
      this._giphy.gifKeywordSearch(keyword).subscribe(data => {
        this.gifsToShow = data['data']
      })
    } else {
      this.gifsToShow = this.trendingGifs
    }
  }

}
