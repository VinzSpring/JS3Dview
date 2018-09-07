# JS3Dview
![pyramids being rendered](https://github.com/VinzSpring/JS3Dview/blob/master/pyramids.PNG "Fig1")
## Fig1 pyramids being rendered
This project is the result of me posing myself the challenge of coding a simple 3D renderer using only 2D canvas drawing.
It was especially important to not look anything up online which could serve any hints or solutions on how to do 3D/2D projection.
Fig1 shows the rendering of a bunch of pyramids. The renderer also supports transformation and moving around using hotkeys definded in Renderer.js.
3D rays can be added using
```javascript
//add x-axis to linebuffer
renderer.commit(
        [
            [0, 0, 0],
            [100, 0, 0]
        ]);
// draw all lines onto the 2D canvas
renderer.draw();

//clear linebuffer/remove all lines
renderer.flush();
```
