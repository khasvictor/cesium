//This file is automatically rebuilt by the Cesium build process.
define(function() {
    'use strict';
    return "float czm_discardIfClippedWithIntersect(vec4 clippingPlanes[czm_maxClippingPlanes], int clippingPlanesLength)\n\
{\n\
if (clippingPlanesLength > 0)\n\
{\n\
bool clipped = true;\n\
vec4 position = czm_windowToEyeCoordinates(gl_FragCoord);\n\
vec3 clipNormal = vec3(0.0);\n\
vec3 clipPosition = vec3(0.0);\n\
float clipAmount = 0.0;\n\
float pixelWidth = czm_metersPerPixel(position);\n\
for (int i = 0; i < czm_maxClippingPlanes; ++i)\n\
{\n\
if (i == clippingPlanesLength)\n\
{\n\
break;\n\
}\n\
clipNormal = clippingPlanes[i].xyz;\n\
clipPosition = -clippingPlanes[i].w * clipNormal;\n\
float amount = dot(clipNormal, (position.xyz - clipPosition)) / pixelWidth;\n\
clipAmount = max(amount, clipAmount);\n\
clipped = clipped && (amount <= 0.0);\n\
}\n\
if (clipped)\n\
{\n\
discard;\n\
}\n\
return clipAmount;\n\
}\n\
return 0.0;\n\
}\n\
";
});