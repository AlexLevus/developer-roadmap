import AuthDirective from './auth';
import PermissionDirective from './permission';

export default {
  isAuthenticated: AuthDirective,
  hasPermission: PermissionDirective
};
