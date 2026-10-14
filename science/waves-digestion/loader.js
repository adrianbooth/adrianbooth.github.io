/* Dynamic data loader — loads subjects for selected year */
(function () {
  var years = {
    'y9': ['waves.js', 'digestion.js']
  };

  var selectedYear = 'y9';
  var subjects = years[selectedYear];

  var loaded = 0;
  var total = subjects.length;

  subjects.forEach(function (file) {
    var script = document.createElement('script');
    script.src = 'data/' + selectedYear + '/' + file;
    script.onload = function () {
      loaded++;
      if (loaded === total) {
        // All data files loaded, now load the app
        var appScript = document.createElement('script');
        appScript.src = 'app.js';
        document.body.appendChild(appScript);
      }
    };
    script.onerror = function () {
      console.error('Failed to load: data/' + selectedYear + '/' + file);
      loaded++;
      if (loaded === total) {
        var appScript = document.createElement('script');
        appScript.src = 'app.js';
        document.body.appendChild(appScript);
      }
    };
    document.body.appendChild(script);
  });
})();
