define('DrawTool', ['Cesium', 'LocationPickTool', 'jquery', 'ko'], function(Cesium, LocationPickTool, $, ko) {
    'use strict';
    DrawTool.prototype = Object.create(LocationPickTool.prototype);
    function DrawTool(engine, domRoot, callback, options) {
        LocationPickTool.call(this,engine,domRoot,callback,options);
        var self =this;
        self.viewer = engine.getViewer();
    }
    DrawTool.prototype.onUpdate = function(callback,result) {
        if(result.type==='click')
        {
            this.viewer.entities.add({
                position : Cesium.Cartesian3.fromDegrees(Number(result.lon),Number(result.lat),Number(result.alt)),
                point : {
                    color : Cesium.Color.RED,
                    pixelSize : 8
                }
            });
        }
    };

    LocationPickTool.prototype.BindUI=function(self,domRoot)
    {
        self.isEnabled = ko.observable(false);
        self.Log = ko.observable('');
        self.toggleLocationPick = function() {
            var enabled = !self.isEnabled();
            if (enabled) {
                self.enable();
            } else {
                self.disable();
            }
            self.isEnabled(enabled);
        };
    };

    DrawTool.prototype.getHtml = function(id) {
       return '<div id="' + id + '"><button type="button" class="btn btn-primary" data-bind="css:{active: isEnabled()}, click: toggleLocationPick">绘制</button><div data-bind="css:{collapse: !isEnabled()}"><div class="card card-body" data-bind=""><div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-secondary">点</button><button type="button" class="btn btn-secondary">线</button><button type="button" class="btn btn-secondary">面</button></div></div></div></div>';
    };
    return DrawTool;
});
