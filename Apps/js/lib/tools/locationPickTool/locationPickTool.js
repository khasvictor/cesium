define('LocationPickTool', ['Cesium', 'BaseObj', 'jquery', 'ko'], function(Cesium, BaseObj, $, ko) {
    'use strict';
    LocationPickTool.prototype = Object.create(BaseObj.prototype); //new BaseObj({});
    LocationPickTool.prototype.constructor = LocationPickTool;
    LocationPickTool.prototype.parent = BaseObj.prototype;

    function LocationPickTool(engine, domRoot, callback, options) {
        BaseObj.call(this, options);
        var self = this;
        var _engine = engine;
        var _viewer = engine.getViewer();
        var _handler = new Cesium.ScreenSpaceEventHandler(_viewer.scene.canvas);
        var _callback = callback;

        self.pickSinglePoint = function(movement) {
            var type = 'move';
            var pos = movement.endPosition;
            if (!pos) {
                type = 'click';
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
                    type: type,
                    lon: longitude,
                    lat: latitude,
                    alt: altitude
                };
                self.Log(type + '_' + longitude + '_' + latitude + '_' + altitude);
                if (_callback) {
                    self.onUpdate(_callback, result);
                }
            }
            return result;
        };

        self.rightClick = function(movement) {
            var result = {
                type: 'right'
            };
            if (_callback) {
                self.onUpdate(_callback, result);
            }
            return result;
        };

        self.doubleClick = function(movement) {
            var result = {
                type: 'double'
            };
            if (_callback) {
                self.onUpdate(_callback, result);
            }
            return result;
        };

        self.enable = function(callback) {
            if (callback) {
                _callback = callback;
            }
            _handler.setInputAction(self.pickSinglePoint, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            _handler.setInputAction(self.pickSinglePoint, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            _handler.setInputAction(self.rightClick, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            _handler.setInputAction(self.doubleClick, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            self.isEnabled(true);
        };

        self.disable = function() {
            _handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            _handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            _handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            _handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            self.isEnabled(false);
        };

        // self.isEnabled = ko.observable(false);
        // self.Log = ko.observable('');
        // self.toggleLocationPick = function() {
        //     var enabled = !self.isEnabled();
        //     if (enabled) {
        //         self.enable();
        //     } else {
        //         self.disable();
        //     }
        //     self.isEnabled(enabled);
        // };
        // var id = self.getId();
        // var html= self.getHtml(id);
        // $(domRoot).append(html);
        // ko.applyBindings(self, $(domRoot).find('#' + id)[0]);

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
        // self.BindUI(domRoot);

        self.BindUI(self, domRoot);
        var id = self.getId();
        var html = self.getHtml(id);
        $(domRoot).append(html);
        ko.applyBindings(self, $(domRoot).find('#' + id)[0]);
    }

    LocationPickTool.prototype.BindUI = function(self, domRoot) {
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
            self.afterToggle(enabled);
        };
    };

    LocationPickTool.prototype.afterToggle = function(isEnabled) {
        return;
    };

    LocationPickTool.prototype.onUpdate = function(callback, result) {
        callback(result);
    };

    LocationPickTool.prototype.getHtml = function(id) {
        return '<div id="' + id + '"><button type="button" class="btn btn-primary" data-bind="css:{active: isEnabled()}, click: toggleLocationPick">位置拾取</button><div data-bind="css:{collapse: !isEnabled()}"><div class="card card-body" data-bind="text: Log()"></div></div></div>';
    };

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
