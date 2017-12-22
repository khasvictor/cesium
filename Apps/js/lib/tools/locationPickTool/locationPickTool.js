define('LocationPickTool', ['Cesium', 'BaseObj', 'jquery', 'ko'], function(Cesium, BaseObj, $, ko) {
    'use strict';
    LocationPickTool.prototype = new BaseObj({});
    LocationPickTool.prototype.constructor = LocationPickTool;
    LocationPickTool.prototype.parent = BaseObj.prototype;

    function LocationPickTool(engine, domRoot, callback, options) {
        var self = this;
        self.init(options);
        var _engine = engine;
        var _viewer = engine.getViewer();
        var _handler = new Cesium.ScreenSpaceEventHandler(_viewer.scene.canvas);

        var _callback = callback;

        self.pickSinglePoint = function(movement) {
            var type='移动';
            var pos = movement.endPosition;
            if (!pos) {
                type='抬起';
                pos = movement.position;
            }

            var result = null;
            var viewer = _engine.getViewer();
            var scene = viewer.scene;
            var ray = viewer.camera.getPickRay(pos);
            var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            var pickedObject = scene.pick(pos);
            if (pickedObject) {
                cartesian = scene.pickPosition(pos);
            }
            if (cartesian) {
                var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                var longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
                var latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
                var altitude = cartographic.height.toFixed(2);
                result = {
                    type:type,
                    lon: longitude,
                    lat: latitude,
                    alt: altitude
                };
                self.Log(type+'_'+longitude+'_'+latitude+'_'+altitude);
            }
            if (_callback) {
                _callback(result);
            }
            return result;
        };

        self.enable = function(callback) {
            if (callback) {
                _callback = callback;
            }
            _handler.setInputAction(self.pickSinglePoint, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            _handler.setInputAction(self.pickSinglePoint, Cesium.ScreenSpaceEventType.LEFT_UP);
            self.isEnabled(true);
        };

        self.disable = function() {
            _handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            _handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);
            self.isEnabled(false);
        };

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

        var id = self.getId();
        $(domRoot).append('<div id="' + id + '"><button type="button" class="btn btn-primary" data-bind="css:{active: isEnabled()}, click: toggleLocationPick">位置拾取</button><div data-bind="css:{collapse: !isEnabled()}"><div class="card card-body" data-bind="text: Log()"></div></div></div>');

        // var ViewModel = function() {
        //     self.status = ko.observable(false);
        //     self.toggleLocationPick = function() {
        //         var enabled = !self.isEnabled();
        //         if (enabled) {
        //             self.enable();
        //         } else {
        //             self.disable();
        //         }
        //         self.status(enabled);
        //     };
        // };

        // var viewModel = new ViewModel();

        // var viewModel = {
        //     status: ko.observable(false),
        //     toggleLocationPick: function() {
        //         var enabled = !self.isEnabled();
        //         if (enabled) {
        //             self.enable();
        //         } else {
        //             self.disable();
        //         }
        //         self.status(enabled);
        //     }
        // };

        ko.applyBindings(self, $(domRoot).find('#' + id)[0]);
    }

    LocationPickTool.prototype.Enable = function(callback) {
        this.enable(callback);

    };
    LocationPickTool.prototype.Disable = function() {
        this.disable();
    };

    LocationPickTool.prototype.PickSinglePoint = function(xy) {
        return this.pickSinglePoint({
            endPosition: xy
        });
    };

    return LocationPickTool;
});
