import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'Linear-flowchart',
  template: `
  <svg #Svg class="svg-responsive svg" attr.height="{{svgWindowHeight}}" width="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <g transform=translate(10,10)>
        <g *ngFor="let pat of patterns; let i = index" (click)="RouteTo(i)">
            <rect class="rect" attr.x="{{pat.Rect[0]}}" attr.y="{{pat.Rect[1]}}" rx="20" attr.width="{{pat.Rect[2]}}" height="40"  [style.fill]="CellColor" style="stroke:#000000; stroke-width:2; opacity:1;" />
            <text class="text" attr.x="{{pat.Rect[0] + pat.Rect[2]/2}}" attr.y="{{pat.Rect[1] + 20 }}" [style.font-size.px]="patternFontSize()[0]" [style.font-weight]="patternFontSize()[1]" [style.font-family]="FontFamily" dominant-baseline="middle" text-anchor="middle" style="fill: white;" >{{ Data[i] }}</text>
            <line class="line" *ngIf="(pat.Line?.length > 1) && (i < patterns.length - 1)" attr.x1="{{pat.Line[0]}}" attr.y1="{{pat.Line[1]}}" attr.x2="{{pat.Line[2]}}" attr.y2="{{pat.Line[3]}}" style="stroke:rgb(0,0,0); stroke-width:2;" />
            <path class="path" *ngIf="pat.Line?.length == 1 && (i < patterns.length - 1)" attr.d="{{pat.Line[0]}}" stroke="black" stroke-linecap="miter" stroke-width="2" fill="none"/>  
            <polygon class="polygon" *ngIf="(i < patterns.length - 1)" attr.points="{{pat.Poly[0]}} {{pat.Poly[1]}} {{pat.Poly[2]}} {{pat.Poly[3]}} {{pat.Poly[4]}} {{pat.Poly[5]}} {{pat.Poly[6]}} {{pat.Poly[7]}} {{pat.Poly[8]}} {{pat.Poly[9]}}" style="stroke: #000; stroke-miterlimit: 10; stroke-width: 2px;"/>
        </g>
    </g>
  </svg>
  `,
  styles: [
    // `.svg {
    //   font-family: sans-serif;
    //   border: solid;
    //   .polygon {
    //       stroke: #000;
    //       stroke-miterlimit: 10;
    //       stroke-width: 2px;
    //   }
    //   .rect{
    //       fill:rgb(37, 173, 133);
    //       stroke:#000000;
    //       stroke-width:2;
    //       opacity:1;
    //   }
    //   .text{
    //                 fill: white;

    //   }
    //   .line{
    //       stroke:rgb(0,0,0);
    //       stroke-width:2;
    //   }
    // }`
  ],
})
export class LinearFlowchartComponent implements OnInit {
@ViewChild('Svg') svg: any;
  @Input('cellsOnFirstLine') cellsOnFirstLine: number = 7;
  @Input('FontFamily') FontFamily = 'sans-serif'
  @Input('CellColor') CellColor = 'rgb(37, 173, 133)'
  @Input('Data') Data :any[] = [1,2,3,4,5,6,7,8,9]
  @Input('svgWindowHeight') svgWindowHeight = 400
  @Input('RouteData') RouteData: any[] = []
  svgCoordinates: any;
  svgHeight: any;
  svgWidth: any;
  svgX: any;
  svgY: any;
  patternBox: any;
  arrowWidth: any;
  initialPatternBoxX: number = 0;
  initialPatternBoxY: number = 0;
  patterns: any[] = []
  constructor(private cdref: ChangeDetectorRef, private route: Router) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  ngAfterViewInit() {
    this.svgCoordinates = this.svg.nativeElement.getBoundingClientRect()
    this.svgHeight = this.svgCoordinates.height;
    this.svgWidth = this.svgCoordinates.width;
    this.svgX = this.svgCoordinates.x;
    this.svgY = this.svgCoordinates.y;
    this.initialPatternBoxX = 0;
    this.initialPatternBoxY = 0;
    this.patternBox = Math.floor((this.svgWidth / this.cellsOnFirstLine) * 0.75);
    this.arrowWidth = Math.floor((this.svgWidth / this.cellsOnFirstLine) * 0.25);
    this.creatingCoordinates()
    
  }

  //Responsive Font Sizes.
  patternFontSize(){
    if(this.patternBox >= 200){
      return [19,600]
    }
    else if(this.patternBox >= 120 && this.patternBox < 200){
      return [18, 600]
    } 
    else if(this.patternBox >=80 && this.patternBox < 120){
      return [14, 700]
    }
    else if(this.patternBox >= 65 && this.patternBox < 80){
      return [10, 800]
    }
    else{
      return [7, 900]
    }
  }

