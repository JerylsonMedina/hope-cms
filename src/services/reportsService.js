import { supabase } from '../lib/supabase'

export async function getCustomerSalesSummary() {
  const { data, error } = await supabase
    .from('customer_sales_summary')
    .select('*')
    .order('total_spend', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getTopCustomers(limit = 10) {
  const { data, error } = await supabase
    .from('customer_sales_summary')
    .select('custno, custname, total_transactions, total_spend, last_sale_date')
    .order('total_spend', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}

export async function getProductRevenue() {
  const { data, error } = await supabase
    .from('product_revenue')
    .select('*')
    .order('total_revenue', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getSalesByDateRange(startDate, endDate) {
  const { data, error } = await supabase
    .from('sales')
    .select('*, customer(custname)')
    .gte('salesdate', startDate)
    .lte('salesdate', endDate)
    .order('salesdate', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getTotalRevenue() {
  const { data, error } = await supabase
    .from('product_revenue')
    .select('total_revenue')
  
  if (error) throw error
  
  const total = data.reduce((sum, item) => sum + (parseFloat(item.total_revenue) || 0), 0)
  return { total_revenue: total }
}