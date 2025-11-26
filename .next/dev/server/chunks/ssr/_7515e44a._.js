module.exports = [
"[project]/src/data/concepts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONCEPTS",
    ()=>CONCEPTS,
    "convertBJJConceptToConceptPoint",
    ()=>convertBJJConceptToConceptPoint
]);
const CONCEPTS = [
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
    // X axis: axis_self_opponent (0=Opponent/left, 1=Self/right)
    // Y axis: axis_mental_physical (0=Mental/top, 1=Physical/bottom)
    // In our coordinate system: -1 to 1, where center is 0
    const x = (concept.axis_self_opponent - 0.5) * 2; // 0->-1, 0.5->0, 1->1
    const y = (concept.axis_mental_physical - 0.5) * 2; // 0->-1, 0.5->0, 1->1
    return {
        id: concept.id,
        label: concept.concept,
        x: x,
        y: -y,
        category: concept.category,
        description: concept.description,
        color: concept.color
    };
}
}),
"[project]/src/lib/matrix/panzoom.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePanZoom",
    ()=>usePanZoom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.1;
const DEFAULT_ZOOM = 1;
function usePanZoom(initialState) {
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        zoom: initialState?.zoom ?? DEFAULT_ZOOM,
        translateX: initialState?.translateX ?? 0,
        translateY: initialState?.translateY ?? 0
    });
    const isPanning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastPanPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const zoomBy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((delta, centerX, centerY)=>{
        setState((prev)=>{
            const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev.zoom + delta));
            const zoomRatio = newZoom / prev.zoom;
            // If center point is provided, zoom towards that point
            // We need to adjust translate so the point under the cursor stays fixed
            if (centerX !== undefined && centerY !== undefined) {
                // The center point in screen coordinates should stay fixed
                // When zooming, we need to adjust translate so that:
                // centerX = (centerX - newTranslateX) * newZoom / oldZoom + newTranslateX
                // Solving: newTranslateX = centerX - (centerX - prev.translateX) * zoomRatio
                const newTranslateX = centerX - (centerX - prev.translateX) * zoomRatio;
                const newTranslateY = centerY - (centerY - prev.translateY) * zoomRatio;
                return {
                    zoom: newZoom,
                    translateX: newTranslateX,
                    translateY: newTranslateY
                };
            }
            // Zoom without center point - zoom around current center
            return {
                ...prev,
                zoom: newZoom
            };
        });
    }, []);
    const panBy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((deltaX, deltaY)=>{
        // deltaX and deltaY are now in viewBox units
        setState((prev)=>({
                translateX: prev.translateX + deltaX,
                translateY: prev.translateY + deltaY,
                zoom: prev.zoom
            }));
    }, []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setState({
            zoom: DEFAULT_ZOOM,
            translateX: 0,
            translateY: 0
        });
    }, []);
    const setZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((zoom)=>{
        setState((prev)=>({
                ...prev,
                zoom: Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom))
            }));
    }, []);
    const zoomIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        zoomBy(ZOOM_STEP);
    }, [
        zoomBy
    ]);
    const zoomOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        zoomBy(-ZOOM_STEP);
    }, [
        zoomBy
    ]);
    // Mouse pan handlers
    const handleMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (e.button === 0) {
            isPanning.current = true;
            lastPanPoint.current = {
                x: e.clientX,
                y: e.clientY
            };
            e.preventDefault();
        }
    }, []);
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e, convertToViewBox)=>{
        if (isPanning.current) {
            const deltaX = e.clientX - lastPanPoint.current.x;
            const deltaY = e.clientY - lastPanPoint.current.y;
            // If conversion function provided, use it (for viewBox units)
            // Otherwise use screen pixels (legacy behavior)
            if (convertToViewBox) {
                const viewBoxDelta = convertToViewBox(deltaX, deltaY);
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
    }, [
        panBy
    ]);
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        isPanning.current = false;
    }, []);
    const handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        e.preventDefault();
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        const rect = e.currentTarget.getBoundingClientRect();
        // Get mouse position relative to the container (in screen pixels)
        const centerX = e.clientX - rect.left;
        const centerY = e.clientY - rect.top;
        // Zoom towards the mouse position
        zoomBy(delta, centerX, centerY);
    }, [
        zoomBy
    ]);
    // Touch handlers
    const touchStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (e.touches.length === 1) {
            touchStartRef.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                distance: 0
            };
        } else if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
            touchStartRef.current = {
                x: (touch1.clientX + touch2.clientX) / 2,
                y: (touch1.clientY + touch2.clientY) / 2,
                distance
            };
        }
    }, []);
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (!touchStartRef.current) return;
        if (e.touches.length === 1 && touchStartRef.current.distance === 0) {
            // Single finger pan
            const deltaX = e.touches[0].clientX - touchStartRef.current.x;
            const deltaY = e.touches[0].clientY - touchStartRef.current.y;
            panBy(deltaX, deltaY);
            touchStartRef.current.x = e.touches[0].clientX;
            touchStartRef.current.y = e.touches[0].clientY;
        } else if (e.touches.length === 2 && touchStartRef.current.distance > 0) {
            // Two finger pinch zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
            const scale = distance / touchStartRef.current.distance;
            const rect = e.currentTarget.getBoundingClientRect();
            const centerX = touchStartRef.current.x - rect.left;
            const centerY = touchStartRef.current.y - rect.top;
            zoomBy((scale - 1) * ZOOM_STEP * 2, centerX, centerY);
            touchStartRef.current.distance = distance;
        }
    }, [
        panBy,
        zoomBy
    ]);
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        touchStartRef.current = null;
    }, []);
    return {
        state,
        zoomBy,
        panBy,
        reset,
        setZoom,
        zoomIn,
        zoomOut,
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
}),
"[project]/src/lib/matrix/scales.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
function normalizedToScreen(normalized, viewport, axis) {
    const center = axis === 'x' ? viewport.width / 2 : viewport.height / 2;
    const range = axis === 'x' ? viewport.width : viewport.height;
    const scale = range * viewport.zoom / 2;
    return center + normalized * scale + (axis === 'x' ? viewport.translateX : viewport.translateY);
}
function screenToNormalized(screen, viewport, axis) {
    const center = axis === 'x' ? viewport.width / 2 : viewport.height / 2;
    const range = axis === 'x' ? viewport.width : viewport.height;
    const scale = range * viewport.zoom / 2;
    return (screen - center - (axis === 'x' ? viewport.translateX : viewport.translateY)) / scale;
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function getViewBox(viewport) {
    // Fixed viewBox representing -2 to 2 range (with padding)
    // This gives us room to show the full -1 to 1 normalized space
    // Format: "minX minY width height"
    return "-2 -2 4 4";
}
}),
"[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border border-border-subtle bg-bg-raised text-text-primary shadow-card", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 8,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 23,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 35,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm text-text-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 50,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 70,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
CardFooter.displayName = "CardFooter";
;
}),
"[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-accent-primary text-white",
            secondary: "border-transparent bg-bg-raised text-text-primary",
            destructive: "border-transparent bg-red-600 text-white",
            outline: "text-text-primary border-border-subtle"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/modules/concept-matrix/matrix-controls.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatrixControls",
    ()=>MatrixControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-ssr] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-ssr] (ecmascript) <export default as ZoomOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function MatrixControls({ onZoomIn, onZoomOut, onReset, onQuadrant, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "icon",
                        onClick: onZoomIn,
                        className: "h-10 w-10",
                        "aria-label": "Zoom in",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "icon",
                        onClick: onZoomOut,
                        className: "h-10 w-10",
                        "aria-label": "Zoom out",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "icon",
                        onClick: onReset,
                        className: "h-10 w-10",
                        "aria-label": "Reset view",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
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
            onQuadrant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-1 mt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: ()=>onQuadrant(1),
                        className: "h-8 text-xs",
                        "aria-label": "Quadrant 1",
                        children: "Q1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: ()=>onQuadrant(2),
                        className: "h-8 text-xs",
                        "aria-label": "Quadrant 2",
                        children: "Q2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: ()=>onQuadrant(3),
                        className: "h-8 text-xs",
                        "aria-label": "Quadrant 3",
                        children: "Q3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: ()=>onQuadrant(4),
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
}),
"[project]/src/lib/data/load-concepts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadConcepts",
    ()=>loadConcepts,
    "loadConceptsSync",
    ()=>loadConceptsSync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$concepts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/concepts.ts [app-ssr] (ecmascript)");
