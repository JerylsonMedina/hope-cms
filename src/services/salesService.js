import { supabase } from '../lib/supabase'

// Get all sales transactions
export async function getSales() {
  const { data, error } = await supabase
    .from('sales')
    .select('*, customer(custname)')
    .order('salesDate', { ascending: false })
  
  if (error) throw error
  return data
}

// Get sales by customer
export async function getSalesByCustomer(custNo) {
  const { data, error } = await supabase
    .from('sales')
    .select('*')
    .eq('custNo', custNo)
    .order('salesDate', { ascending: false })
  
  if (error) throw error
  return data
}

// Get sales details for a transaction
export async function getSalesDetail(transNo) {
  const { data, error } = await supabase
    .from('salesDetail')
    .select('*, product(description, unit)')
    .eq('transNo', transNo)
  
  if (error) throw error
  return data
}