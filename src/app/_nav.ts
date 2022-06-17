import { INavData } from '@coreui/angular';
import { AESEncryptDecryptServiceService } from './aesencrypt-decrypt-service.service';

export const item = new AESEncryptDecryptServiceService;

export const navItems: INavData[] = [
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
      icon: 'icon-puzzle'
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
//   // {
//   //   title: true,
//   //   name: 'Theme'
//   // },
//   // {
//   //   name: 'Colors',
//   //   url: '/theme/colors',
//   //   icon: 'icon-drop'
//   // },
//   // {
//   //   name: 'Typography',
//   //   url: '/theme/typography',
//   //   icon: 'icon-pencil'
//   // },
//   // {
//   //   title: true,
//   //   name: 'Components'
//   // },
//   // {
//   //   name: 'Base',
//   //   url: '/base',
//   //   icon: 'icon-puzzle',
//   //   children: [
//   //     {
//   //       name: 'Cards',
//   //       url: '/base/cards',
//   //       icon: 'icon-puzzle'
//   //     },
//   //     {
//   //       name: 'Carousels',
//   //       url: '/base/carousels',
//   //       icon: 'icon-puzzle'
//   //     },
//   //     {
//   //       name: 'Collapses',
//   //       url: '/base/collapses',
//   //       icon: 'icon-puzzle'
//   //     },
//   //     {
//   //       name: 'Forms',
//   //       url: '/base/forms',
//   //       icon: 'icon-puzzle'
//   //     },
//   //     {
//   //       name: 'Navbars',
//   //       url: '/base/navbars',
//   //       icon: 'icon-puzzle'

//   //     },
//   //     {
//   //       name: 'Pagination',
//   //       url: '/base/paginations',
//   //       icon: 'icon-puzzle'
//   //     },
//   //     {
//   //       name: 'Popovers',
//   //       url: '/base/popovers',
//   //       icon: 'icon-puzzle'
//   //     },
//   //     {
//   //       name: 'Progress',
//   //       url: '/base/progress',
//   //       icon: 'icon-puzzle'
//   //     },
//   //     {
//   //       name: 'Switches',
//   //       url: '/base/switches',
//   //       icon: 'icon-puzzle'
//   //     },
//   //     {
//   //       name: 'Tables',
//   //       url: '/base/tables',
//   //       icon: 'icon-puzzle'
//   //     },
//   //     {
//   //       name: 'Tabs',
//   //       url: '/base/tabs',
//   //       icon: 'icon-puzzle'
//   //     },
//   //     {
//   //       name: 'Tooltips',
//   //       url: '/base/tooltips',
//   //       icon: 'icon-puzzle'
//   //     }
//   //   ]
//   // },
//   // {
//   //   name: 'Buttons',
//   //   url: '/buttons',
//   //   icon: 'icon-cursor',
//   //   children: [
//   //     {
//   //       name: 'Buttons',
//   //       url: '/buttons/buttons',
//   //       icon: 'icon-cursor'
//   //     },
//   //     {
//   //       name: 'Dropdowns',
//   //       url: '/buttons/dropdowns',
//   //       icon: 'icon-cursor'
//   //     },
//   //     {
//   //       name: 'Brand Buttons',
//   //       url: '/buttons/brand-buttons',
//   //       icon: 'icon-cursor'
//   //     }
//   //   ]
//   // },
//   // {
//   //   name: 'Charts',
//   //   url: '/charts',
//   //   icon: 'icon-pie-chart'
//   // },
//   // {
//   //   name: 'Icons',
//   //   url: '/icons',
//   //   icon: 'icon-star',
//   //   children: [
//   //     {
//   //       name: 'CoreUI Icons',
//   //       url: '/icons/coreui-icons',
//   //       icon: 'icon-star',
//   //       badge: {
//   //         variant: 'success',
//   //         text: 'NEW'
//   //       }
//   //     },
//   //     {
//   //       name: 'Flags',
//   //       url: '/icons/flags',
//   //       icon: 'icon-star'
//   //     },
//   //     {
//   //       name: 'Font Awesome',
//   //       url: '/icons/font-awesome',
//   //       icon: 'icon-star',
//   //       badge: {
//   //         variant: 'secondary',
//   //         text: '4.7'
//   //       }
//   //     },
//   //     {
//   //       name: 'Simple Line Icons',
//   //       url: '/icons/simple-line-icons',
//   //       icon: 'icon-star'
//   //     }
//   //   ]
//   // },
//   // {
//   //   name: 'Notifications',
//   //   url: '/notifications',
//   //   icon: 'icon-bell',
//   //   children: [
//   //     {
//   //       name: 'Alerts',
//   //       url: '/notifications/alerts',
//   //       icon: 'icon-bell'
//   //     },
//   //     {
//   //       name: 'Badges',
//   //       url: '/notifications/badges',
//   //       icon: 'icon-bell'
//   //     },
//   //     {
//   //       name: 'Modals',
//   //       url: '/notifications/modals',
//   //       icon: 'icon-bell'
//   //     }
//   //   ]
//   // },
//   // {
//   //   name: 'Widgets',
//   //   url: '/widgets',
//   //   icon: 'icon-calculator',
//   //   badge: {
//   //     variant: 'info',
//   //     text: 'NEW'
//   //   }
//   // },
//   // {
//   //   divider: true
//   // },
//   // {
//   //   title: true,
//   //   name: 'Extras',
//   // },
//   // {
//   //   name: 'Pages',
//   //   url: '/pages',
//   //   icon: 'icon-star',
//   //   children: [
//   //     {
//   //       name: 'Login',
//   //       url: '/login',
//   //       icon: 'icon-star'
//   //     },
//   //     {
//   //       name: 'Register',
//   //       url: '/register',
//   //       icon: 'icon-star'
//   //     },
//   //     {
//   //       name: 'Error 404',
//   //       url: '/404',
//   //       icon: 'icon-star'
//   //     },
//   //     {
//   //       name: 'Error 500',
//   //       url: '/500',
//   //       icon: 'icon-star'
//   //     }
//   //   ]
//   // },
//   // {
//   //   name: 'Disabled',
//   //   url: '/dashboard',
//   //   icon: 'icon-ban',
//   //   badge: {
//   //     variant: 'secondary',
//   //     text: 'NEW'
//   //   },
//   //   attributes: { disabled: true },
//   // },
//   // {
//   //   name: 'Download CoreUI',
//   //   url: 'http://coreui.io/angular/',
//   //   icon: 'icon-cloud-download',
//   //   class: 'mt-auto',
//   //   variant: 'success',
//   //   attributes: { target: '_blank', rel: 'noopener' }
//   // },
//   // {
//   //   name: 'Try CoreUI PRO',
//   //   url: 'http://coreui.io/pro/angular/',
//   //   icon: 'icon-layers',
//   //   variant: 'danger',
//   //   attributes: { target: '_blank', rel: 'noopener' }
//   // }
// ];
