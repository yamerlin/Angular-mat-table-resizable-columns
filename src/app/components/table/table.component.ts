import { Component, Renderer2, ElementRef } from '@angular/core';
import { Employe } from '../../models/employe';

const ELEMENT_DATA: Employe[] =[
  { firstName: 'John', lastName: 'Smithson Johnson Anderson Thompson Blackbeard White Green Harris Martin Garcia Wilson Anderson Thomas Jackson Martinez', age: 30, job: 'Senior Full Stack Developer with a specialization in Angular and React and also working as a User Experience Designer with a focus on mobile applications and also doing Project Management Consultant for large-scale IT projects and also working as a Quality Assurance Engineer with expertise in automated testing and also serving as the Chief Executive Officer of a multinational technology company and also working as a Marketing and Communications Manager specializing in digital marketing and also doing Sales and Business Development Manager with a proven track record and also serving as a Human Resources Specialist focusing on talent acquisition and retention and also working as a Financial Accountant with expertise in financial analysis and reporting and also serving as a Software Development Engineer specializing in backend development and also working as a Customer Support Representative providing exceptional customer service and also doing Data Analysis Consultant with a focus on data visualization and also serving as a Product Management Specialist overseeing product development lifecycle and also working as a Network Infrastructure Engineer managing network infrastructure and also doing User Interface and User Experience Designer creating intuitive user interfaces and also serving as a DevOps and Cloud Engineer implementing scalable cloud solutions and also working as a Chief Financial Officer responsible for financial planning and analysis and also serving as a Legal and Compliance Advisor ensuring compliance with legal regulations and also working as a Chief Technology Officer driving technology innovation and strategy and also serving as an Operations and Strategy Manager optimizing operational efficiency' },
  { firstName: 'Jane', lastName: 'Johnson', age: 25, job: 'User Experience Designer with a focus on mobile applications' },
  { firstName: 'Alice', lastName: 'Beamington', age: 35, job: 'Project Management Consultant for large-scale IT projects' },
  { firstName: 'Bob', lastName: 'Valentine-Smith', age: 28, job: 'Quality Assurance Engineer with expertise in automated testing' },
  { firstName: 'Charlie', lastName: 'Blackbeard', age: 40, job: 'Chief Executive Officer of a multinational technology company' },
  { firstName: 'David', lastName: 'Johnson', age: 32, job: 'Marketing and Communications Manager specializing in digital marketing' },
  { firstName: 'Eve', lastName: 'Brown', age: 45, job: 'Sales and Business Development Manager with a proven track record' },
  { firstName: 'Frank', lastName: 'Davis', age: 38, job: 'Human Resources Specialist focusing on talent acquisition and retention' },
  { firstName: 'Grace', lastName: 'Smith', age: 26, job: 'Financial Accountant with expertise in financial analysis and reporting' },
  { firstName: 'Henry', lastName: 'White', age: 29, job: 'Software Development Engineer specializing in backend development' },
  { firstName: 'Isabella', lastName: 'Green', age: 34, job: 'Customer Support Representative providing exceptional customer service' },
  { firstName: 'Jack', lastName: 'Harris', age: 41, job: 'Data Analysis Consultant with a focus on data visualization' },
  { firstName: 'Kate', lastName: 'Martin', age: 27, job: 'Product Management Specialist overseeing product development lifecycle' },
  { firstName: 'Liam', lastName: 'Thompson', age: 36, job: 'Network Infrastructure Engineer managing network infrastructure' },
  { firstName: 'Mia', lastName: 'Garcia', age: 33, job: 'User Interface and User Experience Designer creating intuitive user interfaces' },
  { firstName: 'Noah', lastName: 'Wilson', age: 39, job: 'DevOps and Cloud Engineer implementing scalable cloud solutions' },
  { firstName: 'Olivia', lastName: 'Anderson', age: 42, job: 'Chief Financial Officer responsible for financial planning and analysis' },
  { firstName: 'Patrick', lastName: 'Thomas', age: 24, job: 'Legal and Compliance Advisor ensuring compliance with legal regulations' },
  { firstName: 'Quinn', lastName: 'Jackson', age: 37, job: 'Chief Technology Officer driving technology innovation and strategy' },
  { firstName: 'Rachel', lastName: 'Martinez', age: 31, job: 'Operations and Strategy Manager optimizing operational efficiency' }
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  displayedColumns: string[] = [ 'firstName', 'lastName', 'age', 'job'];

  columns: any[] = [
    {name: 'firstName', width: null },
    {name: 'lastName', width: null },
    {name: 'age', width: null },
    {name: 'job', width: null },
  ]
  
  dataSource: Employe[] = ELEMENT_DATA;

  constructor(private renderer: Renderer2) { };

  isMousePressed = false;
  initialPosX!: number;
  mouseMove!: () => void;
  mouseUp!: () => void;

  table!: HTMLElement;
  tableInitialWidth!: number;
  resizerName!: string;

  //Apelé seulement au click souris
  resizeColumn(event: any, index: number): void{
    this.resizerName = event.target.className;
    console.log(this.resizerName);

    this.setInitialWidthOfEachColumns();

    this.isMousePressed = true;
    this.initialPosX = event.clientX;
    this.table = document.getElementById('table')!;
    this.tableInitialWidth = this.table.offsetWidth;
    console.log(this.tableInitialWidth);
    //this.changeColumnWidth(this.initialPosX, event.clientX, index);

    //Regarder si la souris est bougé
    this.mouseMove = this.renderer.listen('document', 'mousemove', (event) => {
      if(this.isMousePressed){
        this.changeColumnWidth(this.initialPosX, event.clientX, index);
      }
    });

    //Regarder si le click souris est relaché
    this.mouseUp = this.renderer.listen('document', 'mouseup', (event) =>{
      if(this.isMousePressed){
        this.isMousePressed = false;

        console.log('Souris relachée');
        console.log(index);

        this.mouseMove();
        this.mouseUp();
      }
    })
  }

  setInitialWidthOfEachColumns(){
    for (let i = 0; i < this.columns.length; i++){
      let cells = Array.from(document.getElementsByClassName('mat-column-' + this.columns[i].name));
      this.columns[i].width = cells[0].getBoundingClientRect().width;
    }
  }

  //Apelé en continue a chaque mouvement de la souris
  changeColumnWidth(initialPosX: number, newPosX: number, index: number) {
    let witdthIncrement = newPosX - initialPosX;
    console.log("Increment : " + witdthIncrement);

    
    // let leftBorderPosX = cellsInResizedCollumn[0].getBoundingClientRect().left;
    // let rightBorderPosX = cellsInResizedCollumn[0].getBoundingClientRect().right;

    // let isRightBorderMoving = this.isRightBorderMoving(newPosX,leftBorderPosX, rightBorderPosX);

    // let cellsToTheright;

    //Resize la colonne en question si c'est le resizer de droite
    if(this.resizerName == "resizer-right"){
      let cellsInResizedCollumn = Array.from(document.getElementsByClassName('mat-column-' + this.columns[index].name));

      cellsInResizedCollumn.forEach((cell: any ) => {
        cell.style.width = this.columns[index].width + witdthIncrement + 'px';
      });

      //Resize toute la table
      this.table.style.width = this.tableInitialWidth + witdthIncrement + 'px';
    }
    //Resizer la colonne de gauche si c'est le resizer de gauche
    else if(this.resizerName == "resizer-left" && index - 1 >= 0){
      let cellsInResizedCollumn = Array.from(document.getElementsByClassName('mat-column-' + this.columns[index - 1].name));

      cellsInResizedCollumn.forEach((cell: any ) => {
        cell.style.width = this.columns[index - 1].width + witdthIncrement + 'px';
      });

      //Resize toute la table
      this.table.style.width = this.tableInitialWidth + witdthIncrement + 'px';
    }

    
  }

  // isRightBorderMoving(mousePosX: number, leftBorderPosX: number, rightBorderPosX: number): boolean{
  //   let isRightBorderMoving = false;

  //   if( (rightBorderPosX - mousePosX) < (mousePosX - leftBorderPosX)){
  //     isRightBorderMoving = true;
  //   }

  //   return isRightBorderMoving;
  // }

}
