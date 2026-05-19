# Final RLS Audit — hope-cms
## M3 Database Engineer

---

## RLS Status — All Tables

| Table             | RLS Enabled       |
|---|---|---|---|---|---|---|---|---|---|
| Module            | true              |
| UserModule_Rights | true              |
| customer          | true              |
| pricehist         | true              |
| product           | true              |
| rights            | true              |
| sales             | true              |
| salesdetail       | true              |
| user              | true              |
| user_module       | true              |

---

## RLS Policies — customer table (5 policies)

| UserModule_Rights | Type | Description |
|---|---|---|
| cust_visibility | SELECT | USER sees ACTIVE only, ADMIN/SUPERADMIN sees all |
| customer_insert | INSERT | Gated by CUST_ADD right |
| customer_update_edit | UPDATE | Gated by CUST_EDIT right |
| customer_softdelete | UPDATE | Gated by CUST_DEL right |
| customer_recovery | UPDATE | ADMIN/SUPERADMIN only |

---

## RLS Policies — view-only tables (SELECT only)

| Table | Policy | Type |
|---|---|---|
| sales | sales_select_only | SELECT |
| salesDetail | salesdetail_select_only | SELECT |
| product | product_select_only | SELECT |
| priceHist | pricehist_select_only | SELECT |

---

## RLS Policies — admin module

| Table | Policy | Type | Description |
|---|---|---|---|
| user | user_select_all | SELECT | ADMIN/SUPERADMIN only |
| user | user_update_admin | UPDATE | Cannot modify SUPERADMIN |
| UserModule_Rights | umr_select_all | SELECT | ADMIN/SUPERADMIN only |
| UserModule_Rights | umr_admin_guard | ALL | Blocks SUPERADMIN row changes |

---

## SQL Views Created

| View | Security |
|---|---|
| product_current_price | security_invoker = true |
| customer_sales_summary | security_invoker = true |
| product_revenue | security_invoker = true |

---

## Hard Delete Audit

- ✅ No DELETE statements in any migration file
- ✅ No DELETE policies on any table
- ✅ Soft delete only via record_status = 'INACTIVE'
- ✅ SUPERADMIN row is protected from deletion via RLS guard on UserModule_Rights

---

## SUPERADMIN Verification

- ✅ jcesperanza@neu.edu.ph exists as SUPERADMIN / ACTIVE
- ✅ SUPERADMIN cannot be modified by ADMIN via RLS
- ✅ SUPERADMIN has all 9 rights set to 1