-- Notes:
-- 1) Application process name doesn't matter
-- 2) Load before header
declare
    l_exists number;
begin
    -- inserts the browsersync host
    if :G_BROWSERSYNC_HOST is not null then
        begin
            execute immediate 'insert into browsersync_host values (:1)'
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
    when others then
        -- no table or no data found
        -- in all cases, fall back to #APP_IMAGES#
        :G_APP_IMAGES := '#APP_IMAGES#';
end;
