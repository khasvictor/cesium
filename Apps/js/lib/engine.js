define('Engine', ['Cesium', 'LocationPickTool','DrawTool', 'BaseObj', 'jquery', 'ThirdParty/when'], function(Cesium, LocationPickTool,DrawTool, BaseObj, $, when) {
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
        },{aa:2});
        var drawTool = new DrawTool(this, $('#tool-bar')[0], function(xy) {
        },{aa:2});

    }



    Engine.prototype.getViewer = function() {
        return this._viewer;
    };

    return Engine;
});
