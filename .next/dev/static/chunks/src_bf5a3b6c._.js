(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/data/concepts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONCEPTS",
    ()=>CONCEPTS,
    "convertBJJConceptToConceptPoint",
    ()=>convertBJJConceptToConceptPoint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
;
var CONCEPTS = [
    {
        id: "empathy",
        label: "Empathy",
        x: 0.72,
        y: 0.41,
        category: "Grappling Primitives",
        description: "Understanding your opponent's position and intentions"
    },
    {
        id: "pressure",
        label: "Pressure",
        x: -0.35,
        y: -0.62,
        category: "Physical Techniques",
        description: "Applying controlled pressure to control your opponent"
    },
    {
        id: "timing",
        label: "Timing",
        x: 0.58,
        y: 0.73,
        category: "Mental Skills",
        description: "Recognizing and executing techniques at the right moment"
    },
    {
        id: "balance",
        label: "Balance",
        x: -0.12,
        y: 0.25,
        category: "Physical Techniques",
        description: "Maintaining your own balance while disrupting your opponent's"
    }
];
function convertBJJConceptToConceptPoint(concept) {
    // Convert 0-1 range to -1 to 1 range
    // X axis: axis_mental_physical (0=Mental/left, 1=Physical/right)
    // Y axis: axis_self_opponent (0=Opponent/bottom, 1=Self/top)
    // In our coordinate system: -1 to 1, where center is 0
    // SVG Y increases downward, so we invert: Self (1) should be at top (-1)
    var x = (concept.axis_mental_physical - 0.5) * 2; // 0->-1 (Mental/left), 0.5->0, 1->1 (Physical/right)
    var y = -((concept.axis_self_opponent - 0.5) * 2); // 0->1 (Opponent/bottom), 0.5->0, 1->-1 (Self/top)
    return {
        id: concept.id,
        label: concept.concept,
        x: x,
        y: y,
        category: concept.category,
        description: concept.description,
        color: concept.color
    };
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/matrix/panzoom.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePanZoom",
    ()=>usePanZoom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
var MIN_ZOOM = 0.5;
var MAX_ZOOM = 5;
var ZOOM_STEP = 0.1;
var DEFAULT_ZOOM = 1;
function usePanZoom(initialState) {
    _s();
    var _initialState_zoom, _initialState_translateX, _initialState_translateY;
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        zoom: (_initialState_zoom = initialState === null || initialState === void 0 ? void 0 : initialState.zoom) !== null && _initialState_zoom !== void 0 ? _initialState_zoom : DEFAULT_ZOOM,
        translateX: (_initialState_translateX = initialState === null || initialState === void 0 ? void 0 : initialState.translateX) !== null && _initialState_translateX !== void 0 ? _initialState_translateX : 0,
        translateY: (_initialState_translateY = initialState === null || initialState === void 0 ? void 0 : initialState.translateY) !== null && _initialState_translateY !== void 0 ? _initialState_translateY : 0
    }), 2), state = _useState[0], setState = _useState[1];
    var isPanning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    var lastPanPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    var zoomBy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[zoomBy]": function(delta, centerX, centerY, width, height) {
            setState({
                "usePanZoom.useCallback[zoomBy]": function(prev) {
                    var newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev.zoom + delta));
                    var zoomRatio = newZoom / prev.zoom;
                    // If center point is provided, zoom towards that point
                    // centerX/Y are in screen pixel coordinates
                    // The transform is: scale(z) translate(tx/z, ty/z)
                    // SVG applies right-to-left: translate first, then scale
                    // So: translate(tx/z, ty/z) then scale(z)
                    // A data point at (dx, dy) becomes: ((dx + tx/z) * z, (dy + ty/z) * z) = (dx*z + tx, dy*z + ty)
                    // 
                    // To keep a screen point (sx, sy) fixed:
                    // 1. Convert screen to viewBox coordinates (before transform): vx = (sx / width) * 4 - 2
                    // 2. Find what data point is currently at this viewBox position: dx = (vx - tx) / z
                    // 3. After zoom, we want the same data point at the same screen position
                    // 4. So: vx' = dx * z' + tx' = vx
                    // 5. Solving: tx' = vx - dx * z' = vx - (vx - tx) * z' / z = vx * (1 - z'/z) + tx * z'/z
                    if (centerX !== undefined && centerY !== undefined && width && height) {
                        // Convert screen pixel to data coordinate (in viewBox space -2 to 2)
                        // Current viewBox: minX, minY, size (where size = 4/zoom)
                        var currentViewBoxSize = 4 / prev.zoom;
                        var currentMinX = -2 - prev.translateX - (currentViewBoxSize - 4) / 2;
                        var currentMinY = -2 - prev.translateY - (currentViewBoxSize - 4) / 2;
                        // Screen point in viewBox coordinates (where the dot actually is)
                        var dataX = currentMinX + centerX / width * currentViewBoxSize;
                        var dataY = currentMinY + centerY / height * currentViewBoxSize;
                        // After zoom, we want this same data point to stay at the same screen position
                        // New viewBox size
                        var newViewBoxSize = 4 / newZoom;
                        // Calculate new translate to keep dataX at the same screen position
                        // dataX = newMinX + (centerX / width) * newViewBoxSize
                        // So: newMinX = dataX - (centerX / width) * newViewBoxSize
                        var newMinX = dataX - centerX / width * newViewBoxSize;
                        var newMinY = dataY - centerY / height * newViewBoxSize;
                        // Convert back to translate coordinates
                        // newMinX = -2 - newTranslateX - (newViewBoxSize - 4) / 2
                        // So: newTranslateX = -2 - newMinX - (newViewBoxSize - 4) / 2
                        var newTranslateX = -2 - newMinX - (newViewBoxSize - 4) / 2;
                        var newTranslateY = -2 - newMinY - (newViewBoxSize - 4) / 2;
                        return {
                            zoom: newZoom,
                            translateX: newTranslateX,
                            translateY: newTranslateY
                        };
                    }
                    // Zoom without center point - zoom around current center
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                        zoom: newZoom
                    });
                }
            }["usePanZoom.useCallback[zoomBy]"]);
        }
    }["usePanZoom.useCallback[zoomBy]"], []);
    var panBy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[panBy]": function(deltaX, deltaY) {
            // deltaX and deltaY are in viewBox units
            // When panning, we move the viewBox, which means we adjust translate
            // Since viewBox moves in the opposite direction of the pan, we subtract
            setState({
                "usePanZoom.useCallback[panBy]": function(prev) {
                    return {
                        translateX: prev.translateX - deltaX,
                        translateY: prev.translateY - deltaY,
                        zoom: prev.zoom
                    };
                }
            }["usePanZoom.useCallback[panBy]"]);
        }
    }["usePanZoom.useCallback[panBy]"], []);
    var reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[reset]": function() {
            setState({
                zoom: DEFAULT_ZOOM,
                translateX: 0,
                translateY: 0
            });
        }
    }["usePanZoom.useCallback[reset]"], []);
    var setZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[setZoom]": function(zoom) {
            setState({
                "usePanZoom.useCallback[setZoom]": function(prev) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                        zoom: Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom))
                    });
                }
            }["usePanZoom.useCallback[setZoom]"]);
        }
    }["usePanZoom.useCallback[setZoom]"], []);
    var zoomIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[zoomIn]": function() {
            zoomBy(ZOOM_STEP);
        }
    }["usePanZoom.useCallback[zoomIn]"], [
        zoomBy
    ]);
    var zoomOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[zoomOut]": function() {
            zoomBy(-ZOOM_STEP);
        }
    }["usePanZoom.useCallback[zoomOut]"], [
        zoomBy
    ]);
    // Mouse pan handlers
    var handleMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleMouseDown]": function(e) {
            if (e.button === 0) {
                isPanning.current = true;
                lastPanPoint.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                e.preventDefault();
            }
        }
    }["usePanZoom.useCallback[handleMouseDown]"], []);
    var handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleMouseMove]": function(e, convertToViewBox) {
            if (isPanning.current) {
                var deltaX = e.clientX - lastPanPoint.current.x;
                var deltaY = e.clientY - lastPanPoint.current.y;
                // If conversion function provided, use it (for viewBox units)
                // Otherwise use screen pixels (legacy behavior)
                if (convertToViewBox) {
                    var viewBoxDelta = convertToViewBox(deltaX, deltaY);
                    panBy(viewBoxDelta.x, viewBoxDelta.y);
                } else {
                    panBy(deltaX, deltaY);
                }
                lastPanPoint.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                e.preventDefault();
            }
        }
    }["usePanZoom.useCallback[handleMouseMove]"], [
        panBy
    ]);
    var handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleMouseUp]": function() {
            isPanning.current = false;
        }
    }["usePanZoom.useCallback[handleMouseUp]"], []);
    var handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleWheel]": function(e) {
            e.preventDefault();
            var delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
            var rect = e.currentTarget.getBoundingClientRect();
            // Get mouse position relative to the container (in screen pixels)
            var centerX = e.clientX - rect.left;
            var centerY = e.clientY - rect.top;
            // Zoom towards the mouse position
            zoomBy(delta, centerX, centerY);
        }
    }["usePanZoom.useCallback[handleWheel]"], [
        zoomBy
    ]);
    // Touch handlers
    var touchStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var handleTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleTouchStart]": function(e) {
            if (e.touches.length === 1) {
                touchStartRef.current = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                    distance: 0
                };
            } else if (e.touches.length === 2) {
                var touch1 = e.touches[0];
                var touch2 = e.touches[1];
                var distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
                touchStartRef.current = {
                    x: (touch1.clientX + touch2.clientX) / 2,
                    y: (touch1.clientY + touch2.clientY) / 2,
                    distance: distance
                };
            }
        }
    }["usePanZoom.useCallback[handleTouchStart]"], []);
    var handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleTouchMove]": function(e, convertToViewBox, width, height) {
            if (!touchStartRef.current) return;
            if (e.touches.length === 1 && touchStartRef.current.distance === 0) {
                // Single finger pan
                var deltaX = e.touches[0].clientX - touchStartRef.current.x;
                var deltaY = e.touches[0].clientY - touchStartRef.current.y;
                if (convertToViewBox) {
                    var viewBoxDelta = convertToViewBox(deltaX, deltaY);
                    panBy(viewBoxDelta.x, viewBoxDelta.y);
                } else {
                    panBy(deltaX, deltaY);
                }
                touchStartRef.current.x = e.touches[0].clientX;
                touchStartRef.current.y = e.touches[0].clientY;
            } else if (e.touches.length === 2 && touchStartRef.current.distance > 0) {
                // Two finger pinch zoom
                var touch1 = e.touches[0];
                var touch2 = e.touches[1];
                var distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
                var scale = distance / touchStartRef.current.distance;
                var rect = e.currentTarget.getBoundingClientRect();
                var centerX = touchStartRef.current.x - rect.left;
                var centerY = touchStartRef.current.y - rect.top;
                zoomBy((scale - 1) * ZOOM_STEP * 2, centerX, centerY, width, height);
                touchStartRef.current.distance = distance;
            }
        }
    }["usePanZoom.useCallback[handleTouchMove]"], [
        panBy,
        zoomBy
    ]);
    var handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleTouchEnd]": function() {
            touchStartRef.current = null;
        }
    }["usePanZoom.useCallback[handleTouchEnd]"], []);
    return {
        state: state,
        zoomBy: zoomBy,
        panBy: panBy,
        reset: reset,
        setZoom: setZoom,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        handlers: {
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: handleMouseUp,
            onMouseLeave: handleMouseUp,
            onWheel: handleWheel,
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd
        }
    };
}
_s(usePanZoom, "MeU65zqlJV7V0wa4Ee5lcskY6pM=");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/matrix/scales.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Scale helpers for converting between normalized coordinates (-1 to 1) and screen coordinates
 */ __turbopack_context__.s([
    "clamp",
    ()=>clamp,
    "getViewBox",
    ()=>getViewBox,
    "normalizedToScreen",
    ()=>normalizedToScreen,
    "screenToNormalized",
    ()=>screenToNormalized
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
;
function normalizedToScreen(normalized, viewport, axis) {
    var center = axis === 'x' ? viewport.width / 2 : viewport.height / 2;
    var range = axis === 'x' ? viewport.width : viewport.height;
    var scale = range * viewport.zoom / 2;
    return center + normalized * scale + (axis === 'x' ? viewport.translateX : viewport.translateY);
}
function screenToNormalized(screen, viewport, axis) {
    var center = axis === 'x' ? viewport.width / 2 : viewport.height / 2;
    var range = axis === 'x' ? viewport.width : viewport.height;
    var scale = range * viewport.zoom / 2;
    return (screen - center - (axis === 'x' ? viewport.translateX : viewport.translateY)) / scale;
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function getViewBox(viewport) {
    // Base viewBox is -2 to 2 (width 4, height 4)
    // Zoom: viewBox size = 4 / zoom (zoom=2 means size=2, showing 2x zoom)
    var viewBoxSize = 4 / viewport.zoom;
    // Pan: translate moves the viewBox window
    // Base center is at (0, 0) in viewBox coordinates
    // translateX/Y moves the center of what we see
    var minX = -2 - viewport.translateX - (viewBoxSize - 4) / 2;
    var minY = -2 - viewport.translateY - (viewBoxSize - 4) / 2;
    return "".concat(minX, " ").concat(minY, " ").concat(viewBoxSize, " ").concat(viewBoxSize);
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_without_properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
;
var Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border border-border-subtle bg-bg-raised text-text-primary shadow-card", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 8,
        columnNumber: 3
    }, _this);
});
_c1 = Card;
Card.displayName = "Card";
var CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 23,
        columnNumber: 3
    }, _this);
});
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
var CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-semibold leading-none tracking-tight", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 35,
        columnNumber: 3
    }, _this);
});
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
var CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-text-muted", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 50,
        columnNumber: 3
    }, _this);
});
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
var CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, _this);
});
_c9 = CardContent;
CardContent.displayName = "CardContent";
var CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 70,
        columnNumber: 3
    }, _this);
});
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_without_properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
;
var badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            "default": "border-transparent bg-accent-primary text-white",
            secondary: "border-transparent bg-bg-raised text-text-primary",
            destructive: "border-transparent bg-red-600 text-white",
            outline: "text-text-primary border-border-subtle"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge(_param) {
    var className = _param.className, variant = _param.variant, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className",
        "variant"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant: variant
        }), className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/concept-matrix/matrix-controls.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatrixControls",
    ()=>MatrixControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-client] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-client] (ecmascript) <export default as ZoomOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function MatrixControls(param) {
    var onZoomIn = param.onZoomIn, onZoomOut = param.onZoomOut, onReset = param.onReset, onQuadrant = param.onQuadrant, className = param.className;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "icon",
                        onClick: onZoomIn,
                        className: "h-10 w-10",
                        "aria-label": "Zoom in",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "icon",
                        onClick: onZoomOut,
                        className: "h-10 w-10",
                        "aria-label": "Zoom out",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "icon",
                        onClick: onReset,
                        className: "h-10 w-10",
                        "aria-label": "Reset view",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            onQuadrant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-1 mt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: function() {
                            return onQuadrant(1);
                        },
                        className: "h-8 text-xs",
                        "aria-label": "Quadrant 1",
                        children: "Q1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: function() {
                            return onQuadrant(2);
                        },
                        className: "h-8 text-xs",
                        "aria-label": "Quadrant 2",
                        children: "Q2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: function() {
                            return onQuadrant(3);
                        },
                        className: "h-8 text-xs",
                        "aria-label": "Quadrant 3",
                        children: "Q3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: function() {
                            return onQuadrant(4);
                        },
                        className: "h-8 text-xs",
                        "aria-label": "Quadrant 4",
                        children: "Q4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = MatrixControls;
