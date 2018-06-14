define([
        '../../Core/buildModuleUrl',
        '../../Core/createWorldTerrain',
        '../../Core/EllipsoidTerrainProvider',
        '../../Core/VRTheWorldTerrainProvider',
        '../BaseLayerPicker/ProviderViewModel'
    ], function(
        buildModuleUrl,
        createWorldTerrain,
        EllipsoidTerrainProvider,
        VRTheWorldTerrainProvider,
        ProviderViewModel) {
    'use strict';

    /**
     * @private
     */
    function createDefaultTerrainProviderViewModels() {
        var providerViewModels = [];
        providerViewModels.push(new ProviderViewModel({
            name : 'WGS84 Ellipsoid',
            iconUrl : buildModuleUrl('Widgets/Images/TerrainProviders/Ellipsoid.png'),
            tooltip : 'WGS84 standard ellipsoid, also known as EPSG:4326',
            category: 'Cesium ion',
            creationFunction : function() {
                return new EllipsoidTerrainProvider();
            }
        }));

        providerViewModels.push(new ProviderViewModel({
            name : 'Cesium World Terrain',
            iconUrl : buildModuleUrl('Widgets/Images/TerrainProviders/CesiumWorldTerrain.png'),
            tooltip : 'High-resolution global terrain tileset curated from several datasources and hosted by Cesium ion',
            category: 'Cesium ion',
            creationFunction : function(){
                return createWorldTerrain({
                    requestWaterMask: true,
                    requestVertexNormals: true
                });
            }
        }));

        providerViewModels.push(new ProviderViewModel({
            name : 'Terrain data courtesy VT MÄK',
            iconUrl : buildModuleUrl('Widgets/Images/TerrainProviders/Ellipsoid.png'),
            tooltip : 'Terrain data courtesy VT MÄK',
            creationFunction : function() {
                return new VRTheWorldTerrainProvider({
                    url : 'http://www.vr-theworld.com/vr-theworld/tiles1.0.0/73/',
                    credit : 'Terrain data courtesy VT MÄK'
                });
            }
        }));
        return providerViewModels;
    }

    return createDefaultTerrainProviderViewModels;
});
