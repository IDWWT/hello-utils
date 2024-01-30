CREATE TABLE coworker (
  coworker_id char(36),
  coworker_name varchar(100) NOT NULL,
  coworker_role varchar(30) NOT NULL,
  PRIMARY KEY (coworker_id),
  UNIQUE KEY (coworker_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;