var _c;
__turbopack_context__.k.register(_c, "MatrixControls");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/data/load-concepts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadConcepts",
    ()=>loadConcepts,
    "loadConceptsSync",
    ()=>loadConceptsSync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/concepts.ts [app-client] (ecmascript)");
;
;
;
;
;
function loadConcepts() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
        var response, data, seenIds, concepts, categoryMap, error;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        fetch("/data/BJJMasterList.json", {
                            cache: "force-cache"
                        })
                    ];
                case 1:
                    response = _state.sent();
                    if (!response.ok) {
                        throw new Error("Failed to load concepts: ".concat(response.status));
                    }
                    return [
                        4,
                        response.json()
                    ];
                case 2:
                    data = _state.sent();
                    if (!data.skillsMasterList || !Array.isArray(data.skillsMasterList)) {
                        throw new Error("Invalid data format");
                    }
                    // Convert BJJConcept to ConceptPoint and handle duplicates
                    // Use a Set to track seen IDs and ensure uniqueness
                    seenIds = new Set();
                    concepts = [];
                    data.skillsMasterList.forEach(function(concept, index) {
                        // Create a base ID
                        var baseId = concept.id || "concept-".concat(index);
                        var uniqueId = baseId;
                        var duplicateCount = 0;
                        // If we've seen this ID before, append a counter to make it unique
                        while(seenIds.has(uniqueId)){
                            duplicateCount++;
                            uniqueId = "".concat(baseId, "-dup-").concat(duplicateCount);
                        }
                        seenIds.add(uniqueId);
                        concepts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertBJJConceptToConceptPoint"])({
                            id: uniqueId,
                            concept: concept.concept,
                            description: concept.description || concept.short_description,
                            category: concept.category,
                            axis_self_opponent: concept.axis_self_opponent,
                            axis_mental_physical: concept.axis_mental_physical,
                            color: concept.color
                        }));
                    });
                    // Log if we found duplicates
                    if (concepts.length !== data.skillsMasterList.length) {
                        console.warn("Found ".concat(data.skillsMasterList.length - concepts.length, " duplicate concept IDs"));
                    }
                    // Extract unique categories with colors and axis labels
                    categoryMap = new Map();
                    if (data.categories && Array.isArray(data.categories)) {
                        data.categories.forEach(function(cat) {
                            if (cat.name && cat.color) {
                                categoryMap.set(cat.name, {
                                    color: cat.color,
                                    xAxis: cat.xAxis,
                                    yAxis: cat.yAxis
                                });
                            }
                        });
                    }
                    // Add category colors to concepts
                    concepts.forEach(function(concept) {
                        if (!concept.color && categoryMap.has(concept.category)) {
                            concept.color = categoryMap.get(concept.category).color;
                        }
                    });
                    return [
                        2,
                        {
                            concepts: concepts,
                            categories: Array.from(categoryMap.entries()).map(function(param) {
                                var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(param, 2), name = _param[0], data = _param[1];
                                return {
                                    name: name,
                                    color: data.color,
                                    xAxis: data.xAxis,
                                    yAxis: data.yAxis
                                };
                            })
                        }
                    ];
                case 3:
                    error = _state.sent();
                    console.error("Failed to load concepts:", error);
                    // Return empty data on error
                    return [
                        2,
                        {
                            concepts: [],
                            categories: []
                        }
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    })();
}
function loadConceptsSync() {
    // For static builds, we'll need to import the JSON directly
    // This is a fallback - in practice, we'll use the async version
    return {
        concepts: [],
        categories: []
    };
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/concept-matrix/concept-matrix.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConceptMatrix",
    ()=>ConceptMatrix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/concepts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$panzoom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/matrix/panzoom.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$scales$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/matrix/scales.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$concept$2d$matrix$2f$matrix$2d$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/concept-matrix/matrix-controls.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$load$2d$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/load-concepts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
// Category color mapping - will be populated from actual data
var CATEGORY_COLORS = {
    "Grappling Primitives": "#848a94",
    Tactics: "#8A2BE2",
    Strategy: "#FF8C00",
    Training: "#00CED1",
    Coaching: "#6b6d70",
    Memes: "#8A2BE2",
    "21 Immutable Principles": "#FFD700",
    "32 Principles": "#FFD700",
    Default: "#6B7280"
};
function getCategoryColor(category, categoryMap) {
    if (categoryMap && categoryMap.has(category)) {
        return categoryMap.get(category);
    }
    return CATEGORY_COLORS[category] || CATEGORY_COLORS.Default;
}
function ConceptMatrix(param) {
    var _this = this;
    var initialConcepts = param.concepts, initialWidth = param.width, initialHeight = param.height;
    _s();
    var containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 800,
        height: 600
    }), 2), dimensions = _useState[0], setDimensions = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), selectedConcept = _useState1[0], setSelectedConcept = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), hoveredConcept = _useState2[0], setHoveredConcept = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    }), 2), tooltipPosition = _useState3[0], setTooltipPosition = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialConcepts || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONCEPTS"]), 2), concepts = _useState4[0], setConcepts = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!initialConcepts), 2), loading = _useState5[0], setLoading = _useState5[1];
    var _useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), conceptData = _useState6[0], setConceptData = _useState6[1];
    var _useState7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set()), 2), selectedCategories = _useState7[0], setSelectedCategories = _useState7[1];
    var _useState8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), filterExpanded = _useState8[0], setFilterExpanded = _useState8[1];
    var isPanning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    var lastPanPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    var panZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$panzoom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePanZoom"])();
    // Build category map for colors and axis labels
    var categoryMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConceptMatrix.useMemo[categoryMap]": function() {
            var map = new Map();
            if (conceptData === null || conceptData === void 0 ? void 0 : conceptData.categories) {
                conceptData.categories.forEach({
                    "ConceptMatrix.useMemo[categoryMap]": function(cat) {
                        map.set(cat.name, cat.color);
                    }
                }["ConceptMatrix.useMemo[categoryMap]"]);
            }
            return map;
        }
    }["ConceptMatrix.useMemo[categoryMap]"], [
        conceptData
    ]);
    // Get axis labels from the first category (or selected categories)
    // Note: X axis = mental_physical, Y axis = self_opponent (matching old D3 code)
    var axisLabels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConceptMatrix.useMemo[axisLabels]": function() {
            if (!(conceptData === null || conceptData === void 0 ? void 0 : conceptData.categories) || conceptData.categories.length === 0) {
                return {
                    xAxis: {
                        left: "Mental",
                        right: "Physical"
                    },
                    yAxis: {
                        bottom: "Opponent",
                        top: "Self"
                    }
                };
            }
            // Use the first category's axis labels, or from selected categories
            var category = selectedCategories.size > 0 ? conceptData.categories.find({
                "ConceptMatrix.useMemo[axisLabels]": function(cat) {
                    return selectedCategories.has(cat.name);
                }
            }["ConceptMatrix.useMemo[axisLabels]"]) : conceptData.categories[0];
            // Swap the labels to match our axis mapping
            return {
                xAxis: (category === null || category === void 0 ? void 0 : category.yAxis) || {
                    left: "Mental",
                    right: "Physical"
                },
                yAxis: (category === null || category === void 0 ? void 0 : category.xAxis) || {
                    bottom: "Opponent",
                    top: "Self"
                }
            };
        }
    }["ConceptMatrix.useMemo[axisLabels]"], [
        conceptData,
        selectedCategories
    ]);
    // Filter concepts by selected categories
    var filteredConcepts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConceptMatrix.useMemo[filteredConcepts]": function() {
            if (selectedCategories.size === 0) {
                return concepts;
            }
            return concepts.filter({
                "ConceptMatrix.useMemo[filteredConcepts]": function(c) {
                    return selectedCategories.has(c.category);
                }
            }["ConceptMatrix.useMemo[filteredConcepts]"]);
        }
    }["ConceptMatrix.useMemo[filteredConcepts]"], [
        concepts,
        selectedCategories
    ]);
    // Get unique categories from concepts
    var availableCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConceptMatrix.useMemo[availableCategories]": function() {
            var cats = new Set();
            concepts.forEach({
                "ConceptMatrix.useMemo[availableCategories]": function(c) {
                    return cats.add(c.category);
                }
            }["ConceptMatrix.useMemo[availableCategories]"]);
            return Array.from(cats).sort();
        }
    }["ConceptMatrix.useMemo[availableCategories]"], [
        concepts
    ]);
    // Load real data if no concepts provided
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConceptMatrix.useEffect": function() {
            if (!initialConcepts) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$load$2d$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadConcepts"])().then({
                    "ConceptMatrix.useEffect": function(data) {
                        if (data.concepts.length > 0) {
                            console.log("✅ Loaded ".concat(data.concepts.length, " concepts"));
                            setConcepts(data.concepts);
                            setConceptData(data);
                        } else {
                            console.warn("⚠️ No concepts loaded");
                        }
                        setLoading(false);
                    }
                }["ConceptMatrix.useEffect"])["catch"]({
                    "ConceptMatrix.useEffect": function(error) {
                        console.error("Failed to load concepts:", error);
                        setLoading(false);
                    }
                }["ConceptMatrix.useEffect"]);
            } else {
                console.log("Using ".concat(initialConcepts.length, " provided concepts"));
            }
        }
    }["ConceptMatrix.useEffect"], [
        initialConcepts
    ]);
    // Update dimensions on mount and resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConceptMatrix.useEffect": function() {
            var updateDimensions = {
                "ConceptMatrix.useEffect.updateDimensions": function() {
                    if (containerRef.current) {
                        var rect = containerRef.current.getBoundingClientRect();
                        setDimensions({
                            width: initialWidth || rect.width || 800,
                            height: initialHeight || Math.max(rect.height, 400) || 600
                        });
                    }
                }
            }["ConceptMatrix.useEffect.updateDimensions"];
            updateDimensions();
            window.addEventListener("resize", updateDimensions);
            return ({
                "ConceptMatrix.useEffect": function() {
                    return window.removeEventListener("resize", updateDimensions);
                }
            })["ConceptMatrix.useEffect"];
        }
    }["ConceptMatrix.useEffect"], [
        initialWidth,
        initialHeight
    ]);
    // Convert screen coordinates to viewBox coordinates (data space)
    // This gives us the point in the untransformed coordinate system
    var screenToDataSpace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConceptMatrix.useCallback[screenToDataSpace]": function(screenX, screenY) {
            // Convert screen pixel to viewBox coordinate (before transform)
            // viewBox is -2 to 2 (width 4), so: viewBoxX = (screenX / width) * 4 - 2
            var viewBoxX = screenX / dimensions.width * 4 - 2;
            var viewBoxY = screenY / dimensions.height * 4 - 2;
            // The transform is: scale(z) translate(tx/z, ty/z)
            // SVG applies right-to-left: translate first, then scale
            // So to reverse: divide by zoom, then subtract translate
            var dataX = viewBoxX / panZoom.state.zoom - panZoom.state.translateX / panZoom.state.zoom;
            var dataY = viewBoxY / panZoom.state.zoom - panZoom.state.translateY / panZoom.state.zoom;
            return {
                x: dataX,
                y: dataY
            };
        }
    }["ConceptMatrix.useCallback[screenToDataSpace]"], [
        dimensions,
        panZoom.state
    ]);
    // Convert screen pixel delta to viewBox units for panning
    var screenDeltaToViewBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConceptMatrix.useCallback[screenDeltaToViewBox]": function(deltaX, deltaY) {
            // Convert screen pixel delta to current viewBox units
            // Current viewBox size = 4 / zoom
            var currentViewBoxSize = 4 / panZoom.state.zoom;
            var viewBoxDeltaX = deltaX / dimensions.width * currentViewBoxSize;
            var viewBoxDeltaY = deltaY / dimensions.height * currentViewBoxSize;
            return {
                x: viewBoxDeltaX,
                y: viewBoxDeltaY
            };
        }
    }["ConceptMatrix.useCallback[screenDeltaToViewBox]"], [
        dimensions,
        panZoom.state.zoom
    ]);
    // Handle double-click zoom
    var handleDoubleClick = function(e) {
        var rect = e.currentTarget.getBoundingClientRect();
        var screenX = e.clientX - rect.left;
        var screenY = e.clientY - rect.top;
        panZoom.zoomBy(0.5, screenX, screenY, dimensions.width, dimensions.height);
    };
    // Handle wheel zoom with proper coordinate conversion
    var handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConceptMatrix.useCallback[handleWheel]": function(e) {
            e.preventDefault();
            var delta = e.deltaY > 0 ? -0.1 : 0.1;
            var rect = e.currentTarget.getBoundingClientRect();
            var screenX = e.clientX - rect.left;
            var screenY = e.clientY - rect.top;
            panZoom.zoomBy(delta, screenX, screenY, dimensions.width, dimensions.height);
        }
    }["ConceptMatrix.useCallback[handleWheel]"], [
        panZoom,
        dimensions
    ]);
    // Handle concept click/tap
    var handleConceptClick = function(concept, e) {
        e.stopPropagation();
        setSelectedConcept(concept);
        if (e.type === "touchstart") {
            var _containerRef_current;
            var touch = e.touches[0];
            var rect = (_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.getBoundingClientRect();
            if (rect) {
                setTooltipPosition({
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top
                });
            }
        } else {
            var _containerRef_current1;
            var mouse = e;
            var rect1 = (_containerRef_current1 = containerRef.current) === null || _containerRef_current1 === void 0 ? void 0 : _containerRef_current1.getBoundingClientRect();
            if (rect1) {
                setTooltipPosition({
                    x: mouse.clientX - rect1.left,
                    y: mouse.clientY - rect1.top
                });
            }
        }
    };
    var viewport = {
        width: dimensions.width,
        height: dimensions.height,
        translateX: panZoom.state.translateX,
        translateY: panZoom.state.translateY,
        zoom: panZoom.state.zoom
    };
    var viewBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$scales$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getViewBox"])(viewport);
    // Convert normalized coordinates (-1 to 1) to SVG viewBox coordinates
    // The viewBox is -2 to 2, so we map directly: -1 maps to -2, 0 to 0, 1 to 2
    // These are FIXED coordinates - dots stay at these positions regardless of zoom/pan
    var toSVGX = function(normalized) {
        return normalized * 2;
    };
    var toSVGY = function(normalized) {
        return normalized * 2;
    };
    // Handle quadrant navigation
    var handleQuadrant = function(quadrant) {
        var centerX = dimensions.width / 2;
        var centerY = dimensions.height / 2;
        // Quadrant centers in normalized coordinates
        var quadrantCenters = {
            1: {
                x: 0.5,
                y: 0.5
            },
            2: {
                x: -0.5,
                y: 0.5
            },
            3: {
                x: -0.5,
                y: -0.5
            },
            4: {
                x: 0.5,
                y: -0.5
            }
        };
        var target = quadrantCenters[quadrant];
        // Convert to screen coordinates and center
        var screenX = centerX + target.x * (dimensions.width / 2);
        var screenY = centerY - target.y * (dimensions.height / 2);
        // Set zoom and translate to center on quadrant
        panZoom.setZoom(1.5);
        panZoom.panBy(centerX - screenX, centerY - screenY);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full h-full min-h-[400px] bg-bg-raised rounded-lg border border-border-subtle flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-text-muted",
                children: "Loading concepts..."
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 262,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
            lineNumber: 261,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative w-full h-full min-h-[400px] bg-bg-raised rounded-lg border border-border-subtle overflow-hidden",
        onMouseDown: function(e) {
            if (e.button === 0) {
                isPanning.current = true;
                lastPanPoint.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                e.preventDefault();
            }
        },
        onMouseMove: function(e) {
            if (isPanning.current) {
                var deltaX = e.clientX - lastPanPoint.current.x;
                var deltaY = e.clientY - lastPanPoint.current.y;
                var viewBoxDelta = screenDeltaToViewBox(deltaX, deltaY);
                panZoom.panBy(viewBoxDelta.x, viewBoxDelta.y);
                lastPanPoint.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                e.preventDefault();
            }
        },
        onMouseUp: function() {
            isPanning.current = false;
        },
        onMouseLeave: function() {
            isPanning.current = false;
        },
        onTouchStart: panZoom.handlers.onTouchStart,
        onTouchMove: function(e) {
            return panZoom.handlers.onTouchMove(e, screenDeltaToViewBox, dimensions.width, dimensions.height);
        },
        onTouchEnd: panZoom.handlers.onTouchEnd,
        onDoubleClick: handleDoubleClick,
        onWheel: handleWheel,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: dimensions.width,
                height: dimensions.height,
                viewBox: viewBox,
                className: "absolute inset-0",
                style: {
                    touchAction: "none"
                },
                preserveAspectRatio: "xMidYMid meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                            id: "grid",
                            width: "0.5",
                            height: "0.5",
                            patternUnits: "userSpaceOnUse",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M 0.5 0 L 0 0 0 0.5",
                                fill: "none",
                                stroke: "#1C1F26",
                                strokeWidth: "0.05"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 315,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                            lineNumber: 309,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "-2",
                        y: "-2",
                        width: "4",
                        height: "4",
                        fill: "url(#grid)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: "-2",
                        y1: "0",
                        x2: "2",
                        y2: "0",
                        stroke: "#1C1F26",
                        strokeWidth: "0.1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: "0",
                        y1: "-2",
                        x2: "0",
                        y2: "2",
                        stroke: "#1C1F26",
                        strokeWidth: "0.1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "-1.9",
                        y: "0.15",
                        fill: "#6B7280",
                        fontSize: "0.3",
                        textAnchor: "start",
                        className: "pointer-events-none",
                        children: axisLabels.xAxis.left
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 346,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "1.9",
                        y: "0.15",
                        fill: "#6B7280",
                        fontSize: "0.3",
                        textAnchor: "end",
                        className: "pointer-events-none",
                        children: axisLabels.xAxis.right
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "0.1",
                        y: "-1.9",
                        fill: "#6B7280",
                        fontSize: "0.3",
                        textAnchor: "start",
                        className: "pointer-events-none",
                        children: axisLabels.yAxis.top
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "0.1",
                        y: "1.9",
                        fill: "#6B7280",
                        fontSize: "0.3",
                        textAnchor: "start",
                        className: "pointer-events-none",
                        children: axisLabels.yAxis.bottom
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    filteredConcepts.map(function(concept, index) {
                        var isSelected = (selectedConcept === null || selectedConcept === void 0 ? void 0 : selectedConcept.id) === concept.id;
                        var isHovered = (hoveredConcept === null || hoveredConcept === void 0 ? void 0 : hoveredConcept.id) === concept.id;
                        var color = concept.color || getCategoryColor(concept.category);
                        var radius = isSelected ? 0.15 : isHovered ? 0.12 : 0.1; // Scale radius for viewBox
                        var svgX = toSVGX(concept.x);
                        var svgY = toSVGY(concept.y);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: svgX,
                                    cy: svgY,
                                    r: radius,
                                    fill: color,
                                    stroke: isSelected ? "#fff" : isHovered ? color : "transparent",
                                    strokeWidth: isSelected ? 0.05 : 0.03,
                                    opacity: isSelected ? 1 : isHovered ? 0.9 : 0.7,
                                    className: "cursor-pointer transition-all",
                                    onClick: function(e) {
                                        return handleConceptClick(concept, e);
                                    },
                                    onMouseEnter: function() {
                                        return setHoveredConcept(concept);
                                    },
                                    onMouseLeave: function() {
                                        return setHoveredConcept(null);
                                    },
                                    onTouchStart: function(e) {
                                        return handleConceptClick(concept, e);
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 402,
                                    columnNumber: 15
                                }, _this),
                                (isSelected || isHovered) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: svgX,
                                    y: svgY - radius - 0.2,
                                    textAnchor: "middle",
                                    fill: "#E5E7EB",
                                    fontSize: "".concat(0.3 / panZoom.state.zoom),
                                    fontWeight: "500",
                                    className: "pointer-events-none",
                                    children: concept.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 418,
                                    columnNumber: 17
                                }, _this)
                            ]
                        }, concept.id, true, {
                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                            lineNumber: 401,
                            columnNumber: 13
                        }, _this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 right-0 z-20 bg-bg-raised border-b border-border-subtle",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-2 flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                    className: "w-4 h-4 text-text-muted"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 439,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-semibold",
                                    children: "Categories"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 440,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                            lineNumber: 438,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: selectedCategories.size === 0 ? "default" : "outline",
                            size: "sm",
                            onClick: function() {
                                return setSelectedCategories(new Set());
                            },
                            className: "h-7 px-3 text-xs",
                            children: "All"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                            lineNumber: 443,
                            columnNumber: 11
                        }, this),
                        filterExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex flex-wrap gap-2 max-h-32 overflow-y-auto",
                                    children: availableCategories.map(function(category) {
                                        var isSelected = selectedCategories.has(category);
                                        var color = getCategoryColor(category, categoryMap);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: function() {
                                                var newSet = new Set(selectedCategories);
                                                if (isSelected) {
                                                    newSet["delete"](category);
                                                } else {
                                                    newSet.add(category);
                                                }
                                                setSelectedCategories(newSet);
                                            },
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-2 py-1 rounded text-xs font-medium transition-all", isSelected ? "bg-accent text-accent-foreground border border-accent" : "bg-bg border border-border-subtle text-text-secondary hover:border-border hover:bg-bg-hover"),
                                            style: isSelected ? {
                                                borderColor: color
                                            } : {},
                                            children: category
                                        }, category, false, {
                                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                            lineNumber: 459,
                                            columnNumber: 21
                                        }, _this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 454,
                                    columnNumber: 15
                                }, this),
                                selectedCategories.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-text-muted whitespace-nowrap",
                                    children: [
                                        filteredConcepts.length,
                                        " of ",
                                        concepts.length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 484,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "sm",
                            onClick: function() {
                                return setFilterExpanded(!filterExpanded);
                            },
                            className: "h-7 px-2",
                            children: filterExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 497,
                                columnNumber: 31
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 497,
                                columnNumber: 59
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                            lineNumber: 491,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                    lineNumber: 437,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 436,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-4 z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$concept$2d$matrix$2f$matrix$2d$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatrixControls"], {
                    onZoomIn: panZoom.zoomIn,
                    onZoomOut: panZoom.zoomOut,
                    onReset: panZoom.reset,
                    onQuadrant: handleQuadrant
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                    lineNumber: 504,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 503,
                columnNumber: 7
            }, this),
            selectedConcept && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-10 pointer-events-none",
                style: {
                    left: "".concat(tooltipPosition.x, "px"),
                    top: "".concat(tooltipPosition.y, "px"),
                    transform: "translate(-50%, -100%)",
                    marginTop: "-8px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "bg-bg-raised border-border-subtle p-3 min-w-[200px] max-w-[300px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold text-sm",
                                        children: selectedConcept.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                        lineNumber: 526,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: "border-border-subtle text-xs",
                                        children: selectedConcept.category
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                        lineNumber: 527,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 525,
                                columnNumber: 15
                            }, this),
                            selectedConcept.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-text-muted",
                                children: selectedConcept.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 532,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 524,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                    lineNumber: 523,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 514,
                columnNumber: 9
            }, this),
            selectedConcept && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0",
                onClick: function() {
                    return setSelectedConcept(null);
                },
                onTouchStart: function() {
                    return setSelectedConcept(null);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 541,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
        lineNumber: 268,
        columnNumber: 5
    }, this);
}
_s(ConceptMatrix, "TD0XQXSc2Q1qOsW7AKKoLfWlZVY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$panzoom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePanZoom"]
    ];
});
_c = ConceptMatrix;
var _c;
__turbopack_context__.k.register(_c, "ConceptMatrix");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/games/centroid-game.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CentroidGame",
    ()=>CentroidGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
