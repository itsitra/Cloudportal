import { INavData } from '@coreui/angular';
import { AESEncryptDecryptServiceService } from './aesencrypt-decrypt-service.service';

export const item = new AESEncryptDecryptServiceService;
const navItemsDefault: INavData[] = 
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
      icon: 'icon-cursor'
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
const navItemsJTC: INavData[] = 
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
export const navItems = localStorage.getItem('sessiontype')==='jtc'?navItemsJTC : navItemsDefault