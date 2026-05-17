import { supabase } from '../lib/supabase'

// Get all users (for admin panel)
export async function getUsers() {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Activate a user (set record_status to 'ACTIVE')
export async function activateUser(userId) {
  const { error } = await supabase
    .from('user')
    .update({ record_status: 'ACTIVE' })
    .eq('userid', userId)
  
  if (error) throw error
  return true
}

// Deactivate a user (set record_status to 'INACTIVE')
export async function deactivateUser(userId) {
  const { error } = await supabase
    .from('user')
    .update({ record_status: 'INACTIVE' })
    .eq('userid', userId)
  
  if (error) throw error
  return true
}

// Get user by ID
export async function getUserById(userId) {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('userid', userId)
    .single()
  
  if (error) throw error
  return data
}