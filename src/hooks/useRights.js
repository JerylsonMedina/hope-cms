import { useAuth } from '../context/AuthContext'

export function useRights() {
  const { user_type, loading } = useAuth()

  // While loading, return false for all rights
  if (loading) {
    return {
      canAdd: false,
      canEdit: false,
      canDelete: false,
      canViewDeleted: false,
      canAdmin: false,
      loading: true
    }
  }

  // SUPERADMIN has all rights
  if (user_type === 'SUPERADMIN') {
    return {
      canAdd: true,
      canEdit: true,
      canDelete: true,
      canViewDeleted: true,
      canAdmin: true,
      userType,
      loading: false
    }
  }

  // ADMIN can add, edit, view deleted, but NO delete
  if (user_type === 'ADMIN') {
    return {
      canAdd: true,
      canEdit: true,
      canDelete: false,
      canViewDeleted: true,
      canAdmin: true,
      userType,
      loading: false
    }
  }

  // Regular USER has only view permissions
  return {
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canViewDeleted: false,
    canAdmin: false,
    userType,
    loading: false
  }
}