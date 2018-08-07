import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { Blog } from './blog'
import { catchError, tap } from 'rxjs/operators';
import { Model } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})

export class BlogService {

  private blogsUrl = 'api/blogs/';  // URL to web api

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(
    private http: HttpClient,
    // private messageService: MessageService,
  ){}


  // get all blogs

  getBlogs(): Observable<any> {
    return this.http.get<any>(this.blogsUrl).pipe(
           tap(data => console.log('All: ' + JSON.stringify(data))),
           catchError(this.handleError)
    );
  }
   private handleError(err: HttpErrorResponse){
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
      }
      console.error(errorMessage);
      return throwError(errorMessage);
  }

// get one blog

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`/api/blogs/${id}`)

  }

  editBlog(model: Model): Observable<Model> {
    return this.http.put<Blog>(this.blogsUrl, model, this.httpOptions)
  }

}
