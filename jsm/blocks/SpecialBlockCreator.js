import * as THREE from '../../build/three.module.js';

class SpecialBlockCreator {
    constructor(blocktype,x,y,z,objects){
        this.light;
        this.status=false;
        let boxGeometry,boxMaterial;
        let block;
        if(blocktype==='pressureplate'){
            boxMaterial = this.textureCreator_pressureplate();
            boxGeometry = this.geometryCreator_pressureplate();
            block = new THREE.Mesh( boxGeometry, boxMaterial );
            block.position.set(x,y-0.5,z);
        }
        if(blocktype==='redstone_lamp'){
            boxMaterial = this.textureCreator_redstone_lamp();
            boxGeometry = this.geometryCreator_RegularBlock();
            block = new THREE.Mesh( boxGeometry, boxMaterial );
            block.position.set(x,y,z);
        }

        this.block=block;
        objects.push(this.block);
    }
    textureCreator_pressureplate(){
        let texture = new THREE.TextureLoader().load('images/block/oak_planks.png');
        texture.magFilter = THREE.NearestFilter;
        return new THREE.MeshLambertMaterial({map:texture});
    }
    geometryCreator_pressureplate(){
        return new THREE.BoxGeometry( 1, 0.08, 1 );
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
        this.block.material.map=new THREE.TextureLoader().load('images/block/redstone_lamp_on.png');
    }
    TurnOff_redstone_lamp(){
        this.block.material.map=new THREE.TextureLoader().load('images/block/redstone_lamp.png');
    }
    pressureplate_status(controls){//return true means change status
        if (controls.getObject().position.x>this.block.position.x-0.8 &&
            controls.getObject().position.x<this.block.position.x+0.8 &&
            controls.getObject().position.z>this.block.position.z-0.8 &&
            controls.getObject().position.z<this.block.position.z+0.8 &&
            controls.getObject().position.y<this.block.position.y+1.6
        ) {
            if(this.status===false) {
                this.block.position.y-=0.02;
                this.status=true;
                return true;
            }
            //console.log(this.status);
            return false;
        }
        else {
            if(this.status===true) {
                this.block.position.y+=0.02;
                this.status=false;
                return true;
            }
            return false;
        }
    }

}
export {SpecialBlockCreator};