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
  company_name?: string;
  address: string;
  mobile: string;
};

export type ProductType = {
  id: number | string;
  name: string;
  rate: number | string;
<<<<<<< HEAD
<<<<<<< HEAD
  catagory_name: string | string;
=======
  catagory_name: string;
>>>>>>> db8f4772235c5242f40f9073840c9b3a37adf7ea
=======
  category: string;
>>>>>>> 2859cc141a0fec68a858f9ec78227c74e9134583
};

export type CreateProductType = {
  name: string;
  rate: number | undefined;
  category: number | undefined;
};

export type CategoryType = {
  id: number;
  name: string;
};

export type reateCategoryType = {
  name: string;
};

export type PorductionType = {
  id: number;
  product: {
    id: number;
    name: string;
    rate?: number;
  };
  employee: {
    id: number;
    name: string;
  };
  quantity: number;
  rate: number;
  date: string;
  payment: string;
};

export type CreatePorductionType = {
  employee: number | undefined;
  product: number | undefined;
  rate: number | undefined;
  quantity: number | undefined;
};

export type InventoryType = {
  id: number;
  product: {
    id: number;
    name: string;
  };
  employee: {
    id: number;
    name: string;
  };
  production: number;
  quantity: number;
  status: "IN-STOCK" | "OUT-OF-STOCK";
  date: string;
};

export type CreateInventoryType = {
  production: number | undefined;
  current_status: string | undefined;
};

export type SelectInventoryType = {
  id: number;
  employee: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
  };
  production: {
    id: number;
    quantity: number;
  };
};

// 'id':item.id, 'production': production, 'quantity': item.total, 'current_status': item.current_status, 'date': item.created_at.date()

export type InvoiceType = {
  id: number;
  products: string;
  quantity: string;
  current_status: string;
  total: string;
  date: string;
};

export type CreateInvoiceType = {
  customer_id: number | undefined;
  inventory_id: number[] | undefined;
  date: string | undefined;
};

export type InvoiceColomn = {
  employee: string;
  product: string;
  quantity: string;
  total: number;
};

export type InvoiceDataType = {
  challan_no: number;
  customer_address: string;
  customer_company: string;
  customer_name: string;
  date: string;
  grand_total: number;
  total_column: InvoiceColomn[];
};

export type FilteredBill = {
  id: number;
  employee: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
    category: string;
  };
  challan?: {
    id: number;
    date: string;
  };
  quantity: number;
  rate: number;
  amount: number;
};

export type EmployeeBillFilterParametersType = {
  employee: number | undefined;
  challan: number[] | string | undefined;
  filter_method: string | undefined;
};

export type EmployeeBillType = {
  id: number;
  employee: {
    id: number;
    name: string;
  };
  products: string;
  production: string;
  quantity: string;
  Amount: string;
  current_status: string;
  date: string;
};

export type SingleEmployeeBillType = {
  sl_no: number;
  products: string;
  quantity: string;
  total_pty: string;
  rate: number;
  amount: number;
};

// {'sl_no': sl_no, 'products': f"{products[0].name}", 'quantity':f"{product_qty[:-2]}", 'total_qty':total_qty, 'rate':products[0].rate,'amount': amount}

export type DropdownType = {
  id?: number | string;
  name?: string;
  rate?: number | string;
  catagory_name?: string;

  address?: string;
  mobile?: string;
  nid_no?: string;

  product?: {
    id: number;
    name: string;
    rate?: number;
  };
  employee?: {
    id: number;
    name: string;
  };
  quantity?: number;

  status?: string;

  company_name?: string;

  method?: string;
};
