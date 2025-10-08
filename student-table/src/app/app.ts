import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
students = [
    { id: 1, name: 'Rahul Sharma', age: 20, grade: 'A' },
    { id: 2, name: 'Priya Mehta', age: 21, grade: 'B+' },
    { id: 3, name: 'Amit Verma', age: 19, grade: 'A-' },
    { id: 4, name: 'Sneha Patil', age: 22, grade: 'B' },
    { id: 5, name: 'Karan Singh', age: 20, grade: 'A+' },
    { id: 6, name: 'Neha Gupta', age: 21, grade: 'B+' },
    { id: 7, name: 'Ravi Kumar', age: 23, grade: 'C' },
    { id: 8, name: 'Anjali Nair', age: 19, grade: 'A' },
    { id: 9, name: 'Manoj Yadav', age: 22, grade: 'B-' },
    { id: 10, name: 'Divya Reddy', age: 20, grade: 'A' }
  ];
}
