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
    // var ret = util.execute("insert into blob_test (path, blob_content, when) values (:path, :b, sysdate)", binds);
    var plsql =
        " declare" +
        "     l_file_name varchar2(4000);" +
        "     l_dir varchar2(4000);" +
        "     l_workspace_id number;" +
        "     l_app_id number := :app_id;" +
        " begin" +
        // simulates an APEX session to set the security_group_id
        "     select workspace_id" +
        "     into l_workspace_id" +
        "     from apex_applications" +
        "     where application_id = l_app_id;" +
        "     apex_util.set_security_group_id (p_security_group_id => l_workspace_id);" +
        // eliminate the local dist path to get a real file name
        // "C:/dist/css/app.css"
        // becomes
        // "css/app.css"
        "     l_file_name := :path;" +
        "     l_dir := :dir;" +
        "     l_file_name := substr(l_file_name, length(l_dir) + 2);" +
        "     l_file_name := replace(l_file_name, '\', '/');" +
        // inserts the file
        "     apex_050000.wwv_flow_api.create_app_static_file (" +
        "         p_flow_id      => l_app_id, /* to change */" +
        "         p_file_name    => l_file_name," +
        "         p_mime_type    => apex_050000.wwv_flow_file_api.get_mime_type(l_file_name)," +
        "         p_file_charset => 'utf-8'," +
        "         p_file_content => :b" +
        "     );" +
        " end;";

    var ret = util.execute(plsql, binds);

    var ex = util.getLastException();

    if (ex) {
        ctx.write(ex + "\n")
    }
}
