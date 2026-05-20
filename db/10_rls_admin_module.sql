ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserModule_Rights" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS user_select_all ON public.user;
DROP POLICY IF EXISTS user_update_admin ON public.user;
DROP POLICY IF EXISTS user_select_own ON public.user;
DROP POLICY IF EXISTS umr_select_all ON "UserModule_Rights";
DROP POLICY IF EXISTS umr_admin_guard ON "UserModule_Rights";

CREATE POLICY user_select_own ON public.user
FOR SELECT TO authenticated
USING (userid = auth.uid()::text);

CREATE POLICY user_select_all ON public.user
FOR SELECT TO authenticated
USING (
  (auth.jwt() ->> 'user_type') IN ('ADMIN','SUPERADMIN')
  OR userid = auth.uid()::text
);

CREATE POLICY user_update_admin ON public.user
FOR UPDATE TO authenticated
USING (
  user_type != 'SUPERADMIN'
  AND (auth.jwt() ->> 'user_type') IN ('ADMIN','SUPERADMIN')
);

CREATE POLICY umr_select_all ON "UserModule_Rights"
FOR SELECT TO authenticated
USING (
  (auth.jwt() ->> 'user_type') IN ('ADMIN','SUPERADMIN')
);

CREATE POLICY umr_admin_guard ON "UserModule_Rights"
FOR ALL TO authenticated
USING (
  NOT EXISTS (
    SELECT 1 FROM public.user
    WHERE userid = "UserModule_Rights".userId
    AND user_type = 'SUPERADMIN'
  )
  AND (auth.jwt() ->> 'user_type') IN ('ADMIN','SUPERADMIN')
);

SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('user', 'UserModule_Rights');

SELECT policyname, tablename, cmd
FROM pg_policies
WHERE tablename IN ('user', 'UserModule_Rights');