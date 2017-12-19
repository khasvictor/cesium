require.config({
    paths: {
        'cesium': '../../Build/CesiumUnminified/Cesium'
    }
});

require(['cesium'], function(cesium) {
    'use strict';

    var viewer = new Cesium.Viewer('cesiumContainer', {
        infoBox: true,
        selectionIndicator: true,
        shadows: true,
        terrainShadows: Cesium.ShadowMode.ENABLED
    });

    //var shadowMap = viewer.shadowMap;
    // shadowMap.maxmimumDistance = 100.0;
    // shadowMap.softShadows = false;
    //shadowMap.size = 512;

    // viewer.extend(Cesium.viewerCesiumInspectorMixin);
    // viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);

    // var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    //     url: 'http://localhost/tileset/tileset.json'
    // }));

    // tileset.readyPromise.then(function() {
    //     var boundingSphere = tileset.boundingSphere;
    //     viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.3, 0.0));
    //     viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    // });

    // var blueBox = viewer.entities.add({
    //     name: 'Blue box',
    //     position: Cesium.Cartesian3.fromDegrees(110.0, 40.0, 0.0),
    //     box: {
    //         dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    //         material: Cesium.Color.BLUE
    //     }
    // });
});
