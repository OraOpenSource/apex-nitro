-- Notes:
-- 1) Application process name doesn't matter
-- 2) Process Point: On New Instance (new session)
begin
    if :G_APP_IMAGES is null then
        :G_APP_IMAGES := '#APP_IMAGES#';
    else
        -- rebuilds the url
        :G_APP_IMAGES := OWA_UTIL.GET_CGI_ENV('REQUEST_PROTOCOL')
            || '://' ||  replace(:G_APP_IMAGES, '~', ':') || '/';
    end if;
end;
