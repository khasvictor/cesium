define('Engine', ['Cesium', 'LocationPickTool', 'BaseObj', 'jquery', 'ThirdParty/when'], function(Cesium, LocationPickTool, BaseObj, $, when) {
    'use strict';

    function Engine(container) {

        this._viewer = new Cesium.Viewer(container, {
            infoBox: true,
            selectionIndicator: true,
            shadows: false,
            terrainShadows: Cesium.ShadowMode.ENABLED,
            cesiumInspector: true
        });

        var locationPickTool = new LocationPickTool(this, $('#tool-bar')[0], function(xy) {
            console.log('1:' + xy.type);
        });
        var locationPickTool2 = new LocationPickTool(this, $('#tool-bar')[0], function(xy) {
            console.log('2:' + xy.type);
        });
        console.log(locationPickTool.toString());


    }



    Engine.prototype.getViewer = function() {
        return this._viewer;
    };

    return Engine;
});