var GRID_SIZE = 17; // cells per axis
var CELL_SIZE = 20; // px per cell → 340px board
var BOARD_PX = GRID_SIZE * CELL_SIZE; // 340
var MAX_ROUNDS = 10;
var TIMER_PENALTY_THRESHOLD = 3; // seconds
function chebyshev(a, b) {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}
function nearestInt(p) {
    return {
        x: Math.round(p.x),
        y: Math.round(p.y)
    };
}
function centroid(dots) {
    if (dots.length === 0) return {
        x: 0,
        y: 0
    };
    var sx = dots.reduce(function(s, d) {
        return s + d.x;
    }, 0);
    var sy = dots.reduce(function(s, d) {
        return s + d.y;
    }, 0);
    return {
        x: sx / dots.length,
        y: sy / dots.length
    };
}
function useInterval(callback, delayMs) {
    _s();
    var savedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(callback);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInterval.useEffect": function() {
            savedRef.current = callback;
        }
    }["useInterval.useEffect"], [
        callback
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInterval.useEffect": function() {
            if (delayMs == null) return;
            var id = setInterval({
                "useInterval.useEffect.id": function() {
                    return savedRef.current();
                }
            }["useInterval.useEffect.id"], delayMs);
            return ({
                "useInterval.useEffect": function() {
                    return clearInterval(id);
                }
            })["useInterval.useEffect"];
        }
    }["useInterval.useEffect"], [
        delayMs
    ]);
}
_s(useInterval, "w5A6FRbWPY8OWfdgwNZfZKbZH74=");
var CentroidGame = function(param) {
    var onClose = param.onClose;
    _s1();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), round = _useState[0], setRound = _useState[1]; // 0..MAX_ROUNDS
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), dots = _useState1[0], setDots = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), actual = _useState2[0], setActual = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), guess = _useState3[0], setGuess = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showResult = _useState4[0], setShowResult = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), totalScore = _useState5[0], setTotalScore = _useState5[1];
    var _useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), currentRoundScore = _useState6[0], setCurrentRoundScore = _useState6[1];
    var _useState7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), timer = _useState7[0], setTimer = _useState7[1];
    var _useState8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), penalty = _useState8[0], setPenalty = _useState8[1];
    var _useState9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle'), 2), phase = _useState9[0], setPhase = _useState9[1];
    var _useState10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), pointsFlash = _useState10[0], setPointsFlash = _useState10[1];
    var _useState11 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), roundHistory = _useState11[0], setRoundHistory = _useState11[1];
    var _useState12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), recapMessage = _useState12[0], setRecapMessage = _useState12[1];
    var validatedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    var timeoutsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    var difficulty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[difficulty]": function() {
            if (round <= 3) return {
                name: 'EASY',
                min: 3,
                max: 8
            };
            if (round <= 7) return {
                name: 'MEDIUM',
                min: 5,
                max: 10
            };
            return {
                name: 'HARD',
                min: 7,
                max: 12
            };
        }
    }["CentroidGame.useMemo[difficulty]"], [
        round
    ]);
    var startRound = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CentroidGame.useCallback[startRound]": function(nextRound) {
            // generate dots
            var n = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
            var used = new Set();
            var nd = [];
            while(nd.length < n){
                var x = Math.floor(Math.random() * GRID_SIZE);
                var y = Math.floor(Math.random() * GRID_SIZE);
                var key = "".concat(x, ",").concat(y);
                if (!used.has(key)) {
                    used.add(key);
                    nd.push({
                        x: x,
                        y: y
                    });
                }
            }
            var c = centroid(nd);
            setDots(nd);
            setActual(c);
            setGuess(null);
            setShowResult(false);
            setCurrentRoundScore(null);
            setTimer(0);
            setPenalty(0);
            setRound(nextRound);
            setPhase('playing');
            validatedRef.current = false;
        }
    }["CentroidGame.useCallback[startRound]"], [
        difficulty
    ]);
    var clearAllTimeouts = function() {
        timeoutsRef.current.forEach(function(id) {
            return clearTimeout(id);
        });
        timeoutsRef.current = [];
    };
    var schedule = function(fn, ms) {
        var id = window.setTimeout(fn, ms);
        timeoutsRef.current.push(id);
        return id;
    };
    var hardReset = function() {
        clearAllTimeouts();
        setRound(0);
        setDots([]);
        setActual(null);
        setGuess(null);
        setShowResult(false);
        setTotalScore(0);
        setCurrentRoundScore(null);
        setTimer(0);
        setPenalty(0);
        setRoundHistory([]);
        setRecapMessage(null);
        validatedRef.current = false;
    };
    var begin = function() {
        hardReset();
        setPhase('count');
        schedule(function() {
            return setPhase('go');
        }, 500);
        schedule(function() {
            return startRound(1);
        }, 1000);
    };
    // timer + penalty
    useInterval({
        "CentroidGame.useInterval": function() {
            if (phase === 'playing' && !showResult) {
                setTimer({
                    "CentroidGame.useInterval": function(t) {
                        var nt = t + 1;
                        if (nt > TIMER_PENALTY_THRESHOLD) setPenalty({
                            "CentroidGame.useInterval": function(p) {
                                return p + 1;
                            }
                        }["CentroidGame.useInterval"]);
                        return nt;
                    }
                }["CentroidGame.useInterval"]);
            }
        }
    }["CentroidGame.useInterval"], phase === 'playing' && !showResult ? 1000 : null);
    var onCellClick = function(x, y) {
        if (phase !== 'playing' || showResult) return;
        var ng = {
            x: x,
            y: y
        };
        if (guess && ng.x === guess.x && ng.y === guess.y) {
            validate();
        } else {
            setGuess(ng);
        }
    };
    var validate = function() {
        if (!guess || !actual) return;
        if (validatedRef.current) return; // guard double-submit
        validatedRef.current = true;
        var optimal = nearestInt(actual);
        var dist = chebyshev(guess, optimal);
        var score = dist + penalty;
        setCurrentRoundScore(score);
        setTotalScore(function(s) {
            return s + score;
        });
        var perfect = dist === 0;
        setRoundHistory(function(h) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(h).concat([
                {
                    round: round,
                    score: score,
                    timer: timer,
                    perfect: perfect
                }
            ]);
        });
        setShowResult(true);
        setPhase('downtime');
        // flash points for ~1s then advance
        setPointsFlash(score === 0 ? '✨0✨' : String(score));
        schedule(function() {
            setPointsFlash(null);
            var next = round + 1;
            if (next <= MAX_ROUNDS) {
                schedule(function() {
                    return startRound(next);
                }, 200); // tiny pause
            } else {
                var final = roundHistory.reduce(function(s, r) {
                    return s + r.score;
                }, 0) + score;
                var msg = getRecapMessage(final);
                setTotalScore(final);
                setRecapMessage(msg);
                setPhase('recap');
            }
        }, 1000);
    };
    // rendering helpers
    var renderGridCells = function() {
        var _loop = function(y) {
            var _loop = function(x) {
                var isDot = dots.some(function(d) {
                    return d.x === x && d.y === y;
                });
                var isGuess = guess && guess.x === x && guess.y === y;
                var isOptimal = showResult && actual && Math.round(actual.x) === x && Math.round(actual.y) === y;
                var bg = 'transparent';
                if (isGuess) bg = showResult ? 'bg-red-500' : 'bg-orange-500';
                else if (isOptimal) bg = 'bg-green-500';
                else if (isDot) bg = 'bg-blue-500';
                cells.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: function() {
                        return onCellClick(x, y);
                    },
                    className: "w-5 h-5 border border-white/10 ".concat(bg, " ").concat(phase === 'playing' && !showResult ? 'cursor-pointer hover:opacity-80' : '')
                }, "".concat(x, "-").concat(y), false, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 189,
                    columnNumber: 11
                }, _this));
            };
            for(var x = 0; x < GRID_SIZE; x++)_loop(x);
        };
        var cells = [];
        for(var y = 0; y < GRID_SIZE; y++)_loop(y);
        return cells;
    };
    var vectorsOverlay = function() {
        if (!showResult || !actual) return null;
        var optimal = nearestInt(actual);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: BOARD_PX,
            height: BOARD_PX,
            className: "absolute top-0 left-0 pointer-events-none",
            children: dots.map(function(d, i) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: d.x * CELL_SIZE + CELL_SIZE / 2,
                    y1: d.y * CELL_SIZE + CELL_SIZE / 2,
                    x2: optimal.x * CELL_SIZE + CELL_SIZE / 2,
                    y2: optimal.y * CELL_SIZE + CELL_SIZE / 2,
                    stroke: "#66bb6a",
                    strokeWidth: 2,
                    opacity: 0.6
                }, i, false, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 206,
                    columnNumber: 11
                }, _this);
            })
        }, void 0, false, {
            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
            lineNumber: 204,
            columnNumber: 7
        }, _this);
    };
    // Messages
    var messagesAbove25 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[messagesAbove25]": function() {
            return [
                "Nice try, but you've got more in you! Push it!",
                "Not bad, champ—now show us your best!",
                "Solid effort, but you're just warming up! Go harder!",
                "That's a start, now crank it up a notch!",
                "Pretty good, but you're capable of greatness! Dig in!",
                "Decent move, but you've got bigger plays to make!",
                "Not too shabby, but let's see your A-game!",
                "You're getting there—now unleash the beast!",
                "Good hustle, but you're not at your peak yet!",
                "That's the spirit, now take it to the next level!"
            ];
        }
    }["CentroidGame.useMemo[messagesAbove25]"], []);
    var messages10to25 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[messages10to25]": function() {
            return [
                'Amazing work! You\'ve mastered the centroid challenge!',
                'Outstanding performance! Your spatial reasoning is top-notch!',
                'Brilliant! You\'ve conquered the centroid matrix!',
                'Fantastic! You\'ve aced the centroid game!',
                'Spectacular! Your geometric intuition is incredible!'
            ];
        }
    }["CentroidGame.useMemo[messages10to25]"], []);
    var messages8to9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[messages8to9]": function() {
            return [
                'Single digit! Impressive!',
                'So close to perfection—keep pushing!',
                'Excellent intuition.'
            ];
        }
    }["CentroidGame.useMemo[messages8to9]"], []);
    var messages7andBelow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[messages7andBelow]": function() {
            return [
                'Unreal! You beat the creator!',
                'Legendary performance!',
                'Phenomenal accuracy!'
            ];
        }
    }["CentroidGame.useMemo[messages7andBelow]"], []);
    var getRecapMessage = function(finalScore) {
        if (finalScore > 25) return messagesAbove25[Math.floor(Math.random() * messagesAbove25.length)];
        if (finalScore >= 10) return messages10to25[Math.floor(Math.random() * messages10to25.length)];
        if (finalScore >= 8) return messages8to9[Math.floor(Math.random() * messages8to9.length)];
        return messages7andBelow[Math.floor(Math.random() * messages7andBelow.length)];
    };
    var averageScore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[averageScore]": function() {
            return roundHistory.length ? (roundHistory.reduce({
                "CentroidGame.useMemo[averageScore]": function(s, r) {
                    return s + r.score;
                }
            }["CentroidGame.useMemo[averageScore]"], 0) / roundHistory.length).toFixed(1) : '0.0';
        }
    }["CentroidGame.useMemo[averageScore]"], [
        roundHistory
    ]);
    var averageTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[averageTime]": function() {
            return roundHistory.length ? (roundHistory.reduce({
                "CentroidGame.useMemo[averageTime]": function(s, r) {
                    return s + r.timer;
                }
            }["CentroidGame.useMemo[averageTime]"], 0) / roundHistory.length).toFixed(1) : '0.0';
        }
    }["CentroidGame.useMemo[averageTime]"], [
        roundHistory
    ]);
    var perfectCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[perfectCount]": function() {
            return roundHistory.filter({
                "CentroidGame.useMemo[perfectCount]": function(r) {
                    return r.perfect;
                }
            }["CentroidGame.useMemo[perfectCount]"]).length;
        }
    }["CentroidGame.useMemo[perfectCount]"], [
        roundHistory
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CentroidGame.useEffect": function() {
            return ({
                "CentroidGame.useEffect": function() {
                    clearAllTimeouts();
                }
            })["CentroidGame.useEffect"];
        }
    }["CentroidGame.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex flex-col items-center justify-center text-white py-4 px-4 font-mono",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-[380px]",
            children: [
                onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute top-0 left-0 z-50 p-2 bg-black/35 hover:bg-black/50 rounded text-white",
                    "aria-label": "close",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                        lineNumber: 282,
                        columnNumber: 13
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 277,
                    columnNumber: 11
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mt-4 mb-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold tracking-wider",
                            children: "Centroid (x̄, ȳ) – GRID FAST"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm opacity-70 tracking-wider",
                            children: "10 rounds – Lowest score wins"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 289,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 287,
                    columnNumber: 9
                }, _this),
                phase !== 'idle' && phase !== 'recap' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center px-1 mb-2 text-sm tracking-wider",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "R",
                                Math.min(round, MAX_ROUNDS),
                                "/",
                                MAX_ROUNDS
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 297,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: timer <= TIMER_PENALTY_THRESHOLD ? 'text-green-500' : 'text-red-500',
                                    children: "0:".concat(String(timer).padStart(2, '0'))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 298,
                                    columnNumber: 15
                                }, _this),
                                penalty > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-red-500",
                                    children: [
                                        "+",
                                        penalty
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 301,
                                    columnNumber: 31
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 296,
                            columnNumber: 13
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: difficulty.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 303,
                            columnNumber: 13
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 294,
                    columnNumber: 11
                }, _this),
                phase === 'idle' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto p-4 rounded-lg bg-black/35 border border-white/10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg mb-2",
                            children: "How it works"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 310,
                            columnNumber: 13
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm mb-2 opacity-85",
                            children: "Estimate the centroid (center of mass) of the blue squares. Click a cell to place your guess, then press VALIDATE (or double-click). Lower total is better. Perfect Guess = 0"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 311,
                            columnNumber: 13
                        }, _this),
                        function() {
                            var SAMPLE_GRID = 11;
                            var SAMPLE_CELL = 14;
                            var SAMPLE_PX = SAMPLE_GRID * SAMPLE_CELL;
                            var sampleDots = [
                                {
                                    x: 2,
                                    y: 2
                                },
                                {
                                    x: 3,
                                    y: 7
                                },
                                {
                                    x: 5,
                                    y: 4
                                },
                                {
                                    x: 7,
                                    y: 2
                                },
                                {
                                    x: 8,
                                    y: 8
                                },
                                {
                                    x: 2,
                                    y: 9
                                }
                            ];
                            var sActual = centroid(sampleDots);
                            var sOptimal = nearestInt(sActual);
                            var sGuess = {
                                x: Math.min(SAMPLE_GRID - 1, sOptimal.x + 1),
                                y: sOptimal.y
                            };
                            var renderSampleCells = function() {
                                var _loop = function(y) {
                                    var _loop = function(x) {
                                        var isDot = sampleDots.some(function(d) {
                                            return d.x === x && d.y === y;
                                        });
                                        var isGuess = sGuess && sGuess.x === x && sGuess.y === y;
                                        var isOptimal = Math.round(sActual.x) === x && Math.round(sActual.y) === y;
                                        var bg = 'transparent';
                                        if (isGuess) bg = 'bg-red-500';
                                        else if (isOptimal) bg = 'bg-green-500';
                                        else if (isDot) bg = 'bg-blue-500';
                                        cells.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3.5 h-3.5 border border-white/10 ".concat(bg)
                                        }, "".concat(x, "-").concat(y), false, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 335,
                                            columnNumber: 23
                                        }, _this));
                                    };
                                    for(var x = 0; x < SAMPLE_GRID; x++)_loop(x);
                                };
                                var cells = [];
                                for(var y = 0; y < SAMPLE_GRID; y++)_loop(y);
                                return cells;
                            };
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-[154px] h-[154px] grid grid-cols-11 grid-rows-11 bg-bg rounded overflow-hidden",
                                        children: [
                                            renderSampleCells(),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: SAMPLE_PX,
                                                height: SAMPLE_PX,
                                                className: "absolute inset-0 pointer-events-none",
                                                children: sampleDots.map(function(d, i) {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: d.x * SAMPLE_CELL + SAMPLE_CELL / 2,
                                                        y1: d.y * SAMPLE_CELL + SAMPLE_CELL / 2,
                                                        x2: sOptimal.x * SAMPLE_CELL + SAMPLE_CELL / 2,
                                                        y2: sOptimal.y * SAMPLE_CELL + SAMPLE_CELL / 2,
                                                        stroke: "#66bb6a",
                                                        strokeWidth: 2,
                                                        opacity: 0.6
                                                    }, i, false, {
                                                        fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 25
                                                    }, _this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                lineNumber: 345,
                                                columnNumber: 21
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                        lineNumber: 343,
                                        columnNumber: 19
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: "Blue = dots"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                lineNumber: 361,
                                                columnNumber: 21
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-green-400",
                                                children: "Green = true centroid"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                lineNumber: 362,
                                                columnNumber: 21
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-red-400",
                                                children: "Red = your guess"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                lineNumber: 363,
                                                columnNumber: 21
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                        lineNumber: 360,
                                        columnNumber: 19
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                lineNumber: 342,
                                columnNumber: 17
                            }, _this);
                        }()
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 309,
                    columnNumber: 11
                }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[340px] h-[340px] mx-auto relative rounded-lg overflow-hidden border border-white/10",
                    children: [
                        phase === 'count' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/50 flex items-center justify-center z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl",
                                children: "Round 1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                lineNumber: 374,
                                columnNumber: 17
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 373,
                            columnNumber: 15
                        }, _this),
                        phase === 'go' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/50 flex items-center justify-center z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl",
                                children: "GO!"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                lineNumber: 379,
                                columnNumber: 17
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 378,
                            columnNumber: 15
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-bg",
                            style: {
                                display: 'grid',
                                gridTemplateColumns: "repeat(".concat(GRID_SIZE, ", ").concat(CELL_SIZE, "px)"),
                                gridTemplateRows: "repeat(".concat(GRID_SIZE, ", ").concat(CELL_SIZE, "px)")
                            },
                            children: renderGridCells()
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 384,
                            columnNumber: 13
                        }, _this),
                        vectorsOverlay(),
                        phase === 'downtime' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/40"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 388,
                            columnNumber: 38
                        }, _this),
                        pointsFlash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-2 left-1/2 -translate-x-1/2 z-20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl text-red-500 drop-shadow-lg",
                                children: pointsFlash
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                lineNumber: 391,
                                columnNumber: 17
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 390,
                            columnNumber: 15
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 370,
                    columnNumber: 11
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        className: "w-full",
                        size: "lg",
                        variant: phase === 'idle' ? 'default' : guess && !showResult ? 'default' : 'outline',
                        disabled: phase !== 'idle' && (phase !== 'playing' || showResult || !guess),
                        onClick: function() {
                            if (phase === 'idle') begin();
                            else if (phase === 'playing' && guess && !showResult) validate();
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                phase === 'idle' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 410,
                                    columnNumber: 35
                                }, _this) : guess && !showResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 410,
                                    columnNumber: 91
                                }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 410,
                                    columnNumber: 123
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tracking-wider",
                                            children: phase === 'idle' ? 'START Game' : phase === 'playing' && guess && !showResult ? 'VALIDATE' : 'PLACE'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 412,
                                            columnNumber: 17
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs opacity-80 leading-none tracking-wider",
                                            children: "x̄ = (1/n) Σ xᵢ    ȳ = (1/n) Σ yᵢ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 415,
                                            columnNumber: 17
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 411,
                                    columnNumber: 15
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 409,
                            columnNumber: 13
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                        lineNumber: 399,
                        columnNumber: 11
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 398,
                    columnNumber: 9
                }, _this),
                phase === 'recap' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/55"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 426,
                            columnNumber: 13
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,420px)] max-h-[80vh] overflow-y-auto text-center bg-bg text-text-primary p-4 rounded-lg shadow-xl font-mono tracking-wider",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 mb-2 justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "default",
                                            onClick: function() {
                                                hardReset();
                                                setPhase('idle');
                                            },
                                            children: "Play Again"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 429,
                                            columnNumber: 17
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: function() {
                                                setPhase('idle');
                                                onClose === null || onClose === void 0 ? void 0 : onClose();
                                            },
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 430,
                                            columnNumber: 17
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 428,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm mb-2",
                                    children: recapMessage
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 432,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg mb-2",
                                    children: [
                                        "Final Score: ",
                                        totalScore,
                                        " points"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 433,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-left mx-auto max-w-[360px] text-xs py-1",
                                    children: roundHistory.map(function(r, idx) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between py-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "Round ",
                                                        r.round,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                    lineNumber: 437,
                                                    columnNumber: 21
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        r.score,
                                                        " pts ",
                                                        r.perfect ? '✨' : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                    lineNumber: 438,
                                                    columnNumber: 21
                                                }, _this)
                                            ]
                                        }, "".concat(r.round, "-").concat(idx), true, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 436,
                                            columnNumber: 19
                                        }, _this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 434,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between mt-2 text-xs text-text-muted",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Perfect rounds: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: perfectCount
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 39
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 443,
                                            columnNumber: 17
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Average score: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: averageScore
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 38
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 444,
                                            columnNumber: 17
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 442,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 text-xs text-text-muted",
                                    children: [
                                        "Avg time per round: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: [
                                                averageTime,
                                                "s"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 446,
                                            columnNumber: 81
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 446,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 h-24 flex items-end gap-1 mx-auto max-w-[360px]",
                                    children: Array.from({
                                        length: 10
                                    }, function(_, i) {
                                        var count = roundHistory.filter(function(r) {
                                            return i < 9 ? r.score === i : r.score >= 9;
                                        }).length;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 flex flex-col-reverse items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 bg-accent rounded-sm",
                                                    style: {
                                                        height: count * 10
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 23
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs mt-1",
                                                    children: i === 9 ? '9+' : i
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 23
                                                }, _this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 452,
                                            columnNumber: 21
                                        }, _this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 448,
                                    columnNumber: 15
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 427,
                            columnNumber: 13
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 425,
                    columnNumber: 11
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
            lineNumber: 274,
            columnNumber: 7
        }, _this)
    }, void 0, false, {
        fileName: "[project]/src/components/modules/games/centroid-game.tsx",
        lineNumber: 273,
        columnNumber: 5
    }, _this);
};
_s1(CentroidGame, "Y2rxzi9l60kiWoztMS3C5cjgwNo=", false, function() {
    return [
        useInterval
    ];
});
_c = CentroidGame;
var _c;
__turbopack_context__.k.register(_c, "CentroidGame");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useFullscreen.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFullscreen",
    ()=>useFullscreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
