import { Object3D, PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide } from "three";

export default class Layer extends Object3D{
    constructor(texture){
        super();

        let geom = new PlaneGeometry();
        let material = new MeshBasicMaterial({ map: texture, side: DoubleSide, transparent: true });
        this.plane = new Mesh(geom, material);
        this.add(this.plane);
    }

    updateTexture(texture){
        this.plane.material.map = texture;
        this.plane.material.needsUpdate = true;
    }
}