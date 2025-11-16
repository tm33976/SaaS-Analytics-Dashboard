import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { User, Sale, DateRange } from '@/types'
import { generateMockUsers, generateMockSales } from '@/utils/mockData'
import { isWithinInterval, parseISO, subDays, format } from 'date-fns'

export const useDataStore = defineStore('data', () => {
  // State
  const users = ref<User[]>([])
  const sales = ref<Sale[]>([])

  const dateRange = ref<DateRange>({
    start: subDays(new Date(), 30),
    end: new Date(),
    label: 'Last 30 Days',
  })

  const initData = () => {
    const storedUsers = localStorage.getItem('saas_dashboard_users')
    const storedSales = localStorage.getItem('saas_dashboard_sales')
    if (storedUsers && storedSales) {
      users.value = JSON.parse(storedUsers)
      sales.value = JSON.parse(storedSales)
    } else {
      console.log('First run: Seeding mock data...')
      users.value = generateMockUsers(20)
      sales.value = generateMockSales(100)
    }
  }

  watch(
    [users, sales],
    () => {
      localStorage.setItem('saas_dashboard_users', JSON.stringify(users.value))
      localStorage.setItem('saas_dashboard_sales', JSON.stringify(sales.value))
    },
    { deep: true },
  )

  const filteredSales = computed(() => {
    return sales.value
      .filter((sale) => {
        const saleDate = parseISO(sale.date)
        return isWithinInterval(saleDate, {
          start: dateRange.value.start,
          end: dateRange.value.end,
        })
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  })

  const totalRevenue = computed(() => {
    return filteredSales.value
      .filter((sale) => sale.status === 'Completed')
      .reduce((sum, sale) => sum + sale.amount, 0)
  })

  const recentSales = computed(() => filteredSales.value.slice(0, 5))

  const salesByMonth = computed(() => {
    const monthlyData: Record<string, number> = {}
    const monthLabels = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    monthLabels.forEach((label) => {
      monthlyData[label] = 0
    })

    sales.value.forEach((sale) => {
      if (sale.status === 'Completed') {
        const month = format(parseISO(sale.date), 'MMM')
        if (typeof monthlyData[month] === 'number') {
          monthlyData[month] += sale.amount
        }
      }
    })

    return {
      labels: monthLabels,
      data: Object.values(monthlyData),
    }
  })

  const setDateRange = (start: Date, end: Date, label: string) => {
    dateRange.value = { start, end, label }
  }

  const addUser = (user: Omit<User, 'id' | 'joinedDate'>) => {
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      joinedDate: new Date().toISOString(),
    }
    users.value.unshift(newUser)
  }
  const deleteUser = (id: string) => {
    users.value = users.value.filter((u) => u.id !== id)
  }
  const updateUser = (updatedUser: User) => {
    const index = users.value.findIndex((u) => u.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = updatedUser
    }
  }

  const addSale = (sale: Omit<Sale, 'id'>) => {
    const newSale: Sale = { ...sale, id: Math.random().toString(36).substr(2, 9) }
    sales.value.unshift(newSale)
  }
  const updateSale = (updatedSale: Sale) => {
    const index = sales.value.findIndex((s) => s.id === updatedSale.id)
    if (index !== -1) {
      sales.value[index] = updatedSale
    }
  }
  const deleteSale = (id: string) => {
    sales.value = sales.value.filter((s) => s.id !== id)
  }

  return {
    users,
    sales,
    dateRange,

    filteredSales,
    totalRevenue,
    recentSales,
    salesByMonth,

    initData,
    setDateRange,

    addUser,
    deleteUser,
    updateUser,

    addSale,
    updateSale,
    deleteSale,
  }
})
