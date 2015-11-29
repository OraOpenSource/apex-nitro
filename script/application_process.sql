-- Notes:
-- 1) Application process name doesn't matter
-- 2) Load before header
begin
    -- TODO vmorneau: Review logic and comment
    if OWA_UTIL.GET_CGI_ENV('HTTP_REFERER') like '%localhost%' then
        apex_application.g_flow_images := SUBSTR(OWA_UTIL.GET_CGI_ENV('HTTP_REFERER'), 1, INSTR(OWA_UTIL.GET_CGI_ENV('HTTP_REFERER'), '/', 1, 3));
    else
        execute immediate 'select host from browsersync_host where ''' || OWA_UTIL.GET_CGI_ENV('HTTP_REFERER') || ''' like ''%'' || host || ''%'''
        into apex_application.g_flow_images;
    end if;
exception when others then
    null; -- table doesn't exist or host doesn't exists in table
end;
