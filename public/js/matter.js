

$(function () {
  console.log('loaded');
  // Matter.js - http://brm.io/matter-js/

  // Matter module aliases
  // Matter module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint;

  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

// create a Matter.js engine
var engine = Engine.create(document.body, {
  render: {
    canvas: canvas,
    options: {
      showAngleIndicator: false,
      wireframes: false
    }
  }
});

  window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

// add a mouse controlled constraint
var mouseConstraint = MouseConstraint.create(engine, {
			constraint: {
				stiffness: 0.01,

				render: {
					visible: false
				}
			}
		});
World.add(engine.world, mouseConstraint);





var letterS = Bodies.rectangle(295, 100, 128, 174, {
     restitution: 0.5,
      render: {
        sprite: {
          texture: './images/S2.png'
        }
      }
    });


  var letterM = Bodies.rectangle(424, 100, 152, 174, {
       restitution: 0.5,
        render: {
          sprite: {
            texture: './images/M.png'
          }
        }
      });

    var letterA = Bodies.rectangle(578, 100, 158, 174, {
         restitution: 0.5,
          render: {
            sprite: {
              texture: './images/A.png'
            }
          }
        });

    var letterS2 = Bodies.rectangle(729, 100, 126, 174, {
         restitution: 0.5,
          render: {
            sprite: {
              texture: './images/S2.png'
            }
          }
        });

    var letterH = Bodies.rectangle(855, 100, 120, 174, {
         restitution: 0.5,
          render: {
            sprite: {
              texture: './images/H.png'
            }
          }
        });



var groundWidth = window.innerWidth *2;
console.log(groundWidth);
// create the ground the stack will sit on
var ground = Bodies.rectangle(1000, 550, groundWidth, 1, {
  isStatic: true,
  render: {
    strokeStyle: "black",
    lineWidth: 0
  }
});

// create the wrecking ball
// var ball = Bodies.circle(100, 400, 50, { density: .01, frictionAir: 0.001,
// });
//
// // create the rope the ball will swing on
// var ballRope = Constraint.create({
//   pointA: { x: 500, y: -3000 },
//   bodyB: ball
// });

// add all of the bodies to the world
World.add(engine.world, [letterS, letterM, letterA, letterS2, letterH, ground]);


// run the engine
Engine.run(engine);

});
