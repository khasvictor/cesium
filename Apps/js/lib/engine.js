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

        var locationPickTool = new LocationPickTool(this, $(".cesium-viewer-toolbar")[0], function(xy) {
            console.log('1:' + xy.type);
        });

        console.log(locationPickTool.toString());
        // $('.cesium-viewer-toolbar').append('<button id="test" type="button" class="btn" data-bind="click: toggleLocationPick">测试</button>');
        // $('#test').on('click', function() {
        //     locationPickTool.Disable();
        // });


    }



    Engine.prototype.getViewer = function() {
        return this._viewer;
    };

    return Engine;
});
