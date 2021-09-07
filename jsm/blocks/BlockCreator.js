import * as THREE from '../../build/three.module.js';

class BlockCreator {
    constructor(blocktype,x,y,z,objects) {
        let boxGeometry,boxMaterial;
        if(blocktype=='grassCube'){
            boxMaterial = this.textureCreator_grassBlock();
            boxGeometry = this.geometryCreator_grassBlock();
        }
       else if(blocktype=='ironore'){
            boxMaterial = this.textureCreator_iron_ore();
            boxGeometry = this.geometryCreator_iron_ore();
        }
        else if(blocktype=='cobblestone'){
            boxMaterial = this.textureCreator_cobblestone();
            boxGeometry = this.geometryCreator_cobblestone();
        }
        else if(blocktype=='glass'){
            boxMaterial = this.textureCreator_glass();
            boxGeometry = this.geometryCreator_glass();
        }
        else if(blocktype=='dirt'){
            boxMaterial = this.textureCreator_dirt();
            boxGeometry = this.geometryCreator_dirt();
        }
        else if(blocktype=='sand'){
            boxMaterial = this.textureCreator_sand();
            boxGeometry = this.geometryCreator_sand();
        }
        else if(blocktype=='oak'){
            boxMaterial = this.textureCreator_oak();
            boxGeometry = this.geometryCreator_oak();
        }
        else if(blocktype=='stone'){
            boxMaterial = this.textureCreator_stone();
            boxGeometry = this.geometryCreator_stone();
        }
        else if(blocktype=='glowstone'){
            boxMaterial = this.textureCreator_glowstone();
            boxGeometry = this.geometryCreator_glowstone();
        }
        //...
        let block = new THREE.Mesh( boxGeometry, boxMaterial );
        block.position.set(x,y,z);
        this.block=block;
        objects.push(this.block);
    }

    textureCreator_grassBlock(){
        //set material of minecraft grasscube
        let Toptexture = new THREE.TextureLoader().load('images/block/grasstop.jpg');
        let Sidetexture = new THREE.TextureLoader().load('images/block/grass_block_side.png');
        let Bottexture = new THREE.TextureLoader().load('images/block/grassbotton.jpg');
        Toptexture.magFilter = THREE.NearestFilter;
        Sidetexture.magFilter = THREE.NearestFilter;
        Bottexture.magFilter = THREE.NearestFilter;
        let oneinalltexture = [
            new THREE.MeshLambertMaterial({map:Sidetexture}),
            new THREE.MeshLambertMaterial({map:Sidetexture}),
            new THREE.MeshLambertMaterial({map:Toptexture}),
            new THREE.MeshLambertMaterial({map:Bottexture}),
            new THREE.MeshLambertMaterial({map:Sidetexture}),
            new THREE.MeshLambertMaterial({map:Sidetexture}),
        ];
        return oneinalltexture;
    }

    geometryCreator_grassBlock(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }

    textureCreator_cobblestone(){
        //set material of minecraft grasscube
        let texture = new THREE.TextureLoader().load('images/block/cobblestone.png');
        texture.magFilter = THREE.NearestFilter;

        let oneinalltexture = [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
        return oneinalltexture;
    }
    geometryCreator_cobblestone(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }

    textureCreator_iron_ore(){
        //set material of minecraft grasscube
        let texture = new THREE.TextureLoader().load('images/block/iron_ore.png');
        texture.magFilter = THREE.NearestFilter;

        let oneinalltexture = [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
        return oneinalltexture;
    }
    geometryCreator_iron_ore(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }

    textureCreator_glass(){
        //set material of minecraft grasscube
        let texture = new THREE.TextureLoader().load('images/block/glass.png');
       // let texture_alpha = new THREE.TextureLoader().load('images/glass_alpha.png');
        texture.magFilter = THREE.NearestFilter;

        let oneinalltexture = [
            new THREE.MeshLambertMaterial({map:texture,transparent : true}),
            new THREE.MeshLambertMaterial({map:texture,transparent : true}),
            new THREE.MeshLambertMaterial({map:texture,transparent : true}),
            new THREE.MeshLambertMaterial({map:texture,transparent : true}),
            new THREE.MeshLambertMaterial({map:texture,transparent : true}),
            new THREE.MeshLambertMaterial({map:texture,transparent : true}),
        ];
        return oneinalltexture;
    }
    geometryCreator_glass(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }

    textureCreator_dirt(){
        let texture = new THREE.TextureLoader().load('images/block/dirt.png');
        texture.magFilter = THREE.NearestFilter;

        let oneinalltexture = [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
        return oneinalltexture;
    }
    geometryCreator_dirt(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }

    textureCreator_sand(){
        let texture = new THREE.TextureLoader().load('images/block/sand.png');
        texture.magFilter = THREE.NearestFilter;

        let oneinalltexture = [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
        return oneinalltexture;
    }
    geometryCreator_sand(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }

    textureCreator_oak(){
        let texture = new THREE.TextureLoader().load('images/block/oak_log.png');
        let texturetop = new THREE.TextureLoader().load('images/block/oak_log_top.png');
        texture.magFilter = THREE.NearestFilter;
        texturetop.magFilter = THREE.NearestFilter;

        let oneinalltexture = [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texturetop}),
            new THREE.MeshLambertMaterial({map:texturetop}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
        return oneinalltexture;
    }
    geometryCreator_oak(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }

    textureCreator_stone(){
        let texture = new THREE.TextureLoader().load('images/block/stone.png');
        texture.magFilter = THREE.NearestFilter;

        let oneinalltexture = [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
        return oneinalltexture;
    }
    geometryCreator_stone(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }


    textureCreator_glowstone(){
        let texture = new THREE.TextureLoader().load('images/block/glowstone.png');
        texture.magFilter = THREE.NearestFilter;

        let oneinalltexture = [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
        return oneinalltexture;
    }
    geometryCreator_glowstone(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }


}


function blockCreator(scene,objects) {//adjust freely for yourself~
/*
    for ( let i = 0; i < 500; i ++ ) {
        let cubebox = new BlockCreator(
            'grassCube',
            Math.floor( Math.random() * 20 - 10 ) * 2,
            Math.floor( Math.random() * 20 ) * 2 ,
            Math.floor( Math.random() * 20 - 10 ) * 2,
            objects
        );
        scene.add( cubebox.block );
    }*/
    for(let j=-15;j<15;j++){
        for(let k=-15;k<15;k++){
            //if (j ==1){
                let cubebox = new BlockCreator(
                    'grassCube',
                    j,0,k,
                    objects
                    );              
              //   } 
            /*  else{
                let cubebox = new BlockCreator(
                    'stone',
                     j,0,k,
                    objects
                    );*/
            //}

            scene.add(cubebox.block);
        }
    } 
    //set a standpoint
    let cubebox = new BlockCreator('grassCube',2,1,0,objects);
    scene.add( cubebox.block );

    //Texturewall
    cubebox = new BlockCreator('cobblestone',2,1,2,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('glowstone',2,1,3,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('sand',1,1,3,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('glass',2,1,4,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('stone',3,1,2,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('oak',4,1,2,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('dirt',4,1,3,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('ironore',3,2,2,objects);
    scene.add( cubebox.block );
}

export {blockCreator};