var MyExtensionJavaScriptClass = function() {};

MyExtensionJavaScriptClass.prototype = {
  run: function(arguments) {
    arguments.completionFunction({"title": document.title, "url": document.location.href});
  }
};

var ExtensionPreprocessingJS = new MyExtensionJavaScriptClass;
