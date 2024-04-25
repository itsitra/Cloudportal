import {Component} from '@angular/core';
// import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})

export class DefaultLayoutComponent {
  private navItemsDefault = 
[
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
{
title:true,
name:"Testing",

},
{
  name: 'Labwise Facilities',
  url: '/testrate',
  icon: 'icon-layers',
  
  children: [
    {
      name: 'Physical Testing',
      url: '/testrate/testingcharge/8',
      icon: 'icon-chevron-right'
    },
    {
      name: 'Chemical Testing',
      url: '/testrate/testingcharge/9',
      icon: 'icon-chevron-right'
    },
    {
      name: 'Knitting / Weaving',
      url: '/testrate/testingcharge/7',
      icon: 'icon-chevron-right'
    },
    {
      name: 'Engineering',
      url: '/testrate/testingcharge/11',
      icon: 'icon-chevron-right'
    },
    {
      name: 'Medical Textile',
      url: '/testrate/testingcharge/10',
      icon: 'icon-chevron-right'
    },
    {
      name: 'NABL Certificates',
      url: '/certificates',
      icon: 'icon-chevron-right'
    }
  ]
},
{
  name: 'Frequently Used Tests',
  url: '/frequenttests/list',
  icon: 'icon-star'
},
{
  name: 'Proforma Invoice',
  url: '/proforma/list',
  icon: 'icon-puzzle'
},
{
  name: 'Package Testing Req',
  url: '/package_test/list',
  icon: 'icon-pie-chart'
},
{
  name: 'Request Analysis',
  url: '/requestanalysis',
  icon: 'icon-chart',
  /*badge: {
    variant: 'info',
    text: ''
  }*/
},
{
  name: 'View Test Result',
  url: '/inwards',
  icon: 'icon-bell',
  /*badge: {
    variant: 'info',
    text: ''
  }*/
},
  // {
  //   name: 'Testing',
  //   url: '/testrate',
  //   icon: 'icon-puzzle',
   
  //   children: [
      
   
  //   ]
  // },
  {
    title:true,
    name:"Publications"
    },
    {
      name: 'Publication List',
      url: '/publications/publicationlists',
      icon: 'icon-pencil'
    },
    {
      name: 'My Purchases',
      url: '/mypayments/4',
      icon: 'icon-pencil'
    },
  // {
  //   // name: 'Publications',
  //   // url: '/theme/colors',
  //   // icon: 'icon-pencil',
  //   // children: [
     
  //     // {
  //     //   name: 'Publication Focus List',
  //     //   url: '/publications/publicationfocuslists',
  //     //   icon: 'icon-chevron-right'
  //     // },
     
  //   // ]
  // },
  {
    title:true,
    name:"UKG"
    },
    {
      name: 'Count Selection',
      url: '/ukgpayment',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Count Selection',
          url: '/ukgpayment',
          icon: 'icon-chevron-right'
        },
        {
          name: 'Spinning',
          url: '/spinning',
          icon: 'icon-chevron-right'
        },
        {
          name: 'OE',
          url: '/oe',
          icon: 'icon-chevron-right'
        },
 ]
    },
    
    {
      name: 'UKG Downloads',
      url: '/mypayments/1',
      icon: 'icon-puzzle'
    },
  // {
  //   name: 'UKG Conv. Factors',
  //   url: '/testrate',
  //   icon: 'icon-puzzle',
  //   children: [
    
      
  //   ]
  // },
  {
    title:true,
    name:"Training"
    },
    {
      name: 'Register ',
      url: '/webinar',
      icon: 'icon-pencil',
    },
    {
      name:'My Payments',
      url:'/comingsoon',
      icon:'icon-bell',
    },
  // {
  //   name:'Training ',
  //   url:'/webinar',
  //   icon:'icon-cursor',
  //   children:[
     
     
  // ]
  // },
  {
    title:true,
    name:"Payments",
    
    },
  {
    name: 'My Payments',
    url: '/mypayments/0',
    icon: 'icon-chart',
    /*badge: {
      variant: 'info',
      text: ''
    }*/
  },
  {
    title:true,
    name:"Quick Links"
    },
    {
      name: 'SITRA',
      url: 'http://www.sitra.org.in',
      icon: 'icon-share'
    },
    // {
    //   name: 'Meditech',
    //   url: 'http://www.sitrameditech.org.in/',
    //   icon: 'icon-share'
    // },
  // {
  //   name: 'Website Links',
  //   url: '/theme/colors',
  //   icon: 'icon-pencil',
  //   children: [
     
    
  //   ]
  // },
  {
    title:true,
    name:"Conatct"
    },
  {
    name: 'Contact us',
    url: '/contactus',
    icon: 'icon-phone',
    /*badge: {
      variant: 'info',
      text: ''
    }*/
  },


  // {
  //   name: 'Testing',
  //   url: '/testrate',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Physical Testing',
  //       url: '/testrate/testingcharge/8',
  //       icon: 'icon-chevron-right'
  //     },
  //     {
  //       name: 'Chemical Testing',
  //       url: '/testrate/testingcharge/9',
  //       icon: 'icon-chevron-right'
  //     },
  //     {
  //       name: 'Knitting / Weaving',
  //       url: '/testrate/testingcharge/7',
  //       icon: 'icon-chevron-right'
  //     },
  //     {
  //       name: 'Engineering',
  //       url: '/testrate/testingcharge/11',
  //       icon: 'icon-chevron-right'
  //     },
  //     {
  //       name: 'Medical Textile',
  //       url: '/testrate/testingcharge/10',
  //       icon: 'icon-chevron-right'
  //     },
  //     {
  //       name: 'NABL Certificates',
  //       url: '/certificates',
  //       icon: 'icon-chevron-right'
  //     }
  //   ]
  // },
  // {
  //   name: 'Request Analysis',
  //   url: '/requestanalysis',
  //   icon: 'icon-chart',
  //   /*badge: {
  //     variant: 'info',
  //     text: ''
  //   }*/
  // },
  // {
  //   name: 'View Test Result',
  //   url: '/inwards',
  //   icon: 'icon-chart',
  //   /*badge: {
  //     variant: 'info',
  //     text: ''
  //   }*/
  // },
  // {
  //   name: 'My Payments',
  //   url: '/mypayments/0',
  //   icon: 'icon-chart',
  //   /*badge: {
  //     variant: 'info',
  //     text: ''
  //   }*/
  // },
  // {
  //   name: 'Package Testing Req',
  //   url: '/package_test/list',
  //   icon: 'icon-pie-chart'
  // },
  // {
  //   name: 'Proforma Invoice',
  //   url: '/proforma/list',
  //   icon: 'icon-puzzle'
  // },
  // {
  //   name: 'UKG Conv. Factors',
  //   url: '/testrate',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Count Selection',
  //       url: '/ukgpayment',
  //       icon: 'icon-chevron-right'
  //     },
  //     {
  //       name: 'UKG Downloads',
  //       url: '/mypayments/1',
  //       icon: 'icon-chevron-right'
  //     }
  //     /*
  //     {
  //     name: 'SITRA Std. 40s UKG CF',
  //     url: '/ukg',
  //     icon: 'icon-chevron-right'
  //     },
  //     {
  //       name: 'Mill\'s Act. 40s UKG CF',
  //       url: '/ukgmill',
  //       icon: 'icon-chevron-right'
  //     }*/
  //   ]
  // },
  // {
  //   name: 'Webinar Registration',
  //   url: '/webinar',
  //   icon: 'icon-pencil',
  // },
  // {
  //   name: 'Publications',
  //   url: '/theme/colors',
  //   icon: 'icon-pencil',
  //   children: [
  //     {
  //       name: 'Publication List',
  //       url: '/publications/publicationlists',
  //       icon: 'icon-chevron-right'
  //     },
  //     {
  //       name: 'Publication Focus List',
  //       url: '/publications/publicationfocuslists',
  //       icon: 'icon-chevron-right'
  //     },
  //     {
  //       name: 'My Purchases',
  //       url: '/mypayments/4',
  //       icon: 'icon-chevron-right'
  //     }
  //   ]
  // },
  // {
  //   name: 'frequently Used tests',
  //   url: '/frequenttests/list',
  //   icon: 'icon-star'
  // },
  // {
  //   name: 'Website Links',
  //   url: '/theme/colors',
  //   icon: 'icon-pencil',
  //   children: [
  //     {
  //       name: 'SITRA',
  //       url: 'http://www.sitra.org.in',
  //       icon: 'icon-chevron-right'
  //     },
  //     {
  //       name: 'Meditech',
  //       url: 'http://www.sitrameditech.org.in/',
  //       icon: 'icon-chevron-right'
  //     }
  //   ]
  // },
  // {
  //   name: 'Contactus',
  //   url: '/contactus',
  //   icon: 'icon-chart',
  //   /*badge: {
  //     variant: 'info',
  //     text: ''
  //   }*/
  // }
  /*{
    name: 'Analysis Requests',
    url: '/analysisrequests',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },*/
];
private navItemsJTC = 
[
  
  {
    title:true,
    name:"Training"
    },
    {
      name: 'Register ',
      url: '/webinar',
      icon: 'icon-pencil',
    },
    {
      name:'My Payments',
      url:'/comingsoon',
      icon:'icon-bell',
    },
  {
    title:true,
    name:"Conatct"
    },
  {
    name: 'Contact us',
    url: '/contactus',
    icon: 'icon-phone',
    /*badge: {
      variant: 'info',
      text: ''
    }*/
  },

];
public sessiontype = localStorage.getItem('sessiontype')==='jtc';
  public sidebarMinimized = false;
  public navItems = localStorage.getItem('sessiontype')==='jtc'?this.navItemsJTC : this.navItemsDefault;
  public idletimerCount = '';
  public glbLoaderFlag: boolean = false;
  customername: string;
  
  constructor(
    private router: Router
    ) {
      
      this.glbLoaderFlag = environment.globalLoader;
      // console.log('loaderStatus : ' + environment.globalLoader);
      this.idletimerCount = localStorage.getItem('idleTimer');
      this.customername = localStorage.getItem('customername');
      /*if (localStorage.getItem('customerid') !== '') {
        this.router.navigateByUrl('dashboard');
      }*/
      // For set empty value when the browser or tab is closed
      /*window.onunload = () => {
        // Clear the local storage
        localStorage.setItem('customerid', '0');
     };*/
    }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  
  doLogout() {
    if (localStorage.getItem('customerid') !== '') {
      localStorage.setItem('customerid', '0');
      localStorage.setItem('lims_custid', '0');
      localStorage.removeItem('sessiontype')
      this.router.navigateByUrl('login');
    }
  }
 
}