function useFullscreen(targetRef) {
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), isFullscreen = _useState[0], setIsFullscreen = _useState[1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFullscreen.useEffect": function() {
            var onChange = {
                "useFullscreen.useEffect.onChange": function() {
                    setIsFullscreen(Boolean(document.fullscreenElement));
                }
            }["useFullscreen.useEffect.onChange"];
            document.addEventListener('fullscreenchange', onChange);
            return ({
                "useFullscreen.useEffect": function() {
                    return document.removeEventListener('fullscreenchange', onChange);
                }
            })["useFullscreen.useEffect"];
        }
    }["useFullscreen.useEffect"], []);
    var enter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFullscreen.useCallback[enter]": function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
                "useFullscreen.useCallback[enter]": function() {
                    var _targetRef_current, el, e;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                        "useFullscreen.useCallback[enter]": function(_state) {
                            switch(_state.label){
                                case 0:
                                    _state.trys.push([
                                        0,
                                        3,
                                        ,
                                        4
                                    ]);
                                    el = (_targetRef_current = targetRef === null || targetRef === void 0 ? void 0 : targetRef.current) !== null && _targetRef_current !== void 0 ? _targetRef_current : document.documentElement;
                                    if (!(!document.fullscreenElement && (el === null || el === void 0 ? void 0 : el.requestFullscreen))) return [
                                        3,
                                        2
                                    ];
                                    return [
                                        4,
                                        el.requestFullscreen()
                                    ];
                                case 1:
                                    _state.sent();
                                    _state.label = 2;
                                case 2:
                                    return [
                                        3,
                                        4
                                    ];
                                case 3:
                                    e = _state.sent();
                                    return [
                                        3,
                                        4
                                    ];
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        }
                    }["useFullscreen.useCallback[enter]"]);
                }
            }["useFullscreen.useCallback[enter]"])();
        }
    }["useFullscreen.useCallback[enter]"], [
        targetRef
    ]);
    var exit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFullscreen.useCallback[exit]": function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
                "useFullscreen.useCallback[exit]": function() {
                    var e;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                        "useFullscreen.useCallback[exit]": function(_state) {
                            switch(_state.label){
                                case 0:
                                    _state.trys.push([
                                        0,
                                        3,
                                        ,
                                        4
                                    ]);
                                    if (!document.fullscreenElement) return [
                                        3,
                                        2
                                    ];
                                    return [
                                        4,
                                        document.exitFullscreen()
                                    ];
                                case 1:
                                    _state.sent();
                                    _state.label = 2;
                                case 2:
                                    return [
                                        3,
                                        4
                                    ];
                                case 3:
                                    e = _state.sent();
                                    return [
                                        3,
                                        4
                                    ];
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        }
                    }["useFullscreen.useCallback[exit]"]);
                }
            }["useFullscreen.useCallback[exit]"])();
        }
    }["useFullscreen.useCallback[exit]"], []);
    var toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFullscreen.useCallback[toggle]": function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
                "useFullscreen.useCallback[toggle]": function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                        "useFullscreen.useCallback[toggle]": function(_state) {
                            if (document.fullscreenElement) return [
                                2,
                                exit()
                            ];
                            return [
                                2,
                                enter()
                            ];
                        }
                    }["useFullscreen.useCallback[toggle]"]);
                }
            }["useFullscreen.useCallback[toggle]"])();
        }
    }["useFullscreen.useCallback[toggle]"], [
        enter,
        exit
    ]);
    return {
        isFullscreen: isFullscreen,
        enterFullscreen: enter,
        exitFullscreen: exit,
        toggleFullscreen: toggle
    };
}
_s(useFullscreen, "endHJi3EJEY5qCIZZAEwUy1bCz4=");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/games/memory-game.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MemoryGame",
    ()=>MemoryGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFullscreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFullscreen.ts [app-client] (ecmascript)");
