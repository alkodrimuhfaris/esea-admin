import {combineReducers} from 'redux';

// crud product
import getAllProducts from './products/getAllProducts';
import getProductDetails from './products/getProductDetails';
import createProduct from './products/createProduct';
import updateProduct from './products/updateProduct';
import deleteProduct from './products/deleteProduct';

// registrations
import getAllRegistrator from './registrations/getAllRegistrator';
import deleteRegistrator from './registrations/deleteRegistrator';

// categories
import getAllCategories from './categories/getAllCategories';

// querySearch
import querySearch from './querySearch/querySearch';

// auth
import auth from './auth/auth';

// signup
import signup from './auth/signUp';

// profile
import getProfile from './profile/getProfile';
import updatePassword from './profile/updatePassword';
import updateProfile from './profile/updateProfile';
import deleteAvatar from './profile/deleteAvatar';

// users
import createUser from './users/createUser';
import deleteUser from './users/deleteUser';
import getAllUsers from './users/getAllUsers';
import getDetailUser from './users/getDetailUser';
import updateUser from './users/updateUser';

export default combineReducers({
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,

  getAllRegistrator,
  deleteRegistrator,

  getAllCategories,

  querySearch,

  auth,

  signup,

  getProfile,
  updatePassword,
  updateProfile,
  deleteAvatar,

  createUser,
  deleteUser,
  getAllUsers,
  getDetailUser,
  updateUser,
});