;
async function loadConcepts() {
    try {
        // In Next.js, we can import JSON directly or fetch it
        // For static export, we'll use a fetch that works at build time
        const response = await fetch("/data/BJJMasterList.json", {
            cache: "force-cache"
        });
        if (!response.ok) {
            throw new Error(`Failed to load concepts: ${response.status}`);
        }
        const data = await response.json();
        if (!data.skillsMasterList || !Array.isArray(data.skillsMasterList)) {
            throw new Error("Invalid data format");
        }
        // Convert BJJConcept to ConceptPoint and handle duplicates
        // Use a Set to track seen IDs and ensure uniqueness
        const seenIds = new Set();
        const concepts = [];
        data.skillsMasterList.forEach((concept, index)=>{
            // Create a base ID
            const baseId = concept.id || `concept-${index}`;
            let uniqueId = baseId;
            let duplicateCount = 0;
            // If we've seen this ID before, append a counter to make it unique
            while(seenIds.has(uniqueId)){
                duplicateCount++;
                uniqueId = `${baseId}-dup-${duplicateCount}`;
            }
            seenIds.add(uniqueId);
            concepts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$concepts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertBJJConceptToConceptPoint"])({
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
            console.warn(`Found ${data.skillsMasterList.length - concepts.length} duplicate concept IDs`);
        }
        // Extract unique categories with colors and axis labels
        const categoryMap = new Map();
        if (data.categories && Array.isArray(data.categories)) {
            data.categories.forEach((cat)=>{
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
        concepts.forEach((concept)=>{
            if (!concept.color && categoryMap.has(concept.category)) {
                concept.color = categoryMap.get(concept.category).color;
            }
        });
        return {
            concepts,
            categories: Array.from(categoryMap.entries()).map(([name, data])=>({
                    name,
                    color: data.color,
                    xAxis: data.xAxis,
                    yAxis: data.yAxis
                }))
        };
    } catch (error) {
        console.error("Failed to load concepts:", error);
        // Return empty data on error
        return {
            concepts: [],
            categories: []
        };
    }
}
function loadConceptsSync() {
    // For static builds, we'll need to import the JSON directly
    // This is a fallback - in practice, we'll use the async version
    return {
        concepts: [],
        categories: []
    };
}
}),
"[project]/src/components/modules/concept-matrix/concept-matrix.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConceptMatrix",
    ()=>ConceptMatrix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$concepts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/concepts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$panzoom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/matrix/panzoom.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$scales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/matrix/scales.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$concept$2d$matrix$2f$matrix$2d$controls$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/concept-matrix/matrix-controls.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$load$2d$concepts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/load-concepts.ts [app-ssr] (ecmascript)");
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
// Category color mapping - will be populated from actual data
const CATEGORY_COLORS = {
    "Grappling Primitives": "#848a94",
    "Tactics": "#8A2BE2",
    "Strategy": "#FF8C00",
    "Training": "#00CED1",
    "Coaching": "#6b6d70",
    "Memes": "#8A2BE2",
    "21 Immutable Principles": "#FFD700",
    "32 Principles": "#FFD700",
    "Default": "#6B7280"
};
function getCategoryColor(category, categoryMap) {
    if (categoryMap && categoryMap.has(category)) {
        return categoryMap.get(category);
    }
    return CATEGORY_COLORS[category] || CATEGORY_COLORS.Default;
}
function ConceptMatrix({ concepts: initialConcepts, width: initialWidth, height: initialHeight }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [dimensions, setDimensions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        width: 800,
        height: 600
    });
    const [selectedConcept, setSelectedConcept] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hoveredConcept, setHoveredConcept] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tooltipPosition, setTooltipPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [concepts, setConcepts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialConcepts || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$concepts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONCEPTS"]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!initialConcepts);
    const [conceptData, setConceptData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedCategories, setSelectedCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const isPanning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastPanPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const panZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$panzoom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePanZoom"])();
    // Build category map for colors
    const categoryMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const map = new Map();
        if (conceptData?.categories) {
            conceptData.categories.forEach((cat)=>{
                map.set(cat.name, cat.color);
            });
        }
        return map;
    }, [
        conceptData
    ]);
    // Filter concepts by selected categories
    const filteredConcepts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (selectedCategories.size === 0) {
            return concepts;
        }
        return concepts.filter((c)=>selectedCategories.has(c.category));
    }, [
        concepts,
        selectedCategories
    ]);
    // Get unique categories from concepts
    const availableCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const cats = new Set();
        concepts.forEach((c)=>cats.add(c.category));
        return Array.from(cats).sort();
    }, [
        concepts
    ]);
    // Load real data if no concepts provided
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!initialConcepts) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$load$2d$concepts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadConcepts"])().then((data)=>{
                if (data.concepts.length > 0) {
                    console.log(`✅ Loaded ${data.concepts.length} concepts`);
                    setConcepts(data.concepts);
                    setConceptData(data);
                } else {
                    console.warn("⚠️ No concepts loaded");
                }
                setLoading(false);
            }).catch((error)=>{
                console.error("Failed to load concepts:", error);
                setLoading(false);
            });
        } else {
            console.log(`Using ${initialConcepts.length} provided concepts`);
        }
    }, [
        initialConcepts
    ]);
    // Update dimensions on mount and resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updateDimensions = ()=>{
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({
                    width: initialWidth || rect.width || 800,
                    height: initialHeight || Math.max(rect.height, 400) || 600
                });
            }
        };
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return ()=>window.removeEventListener("resize", updateDimensions);
    }, [
        initialWidth,
        initialHeight
    ]);
    // Convert screen coordinates to viewBox coordinates (data space)
    // This gives us the point in the untransformed coordinate system
    const screenToDataSpace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((screenX, screenY)=>{
        // Convert screen pixel to viewBox coordinate (before transform)
        // viewBox is -2 to 2 (width 4), so: viewBoxX = (screenX / width) * 4 - 2
        const viewBoxX = screenX / dimensions.width * 4 - 2;
        const viewBoxY = screenY / dimensions.height * 4 - 2;
        // The transform is: scale(z) translate(tx/z, ty/z)
        // SVG applies right-to-left: translate first, then scale
        // So to reverse: divide by zoom, then subtract translate
        const dataX = viewBoxX / panZoom.state.zoom - panZoom.state.translateX / panZoom.state.zoom;
        const dataY = viewBoxY / panZoom.state.zoom - panZoom.state.translateY / panZoom.state.zoom;
        return {
            x: dataX,
            y: dataY
        };
    }, [
        dimensions,
        panZoom.state
    ]);
    // Convert screen pixel delta to viewBox units for panning
    const screenDeltaToViewBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((deltaX, deltaY)=>{
        // Convert screen pixel delta to viewBox units
        // viewBox width is 4, so 1 viewBox unit = width / 4 pixels
        // When we pan, we want the same visual movement regardless of zoom
        // So: viewBoxDelta = screenDelta / (width/4)
        const viewBoxDeltaX = deltaX / (dimensions.width / 4);
        const viewBoxDeltaY = deltaY / (dimensions.height / 4);
        return {
            x: viewBoxDeltaX,
            y: viewBoxDeltaY
        };
    }, [
        dimensions
    ]);
    // Handle double-click zoom
    const handleDoubleClick = (e)=>{
        const rect = e.currentTarget.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        const dataPoint = screenToDataSpace(screenX, screenY);
        // Convert data point back to screen for zoom center
        panZoom.zoomBy(0.5, screenX, screenY);
    };
    // Handle wheel zoom with proper coordinate conversion
    const handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const rect = e.currentTarget.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        panZoom.zoomBy(delta, screenX, screenY);
    }, [
        panZoom
    ]);
    // Handle concept click/tap
    const handleConceptClick = (concept, e)=>{
        e.stopPropagation();
        setSelectedConcept(concept);
        if (e.type === "touchstart") {
            const touch = e.touches[0];
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                setTooltipPosition({
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top
                });
            }
        } else {
            const mouse = e;
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                setTooltipPosition({
                    x: mouse.clientX - rect.left,
                    y: mouse.clientY - rect.top
                });
            }
        }
    };
    const viewport = {
        width: dimensions.width,
        height: dimensions.height,
        translateX: panZoom.state.translateX,
        translateY: panZoom.state.translateY,
        zoom: panZoom.state.zoom
    };
    const viewBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$scales$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getViewBox"])(viewport);
    // Convert normalized coordinates (-1 to 1) to SVG viewBox coordinates
    // The viewBox is -2 to 2, so we map directly: -1 maps to -2, 0 to 0, 1 to 2
    // These are FIXED coordinates - dots stay at these positions regardless of zoom/pan
    const toSVGX = (normalized)=>normalized * 2;
    const toSVGY = (normalized)=>normalized * 2;
    // Handle quadrant navigation
    const handleQuadrant = (quadrant)=>{
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        // Quadrant centers in normalized coordinates
        const quadrantCenters = {
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
        const target = quadrantCenters[quadrant];
        // Convert to screen coordinates and center
        const screenX = centerX + target.x * (dimensions.width / 2);
        const screenY = centerY - target.y * (dimensions.height / 2);
        // Set zoom and translate to center on quadrant
        panZoom.setZoom(1.5);
        panZoom.panBy(centerX - screenX, centerY - screenY);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full h-full min-h-[400px] bg-bg-raised rounded-lg border border-border-subtle flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-text-muted",
                children: "Loading concepts..."
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 244,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
            lineNumber: 243,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative w-full h-full min-h-[400px] bg-bg-raised rounded-lg border border-border-subtle overflow-hidden",
        onMouseDown: (e)=>{
            if (e.button === 0) {
                isPanning.current = true;
                lastPanPoint.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                e.preventDefault();
            }
        },
        onMouseMove: (e)=>{
            if (isPanning.current) {
                const deltaX = e.clientX - lastPanPoint.current.x;
                const deltaY = e.clientY - lastPanPoint.current.y;
                const viewBoxDelta = screenDeltaToViewBox(deltaX, deltaY);
                panZoom.panBy(viewBoxDelta.x, viewBoxDelta.y);
                lastPanPoint.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                e.preventDefault();
            }
        },
        onMouseUp: ()=>{
            isPanning.current = false;
        },
        onMouseLeave: ()=>{
            isPanning.current = false;
        },
        onTouchStart: panZoom.handlers.onTouchStart,
        onTouchMove: panZoom.handlers.onTouchMove,
        onTouchEnd: panZoom.handlers.onTouchEnd,
        onDoubleClick: handleDoubleClick,
        onWheel: handleWheel,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: dimensions.width,
                height: dimensions.height,
                viewBox: viewBox,
                className: "absolute inset-0",
                style: {
                    touchAction: "none"
                },
                preserveAspectRatio: "xMidYMid meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                            id: "grid",
                            width: "0.5",
                            height: "0.5",
                            patternUnits: "userSpaceOnUse",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M 0.5 0 L 0 0 0 0.5",
                                fill: "none",
                                stroke: "#1C1F26",
                                strokeWidth: "0.05"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 297,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                            lineNumber: 291,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "-2",
                        y: "-2",
                        width: "4",
                        height: "4",
                        fill: "url(#grid)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 307,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: "-2",
                        y1: "0",
                        x2: "2",
                        y2: "0",
                        stroke: "#1C1F26",
                        strokeWidth: "0.1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 310,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: "0",
                        y1: "-2",
                        x2: "0",
                        y2: "2",
                        stroke: "#1C1F26",
                        strokeWidth: "0.1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: `
            scale(${panZoom.state.zoom})
            translate(
              ${panZoom.state.translateX / panZoom.state.zoom}, 
              ${panZoom.state.translateY / panZoom.state.zoom}
            )
          `,
                        children: filteredConcepts.map((concept, index)=>{
                            const isSelected = selectedConcept?.id === concept.id;
                            const isHovered = hoveredConcept?.id === concept.id;
                            const color = concept.color || getCategoryColor(concept.category);
                            const radius = isSelected ? 0.15 : isHovered ? 0.12 : 0.1; // Scale radius for viewBox
                            const svgX = toSVGX(concept.x);
                            const svgY = toSVGY(concept.y);
                            // Debug first few dots
                            if (index < 5) {
                                console.log(`Dot ${index}: "${concept.label}" - normalized: (${concept.x.toFixed(2)}, ${concept.y.toFixed(2)}) -> SVG: (${svgX.toFixed(2)}, ${svgY.toFixed(2)}) color: ${color}`);
                            }
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: svgX,
                                        cy: svgY,
                                        r: radius,
                                        fill: color,
                                        stroke: isSelected ? "#fff" : isHovered ? color : "transparent",
                                        strokeWidth: isSelected ? 0.05 : 0.03,
                                        opacity: isSelected ? 1 : isHovered ? 0.9 : 0.7,
                                        className: "cursor-pointer transition-all",
                                        onClick: (e)=>handleConceptClick(concept, e),
                                        onMouseEnter: ()=>setHoveredConcept(concept),
                                        onMouseLeave: ()=>setHoveredConcept(null),
                                        onTouchStart: (e)=>handleConceptClick(concept, e)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this),
                                    (isSelected || isHovered) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: svgX,
                                        y: svgY - radius - 0.2,
                                        textAnchor: "middle",
                                        fill: "#E5E7EB",
                                        fontSize: `${0.3 / panZoom.state.zoom}`,
                                        fontWeight: "500",
                                        className: "pointer-events-none",
                                        children: concept.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                        lineNumber: 374,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, concept.id, true, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-4 z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$concept$2d$matrix$2f$matrix$2d$controls$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatrixControls"], {
                    onZoomIn: panZoom.zoomIn,
                    onZoomOut: panZoom.zoomOut,
                    onReset: panZoom.reset,
                    onQuadrant: handleQuadrant
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                    lineNumber: 394,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, this),
            selectedConcept && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-10 pointer-events-none",
                style: {
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y}px`,
                    transform: "translate(-50%, -100%)",
                    marginTop: "-8px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                    className: "bg-bg-raised border-border-subtle p-3 min-w-[200px] max-w-[300px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold text-sm",
                                        children: selectedConcept.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                        lineNumber: 416,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: "border-border-subtle text-xs",
                                        children: selectedConcept.category
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                        lineNumber: 417,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 415,
                                columnNumber: 15
                            }, this),
                            selectedConcept.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-text-muted",
                                children: selectedConcept.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 422,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 414,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                    lineNumber: 413,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 404,
                columnNumber: 9
            }, this),
            selectedConcept && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0",
                onClick: ()=>setSelectedConcept(null),
                onTouchStart: ()=>setSelectedConcept(null)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 431,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
        lineNumber: 250,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ZoomIn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "11",
            cy: "11",
            r: "8",
            key: "4ej97u"
        }
    ],
    [
        "line",
        {
            x1: "21",
            x2: "16.65",
            y1: "21",
            y2: "16.65",
            key: "13gj7c"
        }
    ],
    [
        "line",
        {
            x1: "11",
            x2: "11",
            y1: "8",
            y2: "14",
            key: "1vmskp"
        }
    ],
    [
        "line",
        {
            x1: "8",
            x2: "14",
            y1: "11",
            y2: "11",
            key: "durymu"
        }
    ]
];
const ZoomIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("zoom-in", __iconNode);
;
 //# sourceMappingURL=zoom-in.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-ssr] (ecmascript) <export default as ZoomIn>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ZoomIn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ZoomOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "11",
            cy: "11",
            r: "8",
            key: "4ej97u"
        }
    ],
    [
        "line",
        {
            x1: "21",
            x2: "16.65",
            y1: "21",
            y2: "16.65",
            key: "13gj7c"
        }
    ],
    [
        "line",
        {
            x1: "8",
            x2: "14",
            y1: "11",
            y2: "11",
            key: "durymu"
        }
    ]
];
const ZoomOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("zoom-out", __iconNode);
;
 //# sourceMappingURL=zoom-out.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-ssr] (ecmascript) <export default as ZoomOut>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ZoomOut",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>RotateCcw
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
            key: "1357e3"
        }
    ],
    [
        "path",
        {
            d: "M3 3v5h5",
            key: "1xhq8a"
        }
    ]
];
const RotateCcw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("rotate-ccw", __iconNode);
;
 //# sourceMappingURL=rotate-ccw.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RotateCcw",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_7515e44a._.js.map