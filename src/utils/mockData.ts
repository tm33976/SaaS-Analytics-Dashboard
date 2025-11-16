import type { User, Sale } from '@/types'
import { subDays } from 'date-fns'

const generateId = () => Math.random().toString(36).substr(2, 9)

export const generateMockUsers = (count: number): User[] => {
  const roles = ['Admin', 'Editor', 'Viewer'] as const
  const statuses = ['Active', 'Inactive'] as const

  return Array.from({ length: count }).map((_, i) => ({
    id: generateId(),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,

    role: roles[Math.floor(Math.random() * roles.length)] || 'Viewer',

    status: statuses[Math.floor(Math.random() * statuses.length)] || 'Active',
    avatar: `https://ui-avatars.com/api/?name=User+${i + 1}&background=random`,
    joinedDate: subDays(new Date(), Math.floor(Math.random() * 365)).toISOString(),
  }))
}

export const generateMockSales = (count: number): Sale[] => {
  const statuses = ['Completed', 'Pending', 'Refunded'] as const

  return Array.from({ length: count }).map((_, i) => ({
    id: generateId(),
    productName: `SaaS License ${['Basic', 'Pro', 'Enterprise'][Math.floor(Math.random() * 3)]}`,
    amount: Math.floor(Math.random() * 500) + 50,
    currency: 'USD',
    date: subDays(new Date(), Math.floor(Math.random() * 60)).toISOString(),
    customerName: `Customer ${i + 1}`,

    status: statuses[Math.floor(Math.random() * statuses.length)] || 'Completed',
  }))
}
