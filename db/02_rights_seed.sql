CREATE TABLE public.user (
  userid        VARCHAR(60) NOT NULL PRIMARY KEY,
  user_type     VARCHAR(12) CONSTRAINT utype_ck 
                CHECK (user_type IN ('USER','ADMIN','SUPERADMIN')),
  record_status VARCHAR(10) DEFAULT 'INACTIVE',
  stamp         VARCHAR(60)
);

CREATE TABLE "Module" (
  moduleCode    VARCHAR(10) NOT NULL PRIMARY KEY,
  moduleDesc    VARCHAR(30),
  record_status VARCHAR(10),
  stamp         VARCHAR(60)
);

CREATE TABLE rights (
  rightId       VARCHAR(15) NOT NULL PRIMARY KEY,
  rightDesc     VARCHAR(30),
  right_value   INT,
  moduleCode    VARCHAR(10) REFERENCES "Module",
  record_status VARCHAR(10),
  stamp         VARCHAR(60)
);

CREATE TABLE user_module (
  userId       VARCHAR(60) NOT NULL REFERENCES public.user,
  moduleCode   VARCHAR(10) NOT NULL REFERENCES "Module",
  rights_value INT,
  PRIMARY KEY (userId, moduleCode)
);

CREATE TABLE "UserModule_Rights" (
  userId      VARCHAR(60) NOT NULL REFERENCES public.user,
  rightId     VARCHAR(15) NOT NULL REFERENCES rights,
  right_value INT,
  PRIMARY KEY (userId, rightId)
);

INSERT INTO "Module" VALUES ('Cust_Mod',  'Customer Module',  'ACTIVE', 'SEEDED');
INSERT INTO "Module" VALUES ('Sales_Mod', 'Sales Module',     'ACTIVE', 'SEEDED');
INSERT INTO "Module" VALUES ('Prod_Mod',  'Product Module',   'ACTIVE', 'SEEDED');
INSERT INTO "Module" VALUES ('Adm_Mod',   'Admin Module',     'ACTIVE', 'SEEDED');

INSERT INTO rights VALUES ('CUST_VIEW',  'View Customers',       1,'Cust_Mod', 'ACTIVE','SEEDED');
INSERT INTO rights VALUES ('CUST_ADD',   'Add Customer',         1,'Cust_Mod', 'ACTIVE','SEEDED');
INSERT INTO rights VALUES ('CUST_EDIT',  'Edit Customer',        1,'Cust_Mod', 'ACTIVE','SEEDED');
INSERT INTO rights VALUES ('CUST_DEL',   'Soft Delete Customer', 1,'Cust_Mod', 'ACTIVE','SEEDED');
INSERT INTO rights VALUES ('SALES_VIEW', 'View Sales',           1,'Sales_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('SD_VIEW',    'View Sales Detail',    1,'Sales_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('PROD_VIEW',  'View Products',        1,'Prod_Mod', 'ACTIVE','SEEDED');
INSERT INTO rights VALUES ('PRICE_VIEW', 'View Price History',   1,'Prod_Mod', 'ACTIVE','SEEDED');
INSERT INTO rights VALUES ('ADM_USER',   'Admin Activate User',  1,'Adm_Mod',  'ACTIVE','SEEDED');

INSERT INTO public.user (userid, user_type, record_status)
VALUES ('jcesperanza@neu.edu.ph', 'SUPERADMIN', 'ACTIVE');

INSERT INTO user_module VALUES ('jcesperanza@neu.edu.ph','Cust_Mod',  1);
INSERT INTO user_module VALUES ('jcesperanza@neu.edu.ph','Sales_Mod', 1);
INSERT INTO user_module VALUES ('jcesperanza@neu.edu.ph','Prod_Mod',  1);
INSERT INTO user_module VALUES ('jcesperanza@neu.edu.ph','Adm_Mod',   1);

INSERT INTO "UserModule_Rights" VALUES ('jcesperanza@neu.edu.ph','CUST_VIEW',  1);
INSERT INTO "UserModule_Rights" VALUES ('jcesperanza@neu.edu.ph','CUST_ADD',   1);
INSERT INTO "UserModule_Rights" VALUES ('jcesperanza@neu.edu.ph','CUST_EDIT',  1);
INSERT INTO "UserModule_Rights" VALUES ('jcesperanza@neu.edu.ph','CUST_DEL',   1);
INSERT INTO "UserModule_Rights" VALUES ('jcesperanza@neu.edu.ph','SALES_VIEW', 1);
INSERT INTO "UserModule_Rights" VALUES ('jcesperanza@neu.edu.ph','SD_VIEW',    1);
INSERT INTO "UserModule_Rights" VALUES ('jcesperanza@neu.edu.ph','PROD_VIEW',  1);
INSERT INTO "UserModule_Rights" VALUES ('jcesperanza@neu.edu.ph','PRICE_VIEW', 1);
INSERT INTO "UserModule_Rights" VALUES ('jcesperanza@neu.edu.ph','ADM_USER',   1);