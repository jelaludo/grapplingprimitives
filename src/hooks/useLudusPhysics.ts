import { useEffect, useRef, useCallback } from 'react';
import Matter from 'matter-js';
import { LudusNode } from '../types/ludus';

interface PhysicsConfig {
  gravity: number;
  magneticStrength: number;
  friction: number;
  restitution: number;
}

const DEFAULT_CONFIG: PhysicsConfig = {
  gravity: 0.5,
  magneticStrength: 0.3,
  friction: 0.1,
  restitution: 0.6
};

export const useLudusPhysics = (config: Partial<PhysicsConfig> = {}) => {
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const bodiesRef = useRef<Map<string, Matter.Body>>(new Map());
  const configRef = useRef({ ...DEFAULT_CONFIG, ...config });
  const mouseRef = useRef<Matter.Mouse | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);

  // Initialize physics engine
  const initializePhysics = useCallback((container: HTMLElement) => {
    if (engineRef.current) return;

    console.log('Initializing physics engine...');
    console.log('Container dimensions:', container.clientWidth, 'x', container.clientHeight);

    // Create engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: configRef.current.gravity }
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
    const wallThickness = 50;
    const walls = [
      // Bottom wall (receptacle)
      Matter.Bodies.rectangle(
        container.clientWidth / 2,
        container.clientHeight - wallThickness / 2,
        container.clientWidth,
        wallThickness,
        { isStatic: true, render: { fillStyle: '#2a2a2a' } }
      ),
      // Left wall
      Matter.Bodies.rectangle(
        -wallThickness / 2,
        container.clientHeight / 2,
        wallThickness,
        container.clientHeight,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      ),
      // Right wall
      Matter.Bodies.rectangle(
        container.clientWidth + wallThickness / 2,
        container.clientHeight / 2,
        wallThickness,
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
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    mouseConstraintRef.current = mouseConstraint;
    
    Matter.World.add(engine.world, mouseConstraint);
    Matter.Render.run(render);

    // Start the engine
    Matter.Runner.run(Matter.Runner.create(), engine);
    
    console.log('Physics engine initialized successfully');
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

    bodiesRef.current.set(node.id, body);
    Matter.World.add(engineRef.current.world, body);
    
    console.log(`Added node to physics world. Total bodies: ${engineRef.current.world.bodies.length}`);
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

  // Update node position and properties
  const updateNode = useCallback((nodeId: string, updates: Partial<LudusNode>) => {
    if (!engineRef.current) return;

    const body = bodiesRef.current.get(nodeId);
    if (body) {
      if (updates.position) {
        Matter.Body.setPosition(body, updates.position);
      }
      if (updates.color) {
        body.render.fillStyle = updates.color;
      }
      if (updates.r) {
        // Note: Changing radius requires recreating the body
        // This is a simplified approach
        body.circleRadius = updates.r;
      }
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

        if (distance < 1) continue; // Avoid division by zero

        // Determine attraction/repulsion based on categories
        let forceMultiplier = 0;
        
        // Similar categories attract
        if (nodeA.category === nodeB.category) {
          forceMultiplier = strength;
        }
        // Different categories have slight repulsion
        else {
          forceMultiplier = -strength * 0.3;
        }

        // Apply force (inverse square law)
        const force = (forceMultiplier * 1000) / (distance * distance);
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
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // Get node under mouse cursor
  const getNodeUnderMouse = useCallback((mouseX: number, mouseY: number) => {
    if (!engineRef.current) return null;
    
    const bodies = engineRef.current.world.bodies;
    for (const body of bodies) {
      if (body.label && body.label !== 'wall') {
        const distance = Math.sqrt(
          Math.pow(body.position.x - mouseX, 2) + 
          Math.pow(body.position.y - mouseY, 2)
        );
        if (distance <= (body.circleRadius || 15)) {
          return body.label; // This is the node ID
        }
      }
    }
    return null;
  }, []);

  return {
    initializePhysics,
    addNode,
    removeNode,
    updateNode,
    applyMagneticForces,
    getBodyPositions,
    getNodeUnderMouse,
    cleanup
  };
}; 