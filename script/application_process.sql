-- Notes:
-- 1) Application process name doesn't matter
-- 2) Load before header
declare
    l_exists number;
    l_referer varchar2(255);
begin
    l_referer := OWA_UTIL.GET_CGI_ENV('HTTP_REFERER');

    -- cleans and inserts the browsersync host
    if :G_BROWSERSYNC_HOST is not null then
        begin
            execute immediate 'delete from browsersync_host where trunc(date_cre) < trunc(sysdate)';
            execute immediate 'insert into browsersync_host (host, date_cre, app_id) values (:1, sysdate, :2)'
            using :G_BROWSERSYNC_HOST, :APP_ID;
        exception
            when dup_val_on_index then
                null;
        end;
    end if;

    -- verifies if the current host exists in browsersync
    execute immediate 'select distinct 1 from browsersync_host where :1 like ''%'' || host || ''%'' and app_id = :2'
    into l_exists
    using l_referer, :APP_ID;

    -- sets the current host to replace #APP_IMAGES#
    :G_APP_IMAGES := substr(l_referer, 1, instr(l_referer, '/', 1, 3));
exception
    when others then
        -- no table or no data found
        :G_APP_IMAGES := '#APP_IMAGES#';
end;
