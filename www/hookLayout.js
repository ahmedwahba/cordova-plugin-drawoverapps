#!/usr/bin/env node

//
// This hook copies various resource files
// from our version control system directories
// into the appropriate platform specific location
//


var filestocopy = [{ "plugins/cordova-plugin-drawOverApps/src/android/drawable/close.png": "platforms/android/res/drawable/close.png" },
                   { "plugins/cordova-plugin-drawOverApps/src/android/layout/service_over_apps_head.xml": "platforms/android/res/layout/service_over_apps_head.xml" },
                   { "plugins/cordova-plugin-drawOverApps/src/android/layout/service_over_apps_view.xml": "platforms/android/res/layout/service_over_apps_view.xml" },
                   { "plugins/cordova-plugin-drawOverApps/src/android/layout/key_dispature.xml": "platforms/android/res/layout/key_dispature.xml" } ];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        var srcfile =  key;
        var destfile = val;
        console.log("- hook from  "+ srcfile +" to "+ destfile );
        var destdir = path.dirname(destfile);
        // create directory if not exists
        if (!fs.existsSync(destdir)){
            fs.mkdirSync(destdir);
        }
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(
               fs.createWriteStream(destfile));
        }
    });
});
