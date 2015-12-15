-- Notes:
-- 1) Application process name doesn't matter
-- 2) Load before header
declare
    l_exists number;
begin
    -- cleans and inserts the browsersync host
    if :G_BROWSERSYNC_HOST is not null then
        begin
            execute immediate 'delete from browsersync_host where trunc(date_cre) < trunc(sysdate)';
            execute immediate 'insert into browsersync_host values (:1, sysdate)'
            using :G_BROWSERSYNC_HOST;
        exception
            when dup_val_on_index then
                null;
        end;
    end if;

    -- verifies if the current host exists in browsersync
    execute immediate 'select distinct 1 from browsersync_host where :1 like ''%'' || host || ''%'''
    into l_exists
    using OWA_UTIL.GET_CGI_ENV('HTTP_REFERER');

    -- sets the current host to replace #APP_IMAGES#
    :G_APP_IMAGES := SUBSTR(OWA_UTIL.GET_CGI_ENV('HTTP_REFERER'), 1, INSTR(OWA_UTIL.GET_CGI_ENV('HTTP_REFERER'), '/', 1, 3));
exception
    when no_data_found then
        -- no table or no data found
        :G_APP_IMAGES := '#APP_IMAGES#';
end;
