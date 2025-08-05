import { useEffect, useRef, useCallback } from 'react';
import Matter from 'matter-js';
import { LudusNode } from '../types/ludus';

export interface LudusPhysicsConfig {
  magneticStrength: number;
  friction: number;
  restitution: number;
  boundaryPadding: number;
  sameCategoryAttraction: number;
  differentCategoryRepulsion: number;
  distanceThreshold: number;
  updateRate: number;
  damping: number;
  mouseStiffness: number;
}

const DEFAULT_CONFIG: LudusPhysicsConfig = {
  magneticStrength: 0.05, // Good starting value for subtle magnetism
  friction: 0.7, // Good surface resistance
  restitution: 0.01, // Almost no bouncing
  boundaryPadding: 20,
  sameCategoryAttraction: 1.0, // Good attraction strength for same categories
  differentCategoryRepulsion: 0.5, // Good repulsion strength for different categories
  distanceThreshold: 100, // Good interaction range (increased from 50)
  updateRate: 50, // Good physics refresh speed
  damping: 0.95, // Good velocity loss over time (increased from 0.8)
  mouseStiffness: 0.2 // Good mouse drag responsiveness
};

export const useLudusPhysics = (config: Partial<LudusPhysicsConfig> = {}) => {
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const bodiesRef = useRef<Map<string, Matter.Body>>(new Map());
  const mouseRef = useRef<Matter.Mouse | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const configRef = useRef({ ...DEFAULT_CONFIG, ...config });

  // Initialize physics engine
  const initializePhysics = useCallback((container: HTMLElement) => {
    if (engineRef.current) return;

    console.log('Initializing Ludus physics engine...');
    console.log('Container dimensions:', container.clientWidth, 'x', container.clientHeight);

    // Create engine with NO gravity
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 }
    });
    engineRef.current = engine;

    // Create renderer
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width: container.clientWidth,
        height: container.clientHeight,
        wireframes: false,
        background: 'transparent'
      }
    });
    renderRef.current = render;

    // Create boundaries (invisible walls)
    const padding = configRef.current.boundaryPadding;
    const walls = [
      // Top wall
      Matter.Bodies.rectangle(
        container.clientWidth / 2,
        padding / 2,
        container.clientWidth,
        padding,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      ),
      // Bottom wall
      Matter.Bodies.rectangle(
        container.clientWidth / 2,
        container.clientHeight - padding / 2,
        container.clientWidth,
        padding,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      ),
      // Left wall
      Matter.Bodies.rectangle(
        padding / 2,
        container.clientHeight / 2,
        padding,
        container.clientHeight,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      ),
      // Right wall
      Matter.Bodies.rectangle(
        container.clientWidth - padding / 2,
        container.clientHeight / 2,
        padding,
        container.clientHeight,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      )
    ];

    Matter.World.add(engine.world, walls);

      // Add mouse interaction
  const mouse = Matter.Mouse.create(render.canvas);
  mouseRef.current = mouse;
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: configRef.current.mouseStiffness,
      render: {
        visible: false
      }
    }
  });
    mouseConstraintRef.current = mouseConstraint;
    Matter.World.add(engine.world, mouseConstraint);

    Matter.Render.run(render);
    Matter.Runner.run(Matter.Runner.create(), engine);
    
    console.log('Ludus physics engine initialized successfully');
    console.log('Initial world bodies:', engine.world.bodies.length);
  }, []);

  // Add a node to the physics simulation
  const addNode = useCallback((node: LudusNode) => {
    if (!engineRef.current) {
      console.log('Physics engine not initialized');
      return;
    }

    console.log(`Creating physics body for node: ${node.concept} at position (${node.position.x}, ${node.position.y})`);
    
    const body = Matter.Bodies.circle(
      node.position.x,
      node.position.y,
      node.r || 15,
      {
        friction: configRef.current.friction,
        restitution: configRef.current.restitution,
        render: {
          fillStyle: node.color,
          strokeStyle: '#333',
          lineWidth: 2
        },
        label: node.id
      }
    );

    // Set initial velocity to zero to prevent any initial momentum
    Matter.Body.setVelocity(body, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(body, 0);
    Matter.Body.set(body, 'damping', configRef.current.damping);

    bodiesRef.current.set(node.id, body);
    Matter.World.add(engineRef.current.world, body);
    
    console.log(`Added node to physics world. Total bodies: ${engineRef.current.world.bodies.length}`);
    console.log(`Body position: (${body.position.x}, ${body.position.y}), radius: ${body.circleRadius}`);
  }, []);

  // Remove a node from the physics simulation
  const removeNode = useCallback((nodeId: string) => {
    if (!engineRef.current) return;

    const body = bodiesRef.current.get(nodeId);
    if (body) {
      Matter.World.remove(engineRef.current.world, body);
      bodiesRef.current.delete(nodeId);
    }
  }, []);

  // Apply magnetic forces between nodes
  const applyMagneticForces = useCallback((nodes: LudusNode[]) => {
    if (!engineRef.current) return;

    const strength = configRef.current.magneticStrength;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i];
        const nodeB = nodes[j];
        const bodyA = bodiesRef.current.get(nodeA.id);
        const bodyB = bodiesRef.current.get(nodeB.id);

        if (!bodyA || !bodyB) continue;

        // Calculate distance
        const distance = Matter.Vector.magnitude(
          Matter.Vector.sub(bodyB.position, bodyA.position)
        );

        if (distance > configRef.current.distanceThreshold) continue; // Only apply forces when nodes are close enough

        // Debug: Log node categories when they're close
        if (distance < 60) { // Only log when nodes are close
          console.log(`Nodes close: ${nodeA.concept} (${nodeA.category}) vs ${nodeB.concept} (${nodeB.category}) at distance ${distance.toFixed(1)}`);
        }

        // Determine attraction/repulsion based on categories
        let forceMultiplier = 0;
        
        // Similar categories attract
        if (nodeA.category === nodeB.category) {
          forceMultiplier = strength * configRef.current.sameCategoryAttraction;
          if (distance < 60) {
            console.log(`  SAME CATEGORY: Applying attraction force ${forceMultiplier.toFixed(4)}`);
          }
        }
        // Different categories have repulsion
        else {
          forceMultiplier = -strength * configRef.current.differentCategoryRepulsion;
          if (distance < 60) {
            console.log(`  DIFFERENT CATEGORY: Applying repulsion force ${forceMultiplier.toFixed(4)}`);
          }
        }

        // Apply force (inverse relationship for stronger effects)
        const force = forceMultiplier / distance;
        const direction = Matter.Vector.normalise(
          Matter.Vector.sub(bodyB.position, bodyA.position)
        );

        const forceVector = Matter.Vector.mult(direction, force);
        
        Matter.Body.applyForce(bodyA, bodyA.position, forceVector);
        Matter.Body.applyForce(bodyB, bodyB.position, Matter.Vector.neg(forceVector));
      }
    }
  }, []);

  // Get current positions of all bodies
  const getBodyPositions = useCallback(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    
    bodiesRef.current.forEach((body, nodeId) => {
      positions[nodeId] = { x: body.position.x, y: body.position.y };
    });

    return positions;
  }, []);

  // Get node under mouse cursor
  const getNodeUnderMouse = useCallback(() => {
    if (!mouseRef.current || !engineRef.current) return null;

    const mouse = mouseRef.current;
    const bodies = engineRef.current.world.bodies;
    
    for (const body of bodies) {
      if (body.label && body.label !== 'wall') {
        const distance = Math.sqrt(
          Math.pow(body.position.x - mouse.position.x, 2) + 
          Math.pow(body.position.y - mouse.position.y, 2)
        );
        if (distance <= (body.circleRadius || 15)) {
          return body.label;
        }
      }
    }
    
    return null;
  }, []);

  // Cleanup physics engine
  const cleanup = useCallback(() => {
    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
      renderRef.current.canvas.remove();
      renderRef.current = null;
    }
    
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
      engineRef.current = null;
    }
    
    bodiesRef.current.clear();
    mouseRef.current = null;
    mouseConstraintRef.current = null;
  }, []);

  // Update physics configuration
  const updateConfig = useCallback((newConfig: Partial<LudusPhysicsConfig>) => {
    console.log('Updating physics config:', newConfig);
    configRef.current = { ...configRef.current, ...newConfig };
    console.log('New config state:', configRef.current);
    
    // Update mouse constraint stiffness if it exists
    if (mouseConstraintRef.current) {
      mouseConstraintRef.current.constraint.stiffness = configRef.current.mouseStiffness;
    }
  }, []);

  // Reset physics engine
  const reset = useCallback(() => {
    if (engineRef.current) {
      // Remove all bodies except walls
      const bodiesToRemove = engineRef.current.world.bodies.filter(body => 
        body.label && body.label !== 'wall'
      );
      bodiesToRemove.forEach(body => {
        Matter.World.remove(engineRef.current!.world, body);
      });
      
      // Clear our tracking
      bodiesRef.current.clear();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    initializePhysics,
    addNode,
    removeNode,
    applyMagneticForces,
    getBodyPositions,
    getNodeUnderMouse,
    updateConfig,
    reset,
    configRef,
    cleanup
  };
}; 