  //Generating coordinates for boxes
  creatingCoordinates() {
    let shapes = []
    let forward : boolean = true;
    for (var i = 0; i < this.Data.length; i++) {
        if(this.cellsOnFirstLine === 1){
          shapes.push({
            "Rect": [this.initialPatternBoxX, this.initialPatternBoxY, this.patternBox],
            "Line": [Math.floor(this.patternBox/2), (Math.abs(40 + this.initialPatternBoxY)), (Math.floor(this.patternBox/2)), (Math.abs(this.initialPatternBoxY + 80))],
            "Poly": [(Math.floor(this.patternBox/2)), (Math.abs(this.initialPatternBoxY + 80)), (Math.floor(this.patternBox/2) + 2), (Math.abs(this.initialPatternBoxY + 80)), (Math.floor(this.patternBox/2)), (Math.abs(this.initialPatternBoxY + 85)), (Math.floor(this.patternBox/2) - 2), (Math.abs(this.initialPatternBoxY + 80)), (Math.floor(this.patternBox/2)), (Math.abs(this.initialPatternBoxY + 80))],
          });
          this.initialPatternBoxY = this.initialPatternBoxY + 87
        }
        else if(this.svgWidth - this.initialPatternBoxX <= this.patternBox + this.arrowWidth + 10){
          shapes.push({
            "Rect": [this.initialPatternBoxX, this.initialPatternBoxY, this.patternBox],
            "Line": [`M${Math.floor(this.initialPatternBoxX + this.patternBox/2)} ${this.initialPatternBoxY + 40} L${Math.floor(this.initialPatternBoxX + this.patternBox/2)} ${this.initialPatternBoxY + 100} L${this.initialPatternBoxX + 7} ${this.initialPatternBoxY + 100}`],
            "Poly": [(this.initialPatternBoxX + 7), (Math.abs(100 + this.initialPatternBoxY)), (this.initialPatternBoxX + 7), (Math.abs(100 + this.initialPatternBoxY) - 2), ((this.initialPatternBoxX) + 2), (Math.abs(100 + this.initialPatternBoxY)), (this.initialPatternBoxX + 7), (Math.abs(100 + this.initialPatternBoxY) + 2), (this.initialPatternBoxX + 7), (Math.abs(100 + this.initialPatternBoxY))],
          });
          this.initialPatternBoxY = this.initialPatternBoxY + 80
          this.initialPatternBoxX = this.initialPatternBoxX - this.patternBox
          forward = !forward;
        }
        else if((this.initialPatternBoxX < this.patternBox + this.arrowWidth && this.initialPatternBoxY > 40) || (this.initialPatternBoxX < 0 && this.initialPatternBoxY > 40)){
          shapes.push({
            "Rect": [this.initialPatternBoxX, this.initialPatternBoxY, this.patternBox],
            "Line": [`M${Math.floor(this.initialPatternBoxX + this.patternBox/2)} ${this.initialPatternBoxY + 40} L${Math.floor(this.initialPatternBoxX + this.patternBox/2)} ${this.initialPatternBoxY + 100} L${this.initialPatternBoxX + this.patternBox - 7} ${this.initialPatternBoxY + 100}`],
            "Poly": [(this.initialPatternBoxX + this.patternBox - 7), (Math.abs(100 + this.initialPatternBoxY)), (this.initialPatternBoxX + this.patternBox - 7), (Math.abs(100 + this.initialPatternBoxY) - 2), (this.initialPatternBoxX + this.patternBox - 2), (Math.abs(100 + this.initialPatternBoxY)), (this.initialPatternBoxX + this.patternBox - 7), (Math.abs(100 + this.initialPatternBoxY) + 2), (this.initialPatternBoxX + this.patternBox - 7), (Math.abs(100 + this.initialPatternBoxY))],
          });
          this.initialPatternBoxY = this.initialPatternBoxY + 80
          this.initialPatternBoxX = this.initialPatternBoxX + this.patternBox
          forward = !forward;
        }
        else{
          if(forward){
            shapes.push({
              "Rect": [this.initialPatternBoxX, this.initialPatternBoxY, this.patternBox],
              "Line": [(this.initialPatternBoxX + this.patternBox), (Math.abs(20 + this.initialPatternBoxY)), ((this.initialPatternBoxX + this.patternBox + this.arrowWidth) - 7), (Math.abs(20 + this.initialPatternBoxY))],
              "Poly": [((this.initialPatternBoxX + this.patternBox + this.arrowWidth) - 7), (Math.abs(20 + this.initialPatternBoxY)), ((this.initialPatternBoxX + this.patternBox + this.arrowWidth) - 7), (Math.abs(20 + this.initialPatternBoxY) - 2), ((this.initialPatternBoxX + this.patternBox + this.arrowWidth) - 2), (Math.abs(20 + this.initialPatternBoxY)), ((this.initialPatternBoxX + this.patternBox + this.arrowWidth) - 7), (Math.abs(20 + this.initialPatternBoxY) + 2), ((this.initialPatternBoxX + this.patternBox + this.arrowWidth) - 7), (Math.abs(20 + this.initialPatternBoxY))],
            });
            this.initialPatternBoxX = this.initialPatternBoxX + Math.floor((this.svgWidth / this.cellsOnFirstLine))
          }
          else{
            shapes.push({
              "Rect": [this.initialPatternBoxX, this.initialPatternBoxY, this.patternBox],
              "Line": [(this.initialPatternBoxX), (Math.abs(20 + this.initialPatternBoxY)), ((this.initialPatternBoxX - this.arrowWidth) + 7), (Math.abs(20 + this.initialPatternBoxY))],
              "Poly": [((this.initialPatternBoxX - this.arrowWidth) + 7), (Math.abs(20 + this.initialPatternBoxY)), ((this.initialPatternBoxX - this.arrowWidth) + 7), (Math.abs(20 + this.initialPatternBoxY) - 2), ((this.initialPatternBoxX - this.arrowWidth) + 2), (Math.abs(20 + this.initialPatternBoxY)), ((this.initialPatternBoxX - this.arrowWidth) + 7), (Math.abs(20 + this.initialPatternBoxY) + 2), ((this.initialPatternBoxX - this.arrowWidth) + 7), (Math.abs(20 + this.initialPatternBoxY))],
            });
            this.initialPatternBoxX = this.initialPatternBoxX - Math.floor((this.svgWidth / this.cellsOnFirstLine))
          }
          
        }

        this.patterns.push(...shapes)
      shapes = []
      this.ngAfterContentChecked()

    }
    console.log("pattern box", this.patternBox)
    this.patterns.forEach(value => {
    })
  }

  //Routing
  RouteTo(i: any){
    if(this.RouteData.length == this.Data.length){
      this.route.navigateByUrl(`/${this.RouteData[i]}`)
    }
  } 

}
