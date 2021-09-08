import * as THREE from '../../build/three.module.js';

class SpecialBlockCreator {
    constructor(blocktype,x,y,z,objects){
        let light;
        let status;
        let boxGeometry,boxMaterial;
        if(blocktype=='pressureplate'){
            boxMaterial = this.textureCreator_pressureplate();
            boxGeometry = this.geometryCreator_pressureplate();
        }
        if(blocktype=='redstone_lamp'){
            boxMaterial = this.textureCreator_redstone_lamp();
            boxGeometry = this.geometryCreator_RegularBlock();
        }

        let block = new THREE.Mesh( boxGeometry, boxMaterial );
        block.position.set(x,y,z);
        this.block=block;
        objects.push(this.block);
    }
    textureCreator_pressureplate(){
        let texture = new THREE.TextureLoader().load('images/block/oak_planks.png');
        texture.magFilter = THREE.NearestFilter;
        return new THREE.MeshLambertMaterial({map:texture});
    }
    geometryCreator_pressureplate(){
        return new THREE.BoxGeometry( 1, 0.1, 1 );
    }
    textureCreator_redstone_lamp(){
        let texture = new THREE.TextureLoader().load('images/block/redstone_lamp.png');
        texture.magFilter = THREE.NearestFilter;
        return new THREE.MeshLambertMaterial({map:texture});
    }
    geometryCreator_RegularBlock(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }

    TurnOn_redstone_lamp(){
        let texture = new THREE.TextureLoader().load('images/block/redstone_lamp_on.png');
        this.block.material.map=texture;
    }

}
export {SpecialBlockCreator};