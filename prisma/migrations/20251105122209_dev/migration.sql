-- RenameIndex
ALTER TABLE `Report`
    DROP INDEX `Report_category_id_fkey`,
    ADD INDEX `Report_category_id_idx` (`category_id`);

