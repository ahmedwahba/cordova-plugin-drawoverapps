#!/usr/bin/env node
/*
A hook to add R.java to the draw activity in Android platform.
*/
var fs = require('fs');

function get_package_name_from_config() {
  var configXml = fs.readFileSync('config.xml', 'utf8');
  // set package name
  var configXmlArr = configXml.toString().split('\n');

  var str = "";
  for (var i = 0; i < configXmlArr.length; i++) {
    if (configXmlArr[i].includes('widget')) {
      str = configXmlArr[i];
    }
  }

  let m;
  let pkgName = "";

  // if only android-packageName is present
  let regexAndroidPackage = new RegExp('android-packageName="[a-zA-Z0-9\\-\\.]+"', 'gm');

  // if only id is present
  let regex = new RegExp('id="[a-zA-Z0-9\\-\\.]+"', 'gm')

  while ((m = regexAndroidPackage.exec(configXmlArr)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regexAndroidPackage.lastIndex) {
      regexAndroidPackage.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      // get last character

      if (match.includes('android-packageName')) {
        pkgName = match.substring(21, match.length - 1);
      }
    });
  }

  if (pkgName.length < 3) {
    console.log("android-packageName not found, trying id");
    while ((m = regex.exec(configXmlArr)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        // get last character
        match = match.substring(4, match.length - 1)
        if (match.includes('id')) {
          match = match.substring(4, match.length)
        }
        if (match.length > 3) {
          pkgName = match;
        }
      });
    }
  }
  console.log("pkgName: " + pkgName);
  return pkgName;
}

function replace_string_in_file(filename, to_replace, replace_with) {
    var data = fs.readFileSync(filename, 'utf8');
    var result = data.replace(to_replace, replace_with);
    fs.writeFileSync(filename, result, 'utf8');
}

// Add java files where you want to add R.java imports in the following array
var filestoreplace = [
    "platforms/android/app/src/main/java/org/apache/cordova/overApps/Services/OverAppsService.java"
];
filestoreplace.forEach(function(val, index, array) {
    if (fs.existsSync(val)) {
        //Getting the package name from the android.json file,replace with your plugin's id
        var packageName = get_package_name_from_config();
        console.log("- hook for import of R.java With the package name: " + packageName);
        replace_string_in_file(val,"import org.apache.cordova.overApps.GeneralUtils.KeyDispatchLayout;","import org.apache.cordova.overApps.GeneralUtils.KeyDispatchLayout;\n\nimport "+packageName+".R;");
    } else {
        console.log("No android platform found! :(");
    }
});
