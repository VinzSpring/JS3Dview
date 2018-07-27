export class Camera {

    constructor(f, transform) {
        this.f = f;
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
    }

    rotate(x, y, z, pitch, roll, yaw) {
        let cosa = Math.cos(yaw);
        let sina = Math.sin(yaw);

        let cosb = Math.cos(pitch);
        let sinb = Math.sin(pitch);

        let cosc = Math.cos(roll);
        let sinc = Math.sin(roll);

        let Axx = cosa * cosb;
        let Axy = cosa * sinb * sinc - sina * cosc;
        let Axz = cosa * sinb * cosc + sina * sinc;

        let Ayx = sina * cosb;
        let Ayy = sina * sinb * sinc + cosa * cosc;
        let Ayz = sina * sinb * cosc - cosa * sinc;

        let Azx = -sinb;
        let Azy = cosb * sinc;
        let Azz = cosb * cosc;


        let px = x;
        let py = y;
        let pz = z;

        return [Axx * px + Axy * py + Axz * pz,
            Ayx * px + Ayy * py + Ayz * pz,
            Azx * px + Azy * py + Azz * pz]

    }

    project(canvas, x, y, z) {

        let width = canvas.width;
        let height = canvas.height;

        x -= this.position[0];
        y -= this.position[1];
        z -= this.position[2];

        let xyz = this.rotate(x, y, z, this.rotation[0], 0, 0);
        x = xyz[0];
        y = xyz[1];
        z = xyz[2];



        if (x < this.f) {
            return null;
        }

        let x2d = width / 2.0 - y / x * this.f;
        let y2d = height / 2.0 - z / x * this.f;

        return [x2d, y2d]
    }
}
