import * as THREE from '../../build/three.module.js';
import {SpecialBlockCreator} from './SpecialBlockCreator.js'
class BlockCreator {
    constructor(blocktype,x,y,z,objects) {
        let boxGeometry,boxMaterial;
        if(blocktype==='grassBlock'){
            boxMaterial = this.textureCreator_grassBlock();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
        //Ore
       else if(blocktype==='ironore'){
            boxMaterial = this.textureCreator_iron_ore();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
       else if(blocktype==='coalore'){
            boxMaterial = this.textureCreator_coal_ore();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
       else if(blocktype==='goldore'){
            boxMaterial = this.textureCreator_gold_ore();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
       else if(blocktype==='diamondore'){
            boxMaterial = this.textureCreator_diamond_ore();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
        //Base Block
        else if(blocktype==='cobblestone'){
            boxMaterial = this.textureCreator_cobblestone();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
        else if(blocktype==='glass'){
            boxMaterial = this.textureCreator_glass();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
        else if(blocktype==='dirt'){
            boxMaterial = this.textureCreator_dirt();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
        else if(blocktype==='sand'){
            boxMaterial = this.textureCreator_sand();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
        else if(blocktype==='gravel'){
            boxMaterial = this.textureCreator_gravel();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
        else if(blocktype==='oak'){
            boxMaterial = this.textureCreator_oak();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
        else if(blocktype==='stone'){
            boxMaterial = this.textureCreator_stone();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
        else if(blocktype==='glowstone'){
            boxMaterial = this.textureCreator_glowstone();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
        //Slab
        else if(blocktype==='stoneslab'){
            boxMaterial = this.textureCreator_stoneslab();
            boxGeometry = this.geometryCreator_RegularBlock();
        }
        //...
        let block = new THREE.Mesh( boxGeometry, boxMaterial );
        block.position.set(x,y,z);
        this.block=block;
        objects.push(this.block);
    }

    textureCreator_grassBlock(){
        let Toptexture = new THREE.TextureLoader().load('images/block/grasstop.jpg');
        let Sidetexture = new THREE.TextureLoader().load('images/block/grass_block_side.png');
        let Bottexture = new THREE.TextureLoader().load('images/block/grassbotton.jpg');
        Toptexture.magFilter = THREE.NearestFilter;
        Sidetexture.magFilter = THREE.NearestFilter;
        Bottexture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:Sidetexture}),
            new THREE.MeshLambertMaterial({map:Sidetexture}),
            new THREE.MeshLambertMaterial({map:Toptexture}),
            new THREE.MeshLambertMaterial({map:Bottexture}),
            new THREE.MeshLambertMaterial({map:Sidetexture}),
            new THREE.MeshLambertMaterial({map:Sidetexture}),
        ];
    }

    geometryCreator_RegularBlock(){
        return new THREE.BoxGeometry( 1, 1, 1 );
    }

    textureCreator_cobblestone(){
        let texture = new THREE.TextureLoader().load('images/block/cobblestone.png');
        texture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
    }
    textureCreator_iron_ore(){
        let texture = new THREE.TextureLoader().load('images/block/iron_ore.png');
        texture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
    }
    textureCreator_coal_ore(){
        let texture = new THREE.TextureLoader().load('images/block/coal_ore.png');
        texture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
    }

    textureCreator_diamond_ore(){
        let texture = new THREE.TextureLoader().load('images/block/diamond_ore.png');
        texture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
    }

    textureCreator_gold_ore(){
        let texture = new THREE.TextureLoader().load('images/block/gold_ore.png');
        texture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
    }

    textureCreator_glass(){
        let texture = new THREE.TextureLoader().load('images/block/glass.png');
       // let texture_alpha = new THREE.TextureLoader().load('images/glass_alpha.png');
        texture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture,transparent : true}),
            new THREE.MeshLambertMaterial({map:texture,transparent : true}),
            new THREE.MeshLambertMaterial({map:texture,transparent : true}),
            new THREE.MeshLambertMaterial({map:texture,transparent : true}),
            new THREE.MeshLambertMaterial({map:texture,transparent : true}),
            new THREE.MeshLambertMaterial({map:texture,transparent : true}),
        ];
    }

    textureCreator_dirt(){
        let texture = new THREE.TextureLoader().load('images/block/dirt.png');
        texture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
    }

    textureCreator_sand(){
        let texture = new THREE.TextureLoader().load('images/block/sand.png');
        texture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
    }

    textureCreator_gravel(){
        let texture = new THREE.TextureLoader().load('images/block/gravel.png');
        texture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
    }

    textureCreator_oak(){
        let texture = new THREE.TextureLoader().load('images/block/oak_log.png');
        let texturetop = new THREE.TextureLoader().load('images/block/oak_log_top.png');
        texture.magFilter = THREE.NearestFilter;
        texturetop.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texturetop}),
            new THREE.MeshLambertMaterial({map:texturetop}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
    }
    textureCreator_stone(){
        let texture = new THREE.TextureLoader().load('images/block/stone.png');
        texture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
    }

    textureCreator_stoneslab(){
        let texture = new THREE.TextureLoader().load('images/block/smooth_stone.png');
        texture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
    }

    textureCreator_glowstone(){
        let texture = new THREE.TextureLoader().load('images/block/glowstone.png');
        texture.magFilter = THREE.NearestFilter;
        return [
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
            new THREE.MeshLambertMaterial({map:texture}),
        ];
    }

}


function blockCreator(scene,objects,updatefuncList,controls) {//adjust freely for yourself~
    let cubebox,cubeboxblock;
    cubebox = new BlockCreator(
        'grassBlock',
        0,0,0,
        objects
    );
    for(let x0=-15;x0<15;x0++){
        for(let z0=-15;z0<15;z0++){
             // cubebox = new BlockCreator(
             //    'grassBlock',
             //    x0,0,z0,
             //    objects
             //    );
             // scene.add(cubebox.block);
            cubeboxblock=cubebox.block.clone();
            cubeboxblock.position.set(x0,0,z0);
            scene.add(cubeboxblock);
            objects.push(cubeboxblock);
        }
    } 

    //Add a platform
    cubebox=new BlockCreator(
        'stoneslab',
        0,0,0,
        objects
    );
    scene.add(cubebox.block);
    for (let x1=-6;x1>-14;x1--){
         for (let z1=x1+2;z1<=Math.abs(x1+2);z1++){
            // cubebox=new BlockCreator(
            //     'stoneslab',
            //     x1,5,z1,
            //     objects
            //  );
            // scene.add(cubebox.block);
             cubeboxblock=cubebox.block.clone();
             cubeboxblock.position.set(x1,5,z1);
             scene.add(cubeboxblock);
             objects.push(cubeboxblock);
        }
    }
    //Add Stone stair
    cubebox=new BlockCreator(
        'stone',
        0,0,0,
        objects
    );
    for (let z2=-1;z2<=1;z2++){
         for (let x2=1;x2<=5;x2++){
            // cubebox=new BlockCreator(
            //     'stone',
            //     -x2,x2,z2,
            //     objects
            //  );
            // scene.add(cubebox.block);
             cubeboxblock=cubebox.block.clone();
             cubeboxblock.position.set(-x2,x2,z2);
             scene.add(cubeboxblock);
             objects.push(cubeboxblock);
        }
    }
    //Texturewall

    cubebox = new BlockCreator('glowstone',2,1,3,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('oak',4,1,2,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('glass',2,1,4,objects);
    scene.add( cubebox.block );
    //Basic Block 
    cubebox = new BlockCreator('stone',3,1,2,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('cobblestone',3,2,2,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('dirt',3,3,2,objects);
    scene.add( cubebox.block );
    //Block(With gravity)
    cubebox = new BlockCreator('sand',3,1,3,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('gravel',3,2,3,objects);
    scene.add( cubebox.block );


    //Ore Block
    cubebox = new BlockCreator('ironore',3,2,1,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('goldore',3,1,1,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('coalore',3,3,1,objects);
    scene.add( cubebox.block );
    cubebox = new BlockCreator('diamondore',3,4,1,objects);
    scene.add( cubebox.block );

    cubebox = new SpecialBlockCreator('redstone_lamp',5,5,5,objects);
    scene.add( cubebox.block );
    let lamp = new SpecialBlockCreator('redstone_lamp',5,7,5,objects);
    scene.add( lamp.block );
    let plate = new SpecialBlockCreator('pressureplate',7,1,7,objects);
    scene.add( plate.block );

    //set the activate function when pressure plate is pressed
    function pressureplateupdate() {
        if (plate.pressureplate_status(controls)){
            if (plate.status===true) lamp.TurnOn_redstone_lamp();
            else lamp.TurnOff_redstone_lamp();
        }
    }
    updatefuncList.push(pressureplateupdate);
}

export {blockCreator};