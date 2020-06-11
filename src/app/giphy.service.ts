import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  constructor(private http: HttpClient) { }

  trendingGifs() {
    return this.http.get('https://api.giphy.com/v1/gifs/trending?api_key=5zvnuKpRbB7NqoXbqNsvCEUyqBNCvu23&limit=25&rating=G')
  }

  gifKeywordSearch(keyword: string) {
    return this.http.get('https://api.giphy.com/v1/gifs/search?api_key=5zvnuKpRbB7NqoXbqNsvCEUyqBNCvu23&q=' + keyword + '&limit=25&offset=0&rating=G&lang=en')
  }

}
