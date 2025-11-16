export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive';
  avatar: string;
  joinedDate: string; 
}

export interface Sale {
  id: string;
  productName: string;
  amount: number;
  currency: string;
  date: string; 
  customerName: string;
  status: 'Completed' | 'Pending' | 'Refunded';
}

export interface DateRange {
  start: Date;
  end: Date;
  label: string;
}