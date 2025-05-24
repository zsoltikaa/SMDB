// UIController - responsible for UI interactions and animations
app.controller('UIController', function($scope, $window) {

    // initialization of scroll button visibility flag
    $scope.scrollBtnVisible = false;

    // handle visibility of the "scroll to top" button based on scroll position
    angular.element($window).on('scroll', function() {
        $scope.$applyAsync(() => {
            if ($window.scrollY > 7500) {
                $scope.scrollBtnVisible = true;
            } else {
                $scope.scrollBtnVisible = false;
            }
        });
    });

    // scroll to top behavior with smooth animation
    $scope.scrollToTop = function() {
        $window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // preloader animation logic
    $scope.initPreloader = function() {
        // when the window has fully loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                const preloaderFrame = document.getElementById('preloader-frame');

                if (preloaderFrame) {
                    // fade out the preloader
                    preloaderFrame.style.opacity = '0';
                    preloaderFrame.style.transition = 'opacity 0.5s';

                    // remove the element after transition ends
                    setTimeout(() => preloaderFrame.remove(), 500);
                }
            }, 3000); // wait 3 seconds before hiding
        });
    };

    // initialize custom cursor with trailing effect
    $scope.initCustomCursor = function() {
        const cursor = document.querySelector('.custom-cursor'); // main cursor element
        const trailCount = 4; // number of trailing dots
        const trails = [];

        // create and append trailing elements
        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement('div');
            trail.classList.add('trail');
            document.body.appendChild(trail);
            trails.push(trail);
        }

        let mouseX = 0;
        let mouseY = 0;

        // update mouse coordinates and move cursor
        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // initialize last known positions for trail elements
        let lastPositions = Array(trailCount).fill({ x: 0, y: 0 });

        // animate trails to follow the cursor with a smooth delay
        function animate() {
            let x = mouseX;
            let y = mouseY;

            trails.forEach((trail, index) => {
                const lastPos = lastPositions[index];

                // gradually move each trail toward the new mouse position
                lastPositions[index] = {
                    x: lastPos.x + (x - lastPos.x) * 0.3,
                    y: lastPos.y + (y - lastPos.y) * 0.3
                };

                // update trail position and opacity
                trail.style.left = lastPositions[index].x + 'px';
                trail.style.top = lastPositions[index].y + 'px';
                trail.style.opacity = (trailCount - index) / trailCount;

                // pass updated position to the next trail
                x = lastPositions[index].x;
                y = lastPositions[index].y;
            });

            // continue the animation loop
            requestAnimationFrame(animate);
        }

        animate(); // start the animation loop
    };

    // automatic initialization of features
    $scope.initPreloader();      // launch preloader animation
    $scope.initCustomCursor();   // activate custom cursor effect

});