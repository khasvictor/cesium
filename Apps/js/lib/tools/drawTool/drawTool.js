define('DrawTool', ['Cesium', 'LocationPickTool', 'jquery', 'ko'], function(Cesium, LocationPickTool, $, ko) {
    'use strict';
    DrawTool.prototype = Object.create(LocationPickTool.prototype);
    DrawTool.prototype.constructor = DrawTool;
    DrawTool.prototype.parent = LocationPickTool.prototype;

    function DrawTool(engine, domRoot, callback, options) {
        LocationPickTool.call(this, engine, domRoot, callback, options);
        var self = this;
        self.viewer = engine.getViewer();
        self.drawType(0);
        this.dummyGraphic = null;
        this.posArray = [];
    }
    DrawTool.prototype.onUpdate = function(callback, result) {
        if (this.dummyGraphic) {
            this.viewer.entities.remove(this.dummyGraphic);
        }
        switch (this.drawType()) {
            case 0:
                this.dummyGraphic = new Cesium.Entity({
                    position: Cesium.Cartesian3.fromDegrees(Number(result.lon), Number(result.lat), Number(result.alt)),
                    point: {
                        color: Cesium.Color.RED,
                        pixelSize: 8
                    }
                });
                if (result.type === 'click') {
                    this.viewer.entities.add(new Cesium.Entity({
                        position: Cesium.Cartesian3.fromDegrees(Number(result.lon), Number(result.lat), Number(result.alt)),
                        point: {
                            color: Cesium.Color.RED,
                            pixelSize: 8
                        }
                    }));
                } else if (result.type === 'move') {
                    this.viewer.entities.add(this.dummyGraphic);
                }
                break;
            case 1:
                // if (result.type === 'click') {
                //     this.posArray.push(Number(result.lon), Number(result.lat), Number(result.alt));
                // } else if (result.type === 'move' && this.dummyGraphic) {
                //     if (this.posArray.length > 0) {
                //         var dummy = this.posArray.slice(0);
                //         dummy.push(Number(result.lon), Number(result.lat), Number(result.alt));
                //         this.dummyGraphic = new Cesium.Entity({
                //             polyline: {
                //                 positions: Cesium.Cartesian3.fromDegreesArrayHeights(dummy),
                //                 width: 1,
                //                 followSurface: false,
                //                 material: Cesium.Color.RED
                //             }
                //         });
                //     }
                //     this.viewer.entities.add(this.dummyGraphic);
                // } else if (result.type === 'double') {
                //     this.viewer.entities.add(new Cesium.Entity({
                //         polyline: {
                //             positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.posArray),
                //             width: 1,
                //             followSurface: false,
                //             material: Cesium.Color.RED
                //         }
                //     }));
                //     this.posArray = [];
                // }
                break;
            case 2:
                // this.viewer.entities.add({
                //     polygon: {
                //         hierarchy: Cesium.Cartesian3.fromDegreesArray([-115.0, 37.0, -115.0, 32.0, -107.0, 33.0, -102.0, 31.0, -102.0, 35.0]),
                //         material: Cesium.Color.RED
                //     }
                // });

                break;
        }
    };

    LocationPickTool.prototype.afterToggle = function(isEnabled) {
        if (!isEnabled && this.dummyGraphic) {
            this.viewer.entities.remove(this.dummyGraphic);
        }
    };

    DrawTool.prototype.BindUI = function(self, domRoot) {
        this.parent.BindUI.call(this, self, domRoot);
        self.drawType = ko.observable(0);
        self.switchDraw = function(data, event) {
            var val = 0;
            switch (event.currentTarget.innerText) {
                case '点':
                    val = 0;
                    break;
                case '线':
                    val = 1;
                    break;
                case '面':
                    val = 2;
                    break;
            }
            if (val === self.drawType()) {
                self.drawType(-1);
            } else {
                self.drawType(val);
            }
        };
    };

    DrawTool.prototype.getHtml = function(id) {
        return '<div id="' + id + '"><button type="button" class="btn btn-primary" data-bind="css:{active: isEnabled()}, click: toggleLocationPick">绘制</button><div data-bind="css:{collapse: !isEnabled()}"><div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-secondary" data-bind="css:{active: drawType()==0}, click: switchDraw">点</button><button type="button" class="btn btn-secondary" data-bind="css:{active: drawType()==1}, click: switchDraw">线</button><button type="button" class="btn btn-secondary" data-bind="css:{active: drawType()==2}, click: switchDraw">面</button></div></div></div>';
    };
    return DrawTool;
});
