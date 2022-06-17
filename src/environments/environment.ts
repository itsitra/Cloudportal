// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true
  , globalLoader: false
  /*, apiUrl: 'http://sitraonline.org/onlineserviceapi/index.php/api/'
  , pgUrl: 'http://sitraonline.org/hdfcpg/'
  , documentsUrl: 'http://sitraonline.org/ukgdownloads/'
  */

  , apiUrl: 'http:///sitraonline.org.in/onlineserviceapi/index.php/api/'
  , pgUrl: 'http://sitraonline.org.in/hdfcpg/'
  , documentsUrl: 'http://sitraonline.org.in/ukgdownloads/'
  , analysisRequestsUrl: 'http://sitraonline.org.in/analysis_requests/'
  , razorpaymentUrl : 'http://sitraonline.org.in/sitrapayments/'
  , baseUrl : 'http://sitraonline.org.in/'

//  , apiUrl: 'http://localhost:82/cloudportalapi/index.php/api/'
//   , pgUrl: 'http://localhost:82/hdfcpg/'
//   , documentsUrl: 'http://localhost:82/ukgdownloads/'
//   , analysisRequestsUrl: 'http://localhost:82/analysis_requests/'
//   , razorpaymentUrl : 'http://localhost:82/sitrapayments/'
//   , baseUrl : 'http://localhost:82/cloudportalapi/'
};
