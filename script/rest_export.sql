set define off verify off feedback off
whenever sqlerror exit sql.sqlcode rollback
--------------------------------------------------------------------------------
--
-- ORACLE Application Express (APEX) export file
--
-- You should run the script connected to SQL*Plus as the Oracle user
-- APEX_050000 or as the owner (parsing schema) of the application.
--
-- NOTE: Calls to apex_application_install override the defaults below.
--
--------------------------------------------------------------------------------
begin
wwv_flow_api.import_begin (
 p_version_yyyy_mm_dd=>'2013.01.01'
,p_default_workspace_id=>50654249616769752
);
end;
/
prompt  Set Application Offset...
begin
   -- SET APPLICATION OFFSET
   wwv_flow_api.g_id_offset := nvl(wwv_flow_application_install.get_offset,0);
null;
end;
/
begin
wwv_flow_api.remove_restful_service(
 p_id=>wwv_flow_api.id(18591049064398528211)
,p_name=>'browsersync'
);
 
end;
/
prompt --application/restful_services/browsersync
begin
wwv_flow_api.create_restful_module(
 p_id=>wwv_flow_api.id(18591049064398528211)
,p_name=>'browsersync'
,p_uri_prefix=>'browsersync/'
,p_parsing_schema=>'APEX_VMORNEAU'
,p_items_per_page=>25
,p_status=>'PUBLISHED'
,p_row_version_number=>51
);
wwv_flow_api.create_restful_template(
 p_id=>wwv_flow_api.id(18591049209926528212)
,p_module_id=>wwv_flow_api.id(18591049064398528211)
,p_uri_template=>'host'
,p_priority=>0
,p_etag_type=>'HASH'
);
wwv_flow_api.create_restful_handler(
 p_id=>wwv_flow_api.id(18624110281324692061)
,p_template_id=>wwv_flow_api.id(18591049209926528212)
,p_source_type=>'PLSQL'
,p_format=>'DEFAULT'
,p_method=>'DELETE'
,p_require_https=>'NO'
,p_source=>wwv_flow_utilities.join(wwv_flow_t_varchar2(
'begin',
'    execute immediate ''delete from browsersync_host where host = :1'' USING :host;',
'exception ',
'    when others then',
'        null; -- record does not exist or table does not exist',
'end;'))
);
wwv_flow_api.create_restful_param(
 p_id=>wwv_flow_api.id(18633868645096651159)
,p_handler_id=>wwv_flow_api.id(18624110281324692061)
,p_name=>'Browsersync-Host'
,p_bind_variable_name=>'host'
,p_source_type=>'HEADER'
,p_access_method=>'IN'
,p_param_type=>'STRING'
);
wwv_flow_api.create_restful_handler(
 p_id=>wwv_flow_api.id(18591297140909476995)
,p_template_id=>wwv_flow_api.id(18591049209926528212)
,p_source_type=>'PLSQL'
,p_format=>'DEFAULT'
,p_method=>'POST'
,p_require_https=>'NO'
,p_source=>wwv_flow_utilities.join(wwv_flow_t_varchar2(
'begin',
'    execute immediate ''insert into browsersync_host (host) values (:1)'' USING :host;',
'exception ',
'    when others then',
'        null; -- record already exists or table does not exists',
'end;'))
);
wwv_flow_api.create_restful_param(
 p_id=>wwv_flow_api.id(18624231643774703535)
,p_handler_id=>wwv_flow_api.id(18591297140909476995)
,p_name=>'Browsersync-Host'
,p_bind_variable_name=>'host'
,p_source_type=>'HEADER'
,p_access_method=>'IN'
,p_param_type=>'STRING'
);
end;
/
begin
wwv_flow_api.import_end(p_auto_install_sup_obj => nvl(wwv_flow_application_install.get_auto_install_sup_obj, false));
commit;
end;
/
set verify on feedback on define on
prompt  ...done
