var helpers = helpers || {};

/* for complex type a java hashmap is needed for binds */
helpers.getBindMap = function() {
    var HashMap = Java.type("java.util.HashMap");
    map = new HashMap();
    return map;
};

/* create a temp blob and load it from a local to sqlcl file */
helpers.getBlobFromFile = function(fileName) {
    try {
        var b = conn.createBlob();
        var out = b.setBinaryStream(1);
        var path = java.nio.file.FileSystems.getDefault().getPath(fileName);

        java.nio.file.Files.copy(path, out);
        out.flush();

        return b;
    } catch (e) {
        ctx.write(e);
    }
};


// Java libraries for folder traversal
var Files = Java.type("java.nio.file.Files");
var Paths = Java.type("java.nio.file.Paths");
var SimpleFileVisitor = Java.type("java.nio.file.SimpleFileVisitor");
var FileVisitResult = Java.type("java.nio.file.FileVisitResult");

var dir = args[1];
var appID = args[2];
var apexSchema = args[3];
var files = [];

var FileFilter = Java.extend(SimpleFileVisitor, {
    visitFile: function(path, attr) {
        if (attr.isRegularFile()) {
            files[files.length] = path;
        }

        return FileVisitResult.CONTINUE;
    }
});

// walk the path with the above visitor
Files.walkFileTree(Paths.get(dir), new FileFilter());

for (var file in files) {
    /* load binds */
    binds = helpers.getBindMap();

    /* add more binds */
    binds.put("path", files[file].toString());
    binds.put("dir", dir);
    binds.put("app_id", appID);

    blob = helpers.getBlobFromFile(files[file]);

    // blob.length()
    ctx.write("Uploading: " + files[file] + "\n")
    binds.put("b", blob);

    // exec the insert and pass binds
    var plsql =
        " declare" +
        "   l_file_name varchar2(4000);" +
        "   l_mime_type varchar2(4000);" +
        "   l_dir varchar2(4000);" +
        "   l_workspace_id number;" +
        "   l_app_id number := :app_id;" +

        "   cursor c_mime_types (p_file_name in varchar2) is" +
        "   select mime_type" +
        "   from xmltable (" +
        "       xmlnamespaces (" +
        "       default 'http://xmlns.oracle.com/xdb/xdbconfig.xsd')," +
        "           '//mime-mappings/mime-mapping' " +
        "           passing xdb.dbms_xdb.cfg_get()" +
        "       columns" +
        "           extension varchar2(50) path 'extension'," +
        "           mime_type varchar2(100) path 'mime-type' " +
        "   )" +
        "   where lower(extension) = lower(substr(p_file_name, instr(p_file_name, '.', -1) + 1));" +
        " begin" +
        // simulates an APEX session to set the security_group_id
        "   select workspace_id" +
        "   into l_workspace_id" +
        "   from apex_applications" +
        "   where application_id = l_app_id;" +

        "   apex_util.set_security_group_id (p_security_group_id => l_workspace_id);" +
        // eliminate the local dist path to get a real file name
        // "C:/dist/css/app.css"
        // becomes
        // "css/app.css"
        "   l_file_name := :path;" +
        "   l_dir := :dir;" +
        "   l_file_name := substr(l_file_name, length(l_dir) + 2);" +
        "   l_file_name := replace(l_file_name, '\', '/');" +

        "   for i in c_mime_types (p_file_name => l_file_name) loop" +
        "     l_mime_type := i.mime_type;" +
        "   end loop;" +
        // inserts the file
        "   " + apexSchema + ".wwv_flow_api.create_app_static_file (" +
        "       p_flow_id      => l_app_id" +
        "       , p_file_name    => l_file_name" +
        "       , p_mime_type    => nvl(l_mime_type, 'application/octet-stream')" +
        "       , p_file_charset => 'utf-8'" +
        "       , p_file_content => :b" +
        "   );" +
        " end;";

    var ret = util.execute(plsql, binds);

    var ex = util.getLastException();

    if (ex) {
        ctx.write(ex + "\n")
    }
}
