-- SQLite
SELECT node_id, name, txt, syntax, tags, is_ro, is_richtxt, has_codebox, has_table, has_image, level, ts_creation, ts_lastsave
FROM node;
SELECT node_id, name, txt, syntax, tags, is_ro, is_richtxt, has_codebox, has_table, has_image, level, ts_creation, ts_lastsave
FROM node where node_id=5;


select * from codebox where node_id = 5;