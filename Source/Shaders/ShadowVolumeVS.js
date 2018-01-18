//This file is automatically rebuilt by the Cesium build process.
define(function() {
    'use strict';
    return "#ifdef VECTOR_TILE\n\
attribute vec3 position;\n\
attribute float a_batchId;\n\
uniform mat4 u_modifiedModelViewProjection;\n\
#else\n\
attribute vec3 position3DHigh;\n\
attribute vec3 position3DLow;\n\
attribute vec4 color;\n\
attribute float batchId;\n\
#endif\n\
#ifdef EXTRUDED_GEOMETRY\n\
attribute vec3 extrudeDirection;\n\
uniform float u_globeMinimumAltitude;\n\
#endif\n\
#ifndef VECTOR_TILE\n\
varying vec4 v_color;\n\
#endif\n\
void main()\n\
{\n\
#ifdef VECTOR_TILE\n\
gl_Position = czm_depthClampFarPlane(u_modifiedModelViewProjection * vec4(position, 1.0));\n\
#else\n\
v_color = color;\n\
vec4 position = czm_computePosition();\n\
#ifdef EXTRUDED_GEOMETRY\n\
float delta = min(u_globeMinimumAltitude, czm_geometricToleranceOverMeter * length(position.xyz));\n\
delta *= czm_sceneMode == czm_sceneMode3D ? 1.0 : 0.0;\n\
position = position + vec4(extrudeDirection * delta, 0.0);\n\
#endif\n\
gl_Position = czm_depthClampFarPlane(czm_modelViewProjectionRelativeToEye * position);\n\
#endif\n\
}\n\
";
});