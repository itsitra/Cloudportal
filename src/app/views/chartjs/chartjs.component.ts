import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent implements OnInit {
  public lineChartData: Array<any> = [
    {data : [], label : 'Line A', borderWidth: 1, pointStyle : 'line'}
    // , {data : [], label : 'Line A', borderWidth: 1, pointStyle : 'line 2'}
  ];
  public lineChartLabels: Array<any> = [];
  // lineChart
  // public lineChartData: Array<any> = [ 
  //   {data : [0,1,2,3,4,5,5,5,5,5,5,6,7,8,9,9,9,9,8,7,6,5,4,3,2,1,0], label : 'Line A'}
  // ];
  // public lineChartLabels: Array<any> = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','25','26','27','28'];
  
  public lineChartOptions: any = {
    animation: false,
    responsive: true, 
    scales: {
      xAxes: [{
          gridLines: {
              color: "rgba(0, 0, 0, 0)",
          }
      }],
      yAxes: [{
          gridLines: {
              color: "rgba(0, 0, 0, 0)",
          }   
      }]
  }
     
  };
  public lineChartDefauls : any = {
    elements : {
      point : {
        pointStyle : 'line'
      }
    }
  }
  //Chart.defaults.elements.point.
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';

  // Radar
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType = 'radar';

  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';

  // PolarArea
  public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType = 'polarArea';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit(): void {
    this.upadateLineChartData();
  }
  upadateLineChartData(){
    let lineData =[ ];

    //this.lineChartData.push(data)
    //console.log(this.lineChartData);
    let sno = 0;
    let snoo = 0;
    let interval = 0;
    
    setInterval(()=>{
      let datetime = new Date();
      //console.log(Number(sno++));
      //lineData.push(sno++)
       this.lineChartData[0].data.push(sno);
      //  this.lineChartData[1].data.push(snoo);

       this.lineChartLabels.push(datetime.getHours()+':'+datetime.getMinutes()+':'+datetime.getSeconds());
       if(sno <= 120 && interval <= 20){
          sno = sno + 10;
       }else{
         if(interval <= 20){
          interval++;
         }else{
           if(sno >= 0){
            sno = sno - 10;
           }
         }
       }
        
       //console.log(this.lineChartData);
    }, 1000);
   
  }

}
