import { askAsync, getAsync, PermissionType } from 'expo-permissions';

export const getPermissions = (permissionType: PermissionType) => {
  return getAsync(permissionType)
    .then((permission) => {
      if (permission.status !== 'granted') {
        return askAsync(permissionType);
      } else {
        return permission;
      }
    })
    .then((permission) => {
      if (permission.status !== 'granted') {
        return false;
      } else {
        return true;
      }
    });
};
