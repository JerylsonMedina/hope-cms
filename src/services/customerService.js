import { supabase } from '../lib/supabase'

// Get all customers
export async function getCustomers() {
  const { data, error } = await supabase
    .from('customer')
    .select('*')
    .order('custno')
  
  if (error) throw error
  return data
}

// Add new customer
export async function addCustomer(customer) {
  const { data, error } = await supabase
    .from('customer')
    .insert([customer])
    .select()
  
  if (error) throw error
  return data[0]
}

// Update customer
export async function updateCustomer(custno, updates) {
  const { data, error } = await supabase
    .from('customer')
    .update(updates)
    .eq('custno', custno)
    .select()
  
  if (error) throw error
  return data[0]
}

// Soft delete (set to INACTIVE)
export async function softDeleteCustomer(custno) {
  const { error } = await supabase
    .from('customer')
    .update({ record_status: 'INACTIVE' })
    .eq('custno', custno)
  
  if (error) throw error
  return true
}

// Recover customer (set to ACTIVE)
export async function recoverCustomer(custno) {
  const { error } = await supabase
    .from('customer')
    .update({ record_status: 'ACTIVE' })
    .eq('custno', custno)
  
  if (error) throw error
  return true
}

// Get next customer number (e.g., C0083)
export async function getNextCustNo() {
  const { data, error } = await supabase
    .from('customer')
    .select('custno')
    .order('custno', { ascending: false })
    .limit(1)
  
  if (error) throw error
  
  if (data.length === 0) return 'C0001'
  
  const lastNum = parseInt(data[0].custno.substring(1))
  const nextNum = lastNum + 1
  return `C${nextNum.toString().padStart(4, '0')}`
}