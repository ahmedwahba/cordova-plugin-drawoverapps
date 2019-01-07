#!/usr/bin/env node
/*
A hook to add R.java to the draw activiy in Android platform.
*/


var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];

function replace_string_in_file(filename, to_replace, replace_with) {
    var data = fs.readFileSync(filename, 'utf8');
    var result = data.replace(to_replace, replace_with);
    fs.writeFileSync(filename, result, 'utf8');
}

var target = "stage";
if (process.env.TARGET) {
    target = process.env.TARGET;
}

    var configFile = path.join( "plugins", "android.json");
    var configObject = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  // Add java files where you want to add R.java imports in the following array

    var filestoreplace = [
        "platforms/android/app/src/main/java/org/apache/cordova/overApps/Services/OverAppsService.java"
    ];
    filestoreplace.forEach(function(val, index, array) {
        if (fs.existsSync(val)) {
            //Getting the package name from the android.json file,replace with your plugin's id
            var packageName = configObject.installed_plugins["cordova-plugin-device"]["PACKAGE_NAME"];
            console.log("- hook for import of R.java With the package name: " + packageName);
            replace_string_in_file(val,"import org.apache.cordova.overApps.GeneralUtils.KeyDispatchLayout;","import org.apache.cordova.overApps.GeneralUtils.KeyDispatchLayout;\n\nimport "+packageName+".R;");

        } else {
            console.log("No android platform found! :(");
        }
    });
