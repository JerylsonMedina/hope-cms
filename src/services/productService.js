import { supabase } from '../lib/supabase'

// Get all products with current prices
export async function getProducts() {
  const { data, error } = await supabase
    .from('product_current_price')
    .select('*')
    .order('prodCode')
  
  if (error) throw error
  return data
}

// Get price history of a product
export async function getPriceHistory(prodCode) {
  const { data, error } = await supabase
    .from('priceHist')
    .select('*')
    .eq('prodCode', prodCode)
    .order('effDate', { ascending: false })
  
  if (error) throw error
  return data
}