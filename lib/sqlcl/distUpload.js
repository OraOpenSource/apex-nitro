/*
    This is a javascript library to make some of the common things
    in SQLCL simplier.
*/

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

/* makes getting a DBUtil instance easier */
helpers.getDBUtil = function() {
    var DBUtil = Java.type("oracle.dbtools.db.DBUtil");
    return DBUtil;
}

/* This converts the results of util.executeReturnList from a java List<HashMap> to a JSON object. */
helpers.resultsToJSON = function(ret) {
    var data = [];

    for (r in ret) {
        /* loop all the columns in the row */
        var set = ret[r].keySet().iterator();;
        var row = {};

        while (set.hasNext()) {
            var key = set.next();
            row[key] = ret[r][key];
        }

        data[data.length] = row;
    }

    return data;
}

/*
 *  Runs the passed in command and returns an Object with
 *   .rc      - the return code
 *   .stdout  - STDOUT
 *   .stderr  - STDERR
 *
 */
helpers.exec = function(cmd) {
    var RunTime = Java.type("java.lang.Runtime");
    var Scanner = Java.type("java.util.Scanner");
    var p = RunTime.getRuntime().exec(cmd);

    var ret = {};
    s = new Scanner(p.getInputStream()).useDelimiter("\\A");
    ret.stdout = s.hasNext() ? s.next().trim() : "";
    s = new Scanner(p.getErrorStream()).useDelimiter("\\A");
    ret.stderr = s.hasNext() ? s.next().trim() : "";

    p.waitFor();
    ret.rc = p.exitValue();
    p.destroy();

    ctx.write(ret.stdout);
    ctx.write("\n");

    return ret;
}

ctx.write("Params (" + args.length + "):" + "\n");
for(var i = 0; i < args.length; i++){
    ctx.write(i + ": " + args[i] + "\n");
}

ctx.write("START\n");

/* File name */
var files = helpers.exec("find . ").stdout.split('\n');
ctx.write(typeof(files) + "\n");
ctx.write(files.length + "\n");
ctx.write(files[0] + "\n");

var ret = helpers.exec('ls -l');

ctx.write("Return Code:\n");
ctx.write(ret.rc + "\n");

ctx.write("STDOUT:\n");
ctx.write(ret.stdout + "\n");

ctx.write("STDERR:\n");
ctx.write(ret.stderr + "\n");

/* bind map for reuse */
var binds = helpers.getBindMap();

// for(f in files ) {
   //  ctx.write("Loading : " + files[f] + "\n");
  /* load the blob */
  // blob = helpers.getBlobFromFile(files[f]);

  /* assign the binds */
  // binds.put("path",files[f]);
  // binds.put("b",blob);

 /* Just do it */
  // var ret = util.execute("insert into k(path,blob_content,when) values(:path , :b, sysdate)",binds);
// }

// var file = path.resolve("C:/Users/vince/Dropbox/Public/GitHub/material-apex/dist");
// ctx.write(file);
// var binds = helpers.getBindMap();
// var blob = helpers.getBlobFromFile(file);
//
// binds.put("path", file);
// binds.put("b", blob);
//
// var ret = util.execute("insert into blob_test (path, blob_content, when) values (:path, :b, sysdate)", binds);

ctx.write("END\n");
