import Starter from '../views/starter/starter.jsx';
// ui components
import Alerts from '../views/ui-components/alert.jsx';
import Badges from '../views/ui-components/badge.jsx';
import Buttons from '../views/ui-components/button.jsx';
import Cards from '../views/ui-components/cards.jsx';
import LayoutComponent from '../views/ui-components/layout.jsx';
import PaginationComponent from '../views/ui-components/pagination.jsx';
import PopoverComponent from '../views/ui-components/popover.jsx';
import TooltipComponent from '../views/ui-components/tooltip.jsx';
import Login from '../components/login/login.jsx';
import Myprofile from '../components/dashboard-components/myprofile/myprofile.jsx';
import Myaccount from '../components/dashboard-components/myaccount/myaccount.jsx';

import Addaccount from '../components/dashboard-components/myaccount/addAccount.jsx';
import EditAccount from '../components/dashboard-components/myaccount/editAccount.jsx';

import Mylines from '../components/dashboard-components/mylines/mylines.jsx';
import addMylinetoken from '../components/dashboard-components/mylines/addMylinetoken.jsx';


import Clientnvender from '../components/dashboard-components/clientnvender/clientnvender.jsx';
import tokenbalance from '../components/dashboard-components/tokenbalance/tokenbalance.jsx';

import raisedinvoice from '../components/dashboard-components/raisedinvoice/raisedinvoice.jsx';
import uploadraiseinvoice from '../components/dashboard-components/raisedinvoice/uploadraiseinvoice.jsx';
import discountinvoice from '../components/dashboard-components/raisedinvoice/discountinvoice.jsx';



import recieveinvoice from '../components/dashboard-components/recieveinvoice/recieveinvoice.jsx';

import recievedinvoice from '../components/dashboard-components/recievedinvoice/recievedinvoice.jsx';
import Addvendor from '../components/dashboard-components/clientnvender/addvendor.jsx';




import Signup from '../components/login/signup.jsx';
var ThemeRoutes = [

  
  // { 
  //   path: '/dashboard', 
  //   name: 'Dashboard', 
  //   icon: 'ti-loop', 
  //   component: Starter 
  // },
  {
    path: '/myprofile',
    name: 'My Profile',
    icon: 'user',
    component: Myprofile
  },

  {
    path: '/myaccount',
    name: 'My Account',
    icon: 'ledger (1)',
    component: Myaccount
  },

  {
    path: '/addacount',
    name: 'Add Account',
    icon: 'ledger (1)',
    component: Addaccount,
    show:"inner"
  },

  {
    path: '/Editacount',
    name: 'Edit Account',
    icon: 'ledger (1)',
    component: EditAccount,
    show:"inner"
  },
 
  {
    path: '/myline',
    name: 'My Lines',
    icon: 'report',
    component: Mylines
  },
  {
    path: '/addtoken',
    name: 'Add Token',
    icon: 'report',
    component: addMylinetoken,
    show:"inner"
  },
  {
    path: '/uploadinvoice',
    name: 'Upload Invoice',
    icon: 'report',
    component: uploadraiseinvoice,
    show:"inner"
  },
  {
    path: '/discountinvoice',
    name: 'Discount Invoice',
    icon: 'report',
    component: discountinvoice,
    show:"inner"
  },

  

  {
    path: '/clientNvendor',
    name: 'Client / Venders',
    icon: 'supplier',
    component: Clientnvender
  },

  {
    path: '/tokenbalance',
    name: 'Token Balance',
    icon: 'p2p',
    component: tokenbalance
  },

  {
    path: '/raisedinvoice',
    name: 'Raised Invoice',
    icon: 'invoice',
    component: raisedinvoice
  },
  {
    path: '/recieveinvoice',
    name: 'Recieve Invoice',
    icon: 'lending',
    component: recieveinvoice
  },
  {
    path: '/recievedinvoice',
    name: 'Recieved Invoice',
    icon: 'evaluate',
    component: recievedinvoice
  },
  
  {
    path: '/addvendor',
    name: 'Add Vendor',
    icon: 'ledger (1)',
    component: Addvendor,
    show:"inner"
  },
 
  // {
  //   path: '/alert',
  //   name: 'My Account',
  //   icon: 'mdi mdi-comment-processing-outline',
  //   component: Alerts
  // },
  // {
  //   path: '/badge',
  //   name: 'Badges',
  //   icon: 'mdi mdi-arrange-send-backward',
  //   component: Badges
  // },
  // {
  //   path: '/button',
  //   name: 'Buttons',
  //   icon: 'mdi mdi-toggle-switch',
  //   component: Buttons
  // },
  // {
  //   path: '/card',
  //   name: 'Cards',
  //   icon: 'mdi mdi-credit-card-multiple',
  //   component: Cards
  // },
  // {
  //   path: '/grid',
  //   name: 'Grid',
  //   icon: 'mdi mdi-apps',
  //   component: LayoutComponent
  // },
  // {
  //   path: '/pagination',
  //   name: 'Pagination',
  //   icon: 'mdi mdi-priority-high',
  //   component: PaginationComponent
  // },
  // {
  //   path: '/popover',
  //   name: 'Popover',
  //   icon: 'mdi mdi-pencil-circle',
  //   component: PopoverComponent
  // },
  // {
  //   path: '/ui-components/tooltip',
  //   name: 'Toltips',
  //   icon: 'mdi mdi-image-filter-vintage',
  //   component: TooltipComponent
  // },
  { path: '/', pathTo: '/', name: 'Login', redirect:"true", component: Login }
];
export default ThemeRoutes;

