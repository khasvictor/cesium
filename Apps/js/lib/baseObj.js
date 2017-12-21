define('BaseObj', ['Core/createGuid'], function(createGuid) {
    'use strict';

    function BaseObj() {

    }

    function __typeof__(objClass)
    {
        if ( objClass && objClass.constructor )
        {
            var strFun = objClass.constructor.toString();
            var className = strFun.substr(0, strFun.indexOf('('));
            className = className.replace('function', '');
            return className.replace(/(^\s*)|(\s*$)/ig, '');
        }
        return typeof(objClass);
    }

    BaseObj.prototype.getId = function() {
        return this._id;
    };

    BaseObj.prototype.getOptions = function() {
        return this._options;
    };

    BaseObj.prototype.setOptions = function(options) {
        this._options=options;
    };

    BaseObj.prototype.init = function(options) {
        this._id = createGuid();
        this.setOptions(options);
    };

    BaseObj.prototype.toString=function()
    {
        return __typeof__(this)+':'+this._id;
    };

    return BaseObj;
});
