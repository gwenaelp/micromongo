var vm = {};
var contextifiedSandboxes = [];

function createIFrame() {
  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  return iframe;
}

function createIFrameWithContext(sandbox) {
  var iframe = createIFrame();
  var key;
  document.body.appendChild(iframe);
  if (sandbox) {
    for (key in sandbox) {
      if (sandbox.hasOwnProperty(key)) {
        iframe.contentWindow[key] = sandbox[key];
      }
    }
    contextifiedSandboxes.push(sandbox);
  }
  return iframe;
}

function runCodeInNewContext(code, sandbox) {
  var iframe = createIFrameWithContext(sandbox);
  var result = iframe.contentWindow.eval(code);
  document.body.removeChild(iframe);
  return result;
}

function runCodeInContext(code, context) {
  if (!context) {
    throw new Error('Context cannot be undefined');
  }
  return context.eval(code);
}

function Script(code) {
  this.code = code;
}

Script.prototype.runInContext = function (context) {
  return runCodeInContext(this.code, context);
};

Script.prototype.runInNewContext = function (sandbox) {
  return runCodeInNewContext(this.code, sandbox);
};

Script.prototype.runInThisContext = function () {
  return runCodeInContext(this.code, window);
};

vm.Script = Script;

vm.createContext = function (sandbox) {
  return createIFrameWithContext(sandbox).contentWindow;
};

vm.isContext = function (sandbox) {
  return contextifiedSandboxes.indexOf(sandbox) !== -1;
};

vm.runInContext = function (code, context) {
  return runCodeInContext(code, context);
};

vm.runInDebugContext = function () {
  throw new Error('vm.runInDebugContext(code) does not work in browsers');
};

vm.runInNewContext = function (code, sandbox) {
  return runCodeInNewContext(code, sandbox);
};

vm.runInThisContext = function (code) {
  return runCodeInContext(code, window);
};

vm.createScript = function (code) {
  return new vm.Script(code);
};

export default vm;
