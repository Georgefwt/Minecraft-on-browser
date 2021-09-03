import * as THREE from '../../build/three.module.js';

class BlockCreator {
    constructor(blocktype,x,y,z,objects) {
        let boxGeometry,boxMaterial;
        if(blocktype=='grassCube'){
            boxMaterial = this.textureCreator_grassBlock();
            boxGeometry = this.geometryCreator_grassBlock();
        }
        else if(blocktype=='cobblestone'){
            boxMaterial = this.textureCreator_cobblestone();
            boxGeometry = this.geometryCreator_cobblestone();

            //fix this...need to define the boxMaterial and boxGeometry
        }
        else if(blocktype=='stone'){
            //fix this...
        }
        //...
        let block = new THREE.Mesh( boxGeometry, boxMaterial );
        block.position.set(x,y,z);
        this.block=block;
        objects.push(this.block);
    }

    textureCreator_grassBlock(){
        //set material of minecraft grasscube
        let Toptexture = new THREE.TextureLoader().load('images/grasstop.jpg');
        let Sidetexture = new THREE.TextureLoader().load('images/grass_side.png');
        let Bottexture = new THREE.TextureLoader().load('images/grassbotton.jpg');
        Toptexture.magFilter = THREE.NearestFilter;
        Sidetexture.magFilter = THREE.NearestFilter;
        Bottexture.magFilter = THREE.NearestFilter;
        let texture6face = [
            new THREE.MeshPhongMaterial({map:Sidetexture}),
            new THREE.MeshPhongMaterial({map:Sidetexture}),
            new THREE.MeshPhongMaterial({map:Toptexture}),
            new THREE.MeshPhongMaterial({map:Bottexture}),
            new THREE.MeshPhongMaterial({map:Sidetexture}),
            new THREE.MeshPhongMaterial({map:Sidetexture}),
        ];
        return texture6face;
    }

    geometryCreator_grassBlock(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }

    textureCreator_cobblestone(){
        //set material of minecraft grasscube
        let texture = new THREE.TextureLoader().load('images/cobblestone.png');
        texture.magFilter = THREE.NearestFilter;

        let oneinalltexture = [
            new THREE.MeshStandardMaterial({map:texture}),
            new THREE.MeshStandardMaterial({map:texture}),
            new THREE.MeshStandardMaterial({map:texture}),
            new THREE.MeshStandardMaterial({map:texture}),
            new THREE.MeshStandardMaterial({map:texture}),
            new THREE.MeshStandardMaterial({map:texture}),
        ];
        return oneinalltexture;
    }
    geometryCreator_cobblestone(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }
    textureCreator_stone(){
        //fix this...
    }
    //...
}

function blockCreator(scene,objects) {//adjust freely for yourself~
    for ( let i = 0; i < 500; i ++ ) {
        let cubebox = new BlockCreator(
            'grassCube',
            Math.floor( Math.random() * 20 - 10 ) * 2,
            Math.floor( Math.random() * 20 ) * 2 ,
            Math.floor( Math.random() * 20 - 10 ) * 2,
            objects
        );
        scene.add( cubebox.block );
    }
    //set a standpoint
    let cubebox = new BlockCreator('grassCube',0,0,0,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('grassCube',1,0,0,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('grassCube',0,0,1,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('grassCube',1,0,1,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('grassCube',1,1,1,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('grassCube',1,1,2,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('grassCube',1,4,2,objects);
    scene.add( cubebox.block );
     cubebox = new BlockCreator('cobblestone',1,5,2,objects);
    scene.add( cubebox.block );
}

export {blockCreator};