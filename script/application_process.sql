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
,p_release=>'5.0.2.00.07'
,p_default_workspace_id=>50654249616769752
,p_default_application_id=>59075
,p_default_owner=>'APEX_VMORNEAU'
);
end;
/
prompt --application/set_environment
 
prompt APPLICATION 59075 - Material APEX Dev
--
-- Application Export:
--   Application:     59075
--   Name:            Material APEX Dev
--   Date and Time:   19:50 Sunday November 29, 2015
--   Exported By:     VINCENT.MORNEAU@GMAIL.COM
--   Flashback:       0
--   Export Type:     Component Export
--   Manifest
--     APP PROCESS: set_app_images
--   Manifest End
--   Version:         5.0.2.00.07
--   Instance ID:     63113759365424
--

-- C O M P O N E N T    E X P O R T
begin
  wwv_flow_api.g_mode := 'REPLACE';
end;
/
prompt --application/shared_components/logic/application_processes/18522602095077720370
begin
wwv_flow_api.create_flow_process(
 p_id=>wwv_flow_api.id(18522602095077720370)
,p_process_sequence=>1
,p_process_point=>'BEFORE_HEADER'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'set_app_images'
,p_process_sql_clob=>wwv_flow_utilities.join(wwv_flow_t_varchar2(
'begin',
'    execute immediate ''select host from browsersync_host where '''''' || OWA_UTIL.GET_CGI_ENV(''HTTP_REFERER'') || '''''' like ''''%'''' || host || ''''%'''''' ',
'    into apex_application.g_flow_images;',
'exception when others then  ',
'    null; -- table doesn''t exist or host doesn''t exists in table',
'end;'))
);
end;
/
begin
wwv_flow_api.import_end(p_auto_install_sup_obj => nvl(wwv_flow_application_install.get_auto_install_sup_obj, false), p_is_component_import => true);
commit;
end;
/
set verify on feedback on define on
prompt  ...done
