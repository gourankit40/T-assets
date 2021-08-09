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
import Forgetpassword from '../components/login/forgetpassword.jsx';

import Signup from '../components/login/signup.jsx';
var ThemeRoutes = [

  
  { 
    path: '/dashboard', 
    name: 'Users', 
    icon: 'ti-loop', 
    component: Starter 
  },
  { path: '/', pathTo: '/', name: 'Login', redirect:"true", component: Login }
];
export default ThemeRoutes;