;
;
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Constants
var TOTAL_IMAGES = 160;
var PAIRS = 8; // fixed – 16 cards, 4x4 grid
var CARD_RATIO = 597 / 440; // height / width
// Helpers
function padId(n) {
    return n.toString().padStart(3, '0');
}
function imageUrl(id, ext) {
    return "/images/memory/".concat(ext, "/").concat(id, ".").concat(ext);
}
var BACK_URL = '/images/memory/Memory_JJJ_Back_440x.webp';
function shuffle(arr) {
    var a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr);
    for(var i = a.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        var ref;
        ref = [
            a[j],
            a[i]
        ], a[i] = ref[0], a[j] = ref[1], ref;
    }
    return a;
}
var MemoryGame = function(param) {
    var onClose = param.onClose;
    _s();
    // Layout sizing
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(100), 2), cardWidth = _useState[0], setCardWidth = _useState[1];
    // Game state
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), deck = _useState1[0], setDeck = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), flippedUids = _useState2[0], setFlippedUids = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set()), 2), matchedPairs = _useState3[0], setMatchedPairs = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), moves = _useState4[0], setMoves = _useState4[1];
    var busyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Timer state (seconds only)
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), elapsedSec = _useState5[0], setElapsedSec = _useState5[1];
    var _useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), timerRunning = _useState6[0], setTimerRunning = _useState6[1];
    var timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Reveal/shuffle phase
    var _useState7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('play'), 2), phase = _useState7[0], setPhase = _useState7[1];
    var _useState8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set()), 2), revealFront = _useState8[0], setRevealFront = _useState8[1];
    var _useState9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showShuffle = _useState9[0], setShowShuffle = _useState9[1];
    var timeoutsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    var _useState10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true), 2), showIntro = _useState10[0], setShowIntro = _useState10[1];
    // Fly overlay for shuffle animation
    var cardRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    var _useState11 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), flyVisible = _useState11[0], setFlyVisible = _useState11[1];
    var _useState12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), flyCards = _useState12[0], setFlyCards = _useState12[1];
    var containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var _useFullscreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFullscreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFullscreen"])(containerRef), isFullscreen = _useFullscreen.isFullscreen, toggleFullscreen = _useFullscreen.toggleFullscreen;
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MemoryGame.useEffect": function() {
            return ({
                "MemoryGame.useEffect": function() {
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                    }
                    timeoutsRef.current.forEach({
                        "MemoryGame.useEffect": function(id) {
                            return clearTimeout(id);
                        }
                    }["MemoryGame.useEffect"]);
                }
            })["MemoryGame.useEffect"];
        }
    }["MemoryGame.useEffect"], []);
    // Compute 4x4 cell size to avoid scrollbars
    var computeSize = function() {
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var cols = 4;
        var rows = 4;
        var gap = 10;
        var sidePad = 16;
        var topReserve = 72; // header row
        var w = Math.floor((vw - sidePad * 2 - gap * (cols - 1)) / cols);
        var h = Math.floor(w * CARD_RATIO);
        while(rows * h + gap * (rows - 1) > vh - topReserve && w > 60){
            w -= 1;
            h = Math.floor(w * CARD_RATIO);
        }
        setCardWidth(w);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MemoryGame.useEffect": function() {
            computeSize();
            window.addEventListener('resize', computeSize);
            return ({
                "MemoryGame.useEffect": function() {
                    return window.removeEventListener('resize', computeSize);
                }
            })["MemoryGame.useEffect"];
        }
    }["MemoryGame.useEffect"], []);
    // Build a new deck of 8 random pairs
    var clearAllTimeouts = function() {
        timeoutsRef.current.forEach(function(id) {
            return window.clearTimeout(id);
        });
        timeoutsRef.current = [];
    };
    var newGame = function() {
        var _loop = function(k) {
            var id = window.setTimeout(function() {
                setRevealFront(function(prev) {
                    var next = new Set(prev);
                    var c1 = revealDeck[k * 2];
                    var c2 = revealDeck[k * 2 + 1];
                    if (c1) next.add(c1.uid);
                    if (c2) next.add(c2.uid);
                    return next;
                });
            }, PER_PAIR_MS * k);
            timeoutsRef.current.push(id);
        };
        clearAllTimeouts();
        var pairs = shuffle(Array.from({
            length: TOTAL_IMAGES / 2
        }, function(_, i) {
            return i + 1;
        })).slice(0, PAIRS);
        var cards = [];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = pairs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var p = _step.value;
                var a = padId(2 * p - 1), b = padId(2 * p);
                cards.push({
                    imageId: a,
                    pairId: p,
                    uid: "".concat(a, "-A")
                });
                cards.push({
                    imageId: b,
                    pairId: p,
                    uid: "".concat(b, "-B")
                });
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        // For reveal: two-by-two side-by-side order
        var revealDeck = [];
        for(var i = 0; i < cards.length; i += 2){
            revealDeck.push(cards[i], cards[i + 1]);
        }
        var finalDeck = shuffle(revealDeck);
        setDeck(revealDeck);
        setFlippedUids([]);
        setMatchedPairs(new Set());
        setMoves(0);
        busyRef.current = false;
        // Reset timer
        setElapsedSec(0);
        setTimerRunning(false);
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
        // Run reveal animation (0.75s per pair)
        busyRef.current = true;
        setPhase('reveal');
        setRevealFront(new Set());
        var PER_PAIR_MS = 750;
        for(var k = 0; k < PAIRS; k++)_loop(k);
        var holdId = window.setTimeout(function() {
            return setPhase('hold');
        }, PER_PAIR_MS * PAIRS);
        timeoutsRef.current.push(holdId);
        var shuffleStartId = window.setTimeout(function() {
            setRevealFront(new Set());
            setPhase('shuffle');
            // Step A: measure current positions
            var initialPositions = revealDeck.map(function(c) {
                var el = cardRefs.current[c.uid];
                var r = el ? el.getBoundingClientRect() : {
                    left: window.innerWidth / 2,
                    top: window.innerHeight / 2
                };
                return {
                    uid: c.uid,
                    left: r.left,
                    top: r.top
                };
            });
            setFlyCards(initialPositions);
            setFlyVisible(true);
            // Step B: move all to center
            var centerLeft = Math.round(window.innerWidth / 2 - cardWidth / 2);
            var centerTop = Math.round(window.innerHeight * 0.35 - Math.floor(cardWidth * CARD_RATIO) / 2);
            var toCenterId = window.setTimeout(function() {
                setFlyCards(function(prev) {
                    return prev.map(function(fc) {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, fc), {
                            left: centerLeft,
                            top: centerTop
                        });
                    });
                });
            }, 20);
            timeoutsRef.current.push(toCenterId);
            // Step C: apply shuffled deck and measure target positions
            var applyShuffleId = window.setTimeout(function() {
                setDeck(finalDeck);
                // wait next frame for DOM
                var measureTargetsId = window.setTimeout(function() {
                    var targets = finalDeck.map(function(c) {
                        var el = cardRefs.current[c.uid];
                        var r = el ? el.getBoundingClientRect() : {
                            left: centerLeft,
                            top: centerTop
                        };
                        return {
                            uid: c.uid,
                            left: r.left,
                            top: r.top
                        };
                    });
                    // Step D: fly from center to targets
                    setFlyCards(function(prev) {
                        return prev.map(function(fc, i) {
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, fc), {
                                left: targets[i].left,
                                top: targets[i].top
                            });
                        });
                    });
                    // Step E: end overlay
                    var endId = window.setTimeout(function() {
                        setFlyVisible(false);
                        setPhase('play');
                        busyRef.current = false;
                    }, 650);
                    timeoutsRef.current.push(endId);
                }, 40);
                timeoutsRef.current.push(measureTargetsId);
            }, 600);
            timeoutsRef.current.push(applyShuffleId);
        }, PER_PAIR_MS * PAIRS + 750);
        timeoutsRef.current.push(shuffleStartId);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MemoryGame.useEffect": function() {
            newGame();
        }
    }["MemoryGame.useEffect"], []);
    var onCardClick = function(c) {
        if (busyRef.current) return;
        if (matchedPairs.has(c.pairId)) return;
        if (flippedUids.includes(c.uid)) return;
        // Start timer on first interaction
        if (!timerRunning) {
            setTimerRunning(true);
            if (!timerRef.current) {
                timerRef.current = window.setInterval(function() {
                    return setElapsedSec(function(s) {
                        return s + 1;
                    });
                }, 1000);
            }
        }
        var next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(flippedUids).concat([
            c.uid
        ]);
        setFlippedUids(next);
        if (next.length === 2) {
            busyRef.current = true;
            setMoves(function(m) {
                return m + 1;
            });
            var _next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(next, 2), u1 = _next[0], u2 = _next[1];
            var c1 = deck.find(function(d) {
                return d.uid === u1;
            });
            var c2 = deck.find(function(d) {
                return d.uid === u2;
            });
            var isMatch = c1.pairId === c2.pairId;
            setTimeout(function() {
                if (isMatch) {
                    var s = new Set(matchedPairs);
                    s.add(c1.pairId);
                    setMatchedPairs(s);
                }
                setFlippedUids([]);
                busyRef.current = false;
                // Stop timer when all pairs matched
                setTimeout(function() {
                    if (matchedPairs.size + (isMatch ? 1 : 0) === PAIRS) {
                        setTimerRunning(false);
                        if (timerRef.current) {
                            window.clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                    }
                }, 0);
            }, isMatch ? 350 : 650);
        }
    };
    var cardHeight = Math.floor(cardWidth * CARD_RATIO);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "w-full min-h-[600px] p-1 flex flex-col bg-bg text-white rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-1 min-h-[40px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleFullscreen,
                                className: "p-2 bg-black/35 hover:bg-black/50 rounded text-white",
                                "aria-label": isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen',
                                children: isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                    lineNumber: 235,
                                    columnNumber: 29
                                }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                    lineNumber: 235,
                                    columnNumber: 65
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, _this),
                            onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-2 bg-black/35 hover:bg-black/50 rounded text-white",
                                "aria-label": "close",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                    lineNumber: 243,
                                    columnNumber: 15
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-text-muted font-mono tracking-wider",
                                children: "Jiu-Jitsu Jungle Memory Game"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-mono tracking-wider",
                                children: [
                                    "Time: ",
                                    String(Math.floor(elapsedSec / 60)).padStart(2, '0'),
                                    ":",
                                    String(elapsedSec % 60).padStart(2, '0')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 249,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-mono tracking-wider",
                                children: [
                                    "Moves: ",
                                    moves
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                variant: "outline",
                                onClick: newGame,
                                className: "font-mono tracking-wider",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        className: "w-4 h-4 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, _this),
                                    "New Game"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 grid grid-cols-4 gap-2.5 justify-items-center content-start relative",
                children: [
                    deck.map(function(card) {
                        var isFlipped = flippedUids.includes(card.uid) || matchedPairs.has(card.pairId);
                        if (phase !== 'play') isFlipped = revealFront.has(card.uid);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: function(el) {
                                cardRefs.current[card.uid] = el;
                            },
                            "data-uid": card.uid,
                            onClick: function() {
                                return onCardClick(card);
                            },
                            className: "rounded-xl overflow-hidden shadow-lg relative cursor-pointer bg-bg",
                            style: {
                                width: cardWidth,
                                height: cardHeight
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 transition-transform duration-280 ease-in-out",
                                    style: {
                                        transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                                        backfaceVisibility: 'hidden'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("picture", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                                srcSet: imageUrl(card.imageId, 'avif'),
                                                type: "image/avif"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                                lineNumber: 278,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                                srcSet: imageUrl(card.imageId, 'webp'),
                                                type: "image/webp"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                                lineNumber: 279,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: imageUrl(card.imageId, 'webp'),
                                                alt: card.imageId,
                                                width: 440,
                                                height: 597,
                                                loading: "lazy",
                                                className: "w-full h-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                                lineNumber: 280,
                                                columnNumber: 19
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                        lineNumber: 277,
                                        columnNumber: 17
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                    lineNumber: 273,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 transition-transform duration-280 ease-in-out",
                                    style: {
                                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                        backfaceVisibility: 'hidden'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: BACK_URL,
                                        alt: "back",
                                        width: 440,
                                        height: 597,
                                        loading: "lazy",
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                        lineNumber: 294,
                                        columnNumber: 17
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, _this)
                            ]
                        }, card.uid, true, {
                            fileName: "[project]/src/components/modules/games/memory-game.tsx",
                            lineNumber: 265,
                            columnNumber: 13
                        }, _this);
                    }),
                    phase === 'shuffle' && flyVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/85 z-30 pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                        lineNumber: 307,
                        columnNumber: 11
                    }, _this),
                    flyVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-40 pointer-events-none",
                        children: flyCards.map(function(fc) {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute rounded-xl overflow-hidden shadow-lg transition-all duration-600 ease-in-out",
                                style: {
                                    left: fc.left,
                                    top: fc.top,
                                    width: cardWidth,
                                    height: cardHeight
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: BACK_URL,
                                    alt: "back",
                                    width: 440,
                                    height: 597,
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                    lineNumber: 317,
                                    columnNumber: 17
                                }, _this)
                            }, "fly-".concat(fc.uid), false, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 312,
                                columnNumber: 15
                            }, _this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, _this),
            showIntro && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: function() {
                    return setShowIntro(false);
                },
                className: "fixed inset-0 z-50 bg-black/65 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[70vw] sm:w-[360px] max-w-[420px] aspect-[440/597] rounded-xl overflow-hidden shadow-2xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: BACK_URL,
                        alt: "back",
                        width: 440,
                        height: 597,
                        className: "w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                        lineNumber: 336,
                        columnNumber: 13
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                    lineNumber: 335,
                    columnNumber: 11
                }, _this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                lineNumber: 331,
                columnNumber: 9
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/games/memory-game.tsx",
        lineNumber: 227,
        columnNumber: 5
    }, _this);
};
_s(MemoryGame, "L0O24fZwZ838TC/HHwLccyXsYNY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFullscreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFullscreen"]
    ];
});
_c = MemoryGame;
var _c;
__turbopack_context__.k.register(_c, "MemoryGame");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/games/games-hub.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GamesHub",
    ()=>GamesHub
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$games$2f$centroid$2d$game$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/games/centroid-game.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$games$2f$memory$2d$game$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/games/memory-game.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
var GamesHub = function(param) {
    var onExit = param.onExit, _param_initial = param.initial, initial = _param_initial === void 0 ? 'none' : _param_initial;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial), 2), selected = _useState[0], setSelected = _useState[1];
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "GamesHub.useEffect": function() {
            setSelected(initial);
        }
    }["GamesHub.useEffect"], [
        initial
    ]);
    if (selected === 'centroid') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$games$2f$centroid$2d$game$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CentroidGame"], {
                onClose: function() {
                    return setSelected('none');
                }
            }, void 0, false, {
                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, _this)
        }, void 0, false, {
            fileName: "[project]/src/components/modules/games/games-hub.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, _this);
    }
    if (selected === 'memory') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$games$2f$memory$2d$game$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MemoryGame"], {
                onClose: function() {
                    return setSelected('none');
                }
            }, void 0, false, {
                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, _this)
        }, void 0, false, {
            fileName: "[project]/src/components/modules/games/games-hub.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, _this);
    }
    var renderCentroidPreview = function() {
        var _loop = function(y) {
            var _loop = function(x) {
                var isDot = sampleDots.some(function(d) {
                    return d.x === x && d.y === y;
                });
                var isGuess = guess.x === x && guess.y === y;
                var isOptimal = Math.round(actual.x) === x && Math.round(actual.y) === y;
                var bg = 'transparent';
                if (isGuess) bg = 'bg-red-500';
                else if (isOptimal) bg = 'bg-green-500';
                else if (isDot) bg = 'bg-blue-500';
                cells.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border border-white/10 ".concat(bg)
                }, "".concat(x, "-").concat(y), false, {
                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, _this));
            };
            for(var x = 0; x < GRID; x++)_loop(x);
        };
        var GRID = 11;
        var sampleDots = [
            {
                x: 2,
                y: 2
            },
            {
                x: 3,
                y: 7
            },
            {
                x: 5,
                y: 4
            },
            {
                x: 7,
                y: 2
            },
            {
                x: 8,
                y: 8
            },
            {
                x: 2,
                y: 9
            }
        ];
        var centroid = function(pts) {
            var sx = pts.reduce(function(s, p) {
                return s + p.x;
            }, 0);
            var sy = pts.reduce(function(s, p) {
                return s + p.y;
            }, 0);
            return {
                x: sx / pts.length,
                y: sy / pts.length
            };
        };
        var nearest = function(p) {
            return {
                x: Math.round(p.x),
                y: Math.round(p.y)
            };
        };
        var actual = centroid(sampleDots);
        var optimal = nearest(actual);
        var guess = {
            x: Math.min(GRID - 1, optimal.x + 1),
            y: optimal.y
        };
        var cells = [];
        for(var y = 0; y < GRID; y++)_loop(y);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full aspect-square grid bg-bg rounded overflow-hidden",
                    style: {
                        gridTemplateColumns: "repeat(".concat(GRID, ", 1fr)"),
                        gridTemplateRows: "repeat(".concat(GRID, ", 1fr)")
                    },
                    children: [
                        cells,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 ".concat(GRID, " ").concat(GRID),
                            preserveAspectRatio: "none",
                            className: "absolute inset-0 pointer-events-none w-full h-full",
                            children: sampleDots.map(function(d, i) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: d.x + 0.5,
                                    y1: d.y + 0.5,
                                    x2: optimal.x + 0.5,
                                    y2: optimal.y + 0.5,
                                    stroke: "#66bb6a",
                                    strokeWidth: 0.15,
                                    opacity: 0.6
                                }, i, false, {
                                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, _this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2 text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Blue = dots"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-green-400",
                            children: "Green = true centroid"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-400",
                            children: "Red = your guess"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/games/games-hub.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, _this);
    };
    var renderMemoryPreview = function() {
        var COLS = 4, ROWS = 4, GAP = 6;
        var BACK_URL = '/images/memory/Memory_JJJ_Back_440x.webp';
        var frontSrc = function(id, ext) {
            return "/images/memory/".concat(ext, "/").concat(id, ".").concat(ext);
        };
        var faceMap = {
            5: '001',
            6: '002'
        };
        var grid = [];
        for(var i = 0; i < COLS * ROWS; i++){
            var faceId = faceMap[i];
            grid.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg overflow-hidden shadow-md bg-bg aspect-[440/597]",
                children: faceId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("picture", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                            srcSet: frontSrc(faceId, 'avif'),
                            type: "image/avif"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 113,
                            columnNumber: 15
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                            srcSet: frontSrc(faceId, 'webp'),
                            type: "image/webp"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 114,
                            columnNumber: 15
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: frontSrc(faceId, 'webp'),
                            alt: "front-".concat(faceId),
                            width: 440,
                            height: 597,
                            className: "w-full h-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 115,
                            columnNumber: 15
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                    lineNumber: 112,
                    columnNumber: 13
                }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: BACK_URL,
                    alt: "back",
                    width: 440,
                    height: 597,
                    className: "w-full h-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                    lineNumber: 124,
                    columnNumber: 13
                }, _this)
            }, i, false, {
                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, _this));
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-1.5 w-full",
                style: {
                    gridTemplateColumns: "repeat(".concat(COLS, ", 1fr)")
                },
                children: grid
            }, void 0, false, {
                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                lineNumber: 137,
                columnNumber: 9
            }, _this)
        }, void 0, false, {
            fileName: "[project]/src/components/modules/games/games-hub.tsx",
            lineNumber: 136,
            columnNumber: 7
        }, _this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full font-mono tracking-wider",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold",
                        children: "Games"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/games-hub.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, _this),
                    onExit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: onExit,
                        className: "font-mono tracking-wider",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-4 h-4 mr-1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, _this),
                            "Back to Modules"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/games/games-hub.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "aspect-[1/1.2] md:aspect-[2/3] max-h-[380px] md:max-h-[520px] rounded-xl overflow-hidden flex",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: function() {
                                return setSelected('centroid');
                            },
                            className: "flex flex-col gap-1 md:gap-2 flex-1 p-2 md:p-4 text-left w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    className: "p-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "text-lg font-mono",
                                        children: "Centroid"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "flex-1 flex items-stretch justify-center w-full p-0",
                                    children: renderCentroidPreview()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/games-hub.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "aspect-[1/1.2] md:aspect-[2/3] max-h-[380px] md:max-h-[520px] rounded-xl overflow-hidden flex",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: function() {
                                return setSelected('memory');
                            },
                            className: "flex flex-col gap-1 md:gap-2 flex-1 p-2 md:p-4 text-left w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    className: "p-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "text-lg font-mono",
                                        children: "JJJ Memory"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "flex-1 flex items-stretch justify-center w-full p-0",
                                    children: renderMemoryPreview()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 173,
                            columnNumber: 11
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/games-hub.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/games/games-hub.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, _this);
};
_s(GamesHub, "ocbnAlAHKI4/651zLVdwRqPZpkg=");
_c = GamesHub;
var _c;
__turbopack_context__.k.register(_c, "GamesHub");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/timer/timer-tool.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimerTool",
    ()=>TimerTool,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
