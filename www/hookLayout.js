#!/usr/bin/env node

//
// This hook copies various resource files
// from our version control system directories
// into the appropriate platform specific location
//


var filestocopy = [{ "plugins/cordova-plugin-drawoverapps/src/android/drawable/close.png": "platforms/android/app/src/main/res/drawable/close.png" },
                   { "plugins/cordova-plugin-drawoverapps/src/android/layout/service_over_apps_head.xml": "platforms/android/app/src/main/res/layout/service_over_apps_head.xml" },
                   { "plugins/cordova-plugin-drawoverapps/src/android/layout/service_over_apps_view.xml": "platforms/android/app/src/main/res/layout/service_over_apps_view.xml" },
                   { "plugins/cordova-plugin-drawoverapps/src/android/layout/key_dispature.xml": "platforms/android/app/src/main/res/layout/key_dispature.xml" } ];

var fs = require('fs');
var path = require('path');

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
            console.log("- Directory :  "+ destdir +" created successfully");
        }
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(
               fs.createWriteStream(destfile));
        }
    });
});
