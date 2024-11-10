export type UserType = {
  name: string | undefined;
  email: string;
  password: string;
  confirmPassword: string | undefined;
};

export type SignupUserType = {
  name: string | undefined;
  email: string;
  password: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type EmployeeType = {
  id: number;
  name: string;
  address: string;
  mobile: string;
  nid_no?: string;
};

export type CreateEmployeeType = {
  name: string;
  address: string;
  mobile: string;
  nid_no?: string | undefined;
};

export type CustomerType = {
  id: number;
  name: string;
  company_name: string;
  address: string;
  mobile: string;
};

export type CreateCustomerType = {
  name: string;
  company_name: string;
  address: string;
  mobile: string;
};

export type ProductType = {
  id: number | string;
  name: string;
  rate: number | string;
<<<<<<< HEAD
  catagory_name: string | string;
=======
  catagory_name: string;
>>>>>>> db8f4772235c5242f40f9073840c9b3a37adf7ea
};

export type CreateProductType = {
  name: string;
  rate: number | undefined;
  catagory_id: number | undefined;
};

export type CategoryType = {
  id: number;
  name: string;
};

export type reateCategoryType = {
  name: string;
};

// export type ProductType = {
//   id: number;
//   name: string;
//   rate: number;

// }