;
;
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}
function toSeconds(t) {
    return t.m * 60 + t.s;
}
function fmt(seconds) {
    var m = Math.floor(seconds / 60).toString().padStart(2, "0");
    var s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return "".concat(m, ":").concat(s);
}
function beep() {
    var freq = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 880, dur = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 120;
    try {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        var ctx = new Ctx();
        var o = ctx.createOscillator();
        var g = ctx.createGain();
        o.frequency.value = freq;
        o.type = "square";
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        setTimeout(function() {
            o.stop();
            ctx.close();
        }, dur);
    } catch (e) {
    // ignore audio errors (e.g. unsupported environment)
    }
}
var TimerTool = function() {
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        m: 5,
        s: 0
    }), 2), roundLen = _useState[0], setRoundLen = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        m: 0,
        s: 20
    }), 2), restLen = _useState1[0], setRestLen = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5), 2), totalRounds = _useState2[0], setTotalRounds = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("paused"), 2), phase = _useState3[0], setPhase = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1), 2), currentRound = _useState4[0], setCurrentRound = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), remaining = _useState5[0], setRemaining = _useState5[1];
    var intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Load persisted settings on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerTool.useEffect": function() {
            try {
                var roundRaw = window.localStorage.getItem("coach_timer_round");
                var restRaw = window.localStorage.getItem("coach_timer_rest");
                var roundsRaw = window.localStorage.getItem("coach_timer_rounds");
                if (roundRaw) setRoundLen(JSON.parse(roundRaw));
                if (restRaw) setRestLen(JSON.parse(restRaw));
                if (roundsRaw) setTotalRounds(Number(roundsRaw) || 5);
            } catch (e) {
            // ignore
            }
        }
    }["TimerTool.useEffect"], []);
    // Persist settings
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerTool.useEffect": function() {
            try {
                window.localStorage.setItem("coach_timer_round", JSON.stringify(roundLen));
            } catch (e) {
            //
            }
        }
    }["TimerTool.useEffect"], [
        roundLen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerTool.useEffect": function() {
            try {
                window.localStorage.setItem("coach_timer_rest", JSON.stringify(restLen));
            } catch (e) {
            //
            }
        }
    }["TimerTool.useEffect"], [
        restLen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerTool.useEffect": function() {
            try {
                window.localStorage.setItem("coach_timer_rounds", String(totalRounds));
            } catch (e) {
            //
            }
        }
    }["TimerTool.useEffect"], [
        totalRounds
    ]);
    var roundSeconds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TimerTool.useMemo[roundSeconds]": function() {
            return toSeconds(roundLen);
        }
    }["TimerTool.useMemo[roundSeconds]"], [
        roundLen
    ]);
    var restSeconds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TimerTool.useMemo[restSeconds]": function() {
            return toSeconds(restLen);
        }
    }["TimerTool.useMemo[restSeconds]"], [
        restLen
    ]);
    var clearTick = function() {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerTool.useEffect": function() {
            return ({
                "TimerTool.useEffect": function() {
                    return clearTick();
                }
            })["TimerTool.useEffect"];
        }
    }["TimerTool.useEffect"], []);
    var runRound = function() {
        clearTick();
        setPhase("round");
        setRemaining(roundSeconds);
        beep(1200, 400); // start beep
        intervalRef.current = window.setInterval(function() {
            setRemaining(function(prev) {
                var next = prev - 1;
                if (next <= 0) {
                    clearTick();
                    beep(500, 800); // end of round
                    if (currentRound >= totalRounds) {
                        setPhase("finished");
                        return 0;
                    }
                    runRest();
                    return 0;
                }
                return next;
            });
        }, 1000);
    };
    var startCountdown = function(onDone) {
        clearTick();
        setPhase("countdown");
        var count = 3;
        setRemaining(count);
        beep(900, 120); // "3"
        intervalRef.current = window.setInterval(function() {
            count -= 1;
            setRemaining(count);
            if (count > 0) {
                var dur = count === 2 ? 240 : 360;
                beep(900, dur);
            } else {
                beep(1200, 500);
                clearTick();
                onDone();
            }
        }, 1000);
    };
    var runRest = function() {
        clearTick();
        setPhase("rest");
        setRemaining(restSeconds);
        intervalRef.current = window.setInterval(function() {
            setRemaining(function(prev) {
                var next = prev - 1;
                if (next <= 0) {
                    clearTick();
                    setCurrentRound(function(r) {
                        return r + 1;
                    });
                    startCountdown(runRound);
                    return 0;
                }
                return next;
            });
        }, 1000);
    };
    var start = function() {
        setCurrentRound(1);
        startCountdown(runRound);
    };
    var pause = function() {
        setPhase("paused");
        clearTick();
    };
    var reset = function() {
        clearTick();
        setPhase("paused");
        setCurrentRound(1);
        setRemaining(0);
    };
    var bigText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TimerTool.useMemo[bigText]": function() {
            return fmt(Math.max(remaining, 0));
        }
    }["TimerTool.useMemo[bigText]"], [
        remaining
    ]);
    var title = phase === "round" ? "Round ".concat(currentRound, "/").concat(totalRounds) : phase === "rest" ? "Rest" : phase === "countdown" ? "Get Ready" : phase === "finished" ? "Finished" : "Paused";
    var color = phase === "round" ? "text-green-400" : phase === "rest" || phase === "countdown" ? "text-amber-400" : "text-white";
    var adjust = function(setter, key, delta) {
        return setter(function(v) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, v), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, key, clamp(v[key] + delta, 0, key === "m" ? 99 : 59)));
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full space-y-4 font-mono tracking-wider",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-text-muted text-sm",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center my-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-mono tabular-nums tracking-[0.25em] text-[18vw] sm:text-[12vw] leading-none font-bold ".concat(color),
                    children: bigText
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                    lineNumber: 225,
                    columnNumber: 9
                }, _this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap justify-center gap-2 mb-2 text-xs sm:text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 rounded-md bg-bg-raised px-2 py-1 text-text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Duration"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-1 rounded hover:bg-white/10",
                                onClick: function() {
                                    return adjust(setRoundLen, "m", -1);
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                    lineNumber: 240,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    roundLen.m.toString().padStart(2, "0"),
                                    ":",
                                    roundLen.s.toString().padStart(2, "0")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-1 rounded hover:bg-white/10",
                                onClick: function() {
                                    return adjust(setRoundLen, "m", +1);
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                    lineNumber: 251,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 rounded-md bg-bg-raised px-2 py-1 text-text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Rest"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-1 rounded hover:bg-white/10",
                                onClick: function() {
                                    return adjust(setRestLen, "s", -5);
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                    lineNumber: 262,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: [
                                    restLen.m.toString().padStart(2, "0"),
                                    ":",
                                    restLen.s.toString().padStart(2, "0")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-1 rounded hover:bg-white/10",
                                onClick: function() {
                                    return adjust(setRestLen, "s", +5);
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 rounded-md bg-bg-raised px-2 py-1 text-text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Rounds"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-1 rounded hover:bg-white/10",
                                onClick: function() {
                                    return setTotalRounds(function(r) {
                                        return Math.max(1, Math.min(99, r - 1));
                                    });
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                    lineNumber: 286,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: totalRounds
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 288,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-1 rounded hover:bg-white/10",
                                onClick: function() {
                                    return setTotalRounds(function(r) {
                                        return Math.max(1, Math.min(99, r + 1));
                                    });
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                    lineNumber: 296,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center gap-3",
                children: [
                    phase === "paused" || phase === "countdown" || phase === "finished" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "lg",
                        onClick: start,
                        className: "font-mono tracking-wider min-w-[120px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                className: "w-4 h-4 mr-1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 308,
                                columnNumber: 13
                            }, _this),
                            "Start"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 303,
                        columnNumber: 11
                    }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "lg",
                        variant: "outline",
                        onClick: pause,
                        className: "font-mono tracking-wider min-w-[120px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                className: "w-4 h-4 mr-1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 318,
                                columnNumber: 13
                            }, _this),
                            "Pause"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 312,
                        columnNumber: 11
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "lg",
                        variant: "ghost",
                        onClick: reset,
                        className: "font-mono tracking-wider",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                className: "w-4 h-4 mr-1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, _this),
                            "Reset"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
        lineNumber: 221,
        columnNumber: 5
    }, _this);
};
_s(TimerTool, "136jU77vNUjcAOGKD6y3qXtnDAw=");
_c = TimerTool;
const __TURBOPACK__default__export__ = TimerTool;
var _c;
__turbopack_context__.k.register(_c, "TimerTool");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_bf5a3b6c._.js.map