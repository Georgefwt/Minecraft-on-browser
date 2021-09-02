import { PointerLockControls } from './PointerLockControls.js';
import * as THREE from '../../build/three.module.js';
class MCFirstPersonControls {
    constructor(camera, domElement, objects, scene) {
        this.camera = camera;
        this.objects = objects;
        this.scene = scene;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.isRunning = false;
        this.canJump = false;
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.checkRay = {//0为负，1为正
            X0: [],
            X1: [],
            Z0: [],
            Z1: [],
            Y0: [],
            Y1: [],
        };
        this.personOption = {
            height: 1.8,//人物总高度。现有配置不能让人物高于2
            sightHeight: 1.5,//眼部高度。现有配置不能让人物高于2
            jumpHeight: 2,    //最大跳跃高度，实际为到此高度
            speedWalk: 5.7,     //最大行走速度
            speedRun: 10,       //最大奔跑速度，连按w两次
            accelerateRateStart: 0.3,//加速时加速比率。正数向前；负数反向；0不会加速；绝对值大于等于1可立即到最大速度
            accelerateRateStop: 0.8,//停止时减速比率。范围[0-1]。0时立即停止，1时不会减速
            thickness: 0.6,//人物的边长
        };
        this.worldOption = {
            g: 9.8
        };
        this.init(camera,domElement);
    }

    init(camera, domElement){
        this.controls = new PointerLockControls(camera, domElement);

        for (let i = 0; i < 6; i++)
            this.checkRay.X0.push(new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(-1, 0, 0), 0, 4));
        for (let i = 0; i < 6; i++)
            this.checkRay.X1.push(new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(1, 0, 0), 0, 4));
        for (let i = 0; i < 6; i++)
            this.checkRay.Z0.push(new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 4));
        for (let i = 0; i < 6; i++)
            this.checkRay.Z1.push(new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0, 4));
        //加垂直方向碰撞检测
        for (let i = 0; i < 4; i++)
            this.checkRay.Y0.push(new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 4));
        for (let i = 0; i < 4; i++)
            this.checkRay.Y1.push(new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0, 4));

    }

    update(delta){
        //水平方向移动
        {
            this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
            this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
            console.log(Number(this.moveForward));
            this.direction.normalize(); // this ensures consistent movements in all directions
            let velocityXZMax = this.isRunning ? this.personOption.speedRun : this.personOption.speedWalk;

            if (this.moveForward || this.moveBackward) {
                let velocityZTmp = this.velocity.z + this.direction.z * velocityXZMax * this.personOption.accelerateRateStart;
                if (Math.abs(velocityZTmp) < velocityXZMax) {
                    this.velocity.z = velocityZTmp;
                } else {
                    this.velocity.z = this.direction.z * velocityXZMax;
                }
            } else {
                this.velocity.z = Math.abs(this.velocity.z) > 1 ? this.velocity.z * (this.personOption.accelerateRateStop) : 0;
            }

            if (this.moveLeft || this.moveRight) {
                let velocityXTmp = this.velocity.x + this.direction.x * velocityXZMax * this.personOption.accelerateRateStart;
                if (Math.abs(velocityXTmp) < velocityXZMax) {
                    this.velocity.x = velocityXTmp;
                } else {
                    this.velocity.x = this.direction.x * velocityXZMax;
                }
            } else {
                this.velocity.x = Math.abs(this.velocity.x) > 1 ? this.velocity.x * (this.personOption.accelerateRateStop) : 0;
            }

            let positionBeforeX = this.controls.getObject().position.x;
            let positionBeforeZ = this.controls.getObject().position.z;

            this.controls.moveForward(this.velocity.z * delta);
            this.controls.moveRight(this.velocity.x * delta);

            {//z轴碰撞检测
                let Z0Flat = undefined;//z负轴碰撞检测
                {
                    for (let i = 0; i < 6; i++) {
                        this.checkRay.Z0[i].ray.origin.copy(this.controls.getObject().position);//设置射线原点在摄像机位置，即人物眼睛位置
                        this.checkRay.Z0[i].ray.origin.x = positionBeforeX;//修正为移动前的x轴位置，防止使用位移后的位置检测墙壁
                    }
                    let rayMoveX = this.personOption.thickness / 2;
                    this.checkRay.Z0[0].ray.origin.x += rayMoveX;
                    this.checkRay.Z0[0].ray.origin.y -= (this.personOption.sightHeight - 0.05);
                    this.checkRay.Z0[1].ray.origin.x -= rayMoveX;
                    this.checkRay.Z0[1].ray.origin.y -= (this.personOption.sightHeight - 0.05);

                    this.checkRay.Z0[2].ray.origin.x += rayMoveX;
                    this.checkRay.Z0[2].ray.origin.y -= (this.personOption.sightHeight - this.personOption.height / 2);
                    this.checkRay.Z0[3].ray.origin.x -= rayMoveX;
                    this.checkRay.Z0[3].ray.origin.y -= (this.personOption.sightHeight - this.personOption.height / 2);

                    this.checkRay.Z0[4].ray.origin.x += rayMoveX;
                    this.checkRay.Z0[4].ray.origin.y += (this.personOption.height - this.personOption.sightHeight - 0.05);
                    this.checkRay.Z0[5].ray.origin.x -= rayMoveX;
                    this.checkRay.Z0[5].ray.origin.y += (this.personOption.height - this.personOption.sightHeight - 0.05);
                    for (let i = 0; i < 6; i++) {
                        let intersections = this.checkRay.Z0[i].intersectObjects(this.objects);
                        if (intersections.length > 0) {
                            let Z0NearFlatTmp = intersections[0].point.z;
                            Z0Flat = Math.max(Z0Flat === undefined ? Z0NearFlatTmp : Z0Flat, Z0NearFlatTmp);
                        }
                    }
                }
                let Z1Flat = undefined;//z正轴碰撞检测
                {
                    for (let i = 0; i < 6; i++) {
                        this.checkRay.Z1[i].ray.origin.copy(this.controls.getObject().position);//设置射线原点在摄像机位置，即人物眼睛位置
                        this.checkRay.Z1[i].ray.origin.x = positionBeforeX;
                    }
                    let rayMoveX = this.personOption.thickness / 2;
                    this.checkRay.Z1[0].ray.origin.x += rayMoveX;
                    this.checkRay.Z1[0].ray.origin.y -= (this.personOption.sightHeight - 0.05);
                    this.checkRay.Z1[1].ray.origin.x -= rayMoveX;
                    this.checkRay.Z1[1].ray.origin.y -= (this.personOption.sightHeight - 0.05);

                    this.checkRay.Z1[2].ray.origin.x += rayMoveX;
                    this.checkRay.Z1[2].ray.origin.y -= (this.personOption.sightHeight - this.personOption.height / 2);
                    this.checkRay.Z1[3].ray.origin.x -= rayMoveX;
                    this.checkRay.Z1[3].ray.origin.y -= (this.personOption.sightHeight - this.personOption.height / 2);

                    this.checkRay.Z1[4].ray.origin.x += rayMoveX;
                    this.checkRay.Z1[4].ray.origin.y += (this.personOption.height - this.personOption.sightHeight - 0.05);
                    this.checkRay.Z1[5].ray.origin.x -= rayMoveX;
                    this.checkRay.Z1[5].ray.origin.y += (this.personOption.height - this.personOption.sightHeight - 0.05);
                    for (let i = 0; i < 6; i++) {
                        let intersections = this.checkRay.Z1[i].intersectObjects(this.objects);
                        if (intersections.length > 0) {
                            let Z1NearFlatTmp = intersections[0].point.z;
                            Z1Flat = Math.min(Z1Flat === undefined ? Z1NearFlatTmp : Z1Flat, Z1NearFlatTmp);
                        }
                    }
                }
                let nextZ = this.controls.getObject().position.z;
                nextZ = Math.max(Z0Flat === undefined ? nextZ : (Z0Flat + this.personOption.thickness / 2 + 0.001), nextZ);
                nextZ = Math.min(Z1Flat === undefined ? nextZ : (Z1Flat - this.personOption.thickness / 2 - 0.001), nextZ);
                this.controls.getObject().position.z = nextZ
            }

            {//x轴碰撞检测
                let X0Flat = undefined;//x负轴碰撞检测
                {
                    for (let i = 0; i < 6; i++) {
                        this.checkRay.X0[i].ray.origin.copy(this.controls.getObject().position);//设置射线原点在摄像机位置，即人物眼睛位置
                        this.checkRay.X0[i].ray.origin.z = positionBeforeZ;
                    }
                    let rayMoveX = this.personOption.thickness / 2;
                    this.checkRay.X0[0].ray.origin.z += rayMoveX;
                    this.checkRay.X0[0].ray.origin.y -= (this.personOption.sightHeight - 0.05);
                    this.checkRay.X0[1].ray.origin.z -= rayMoveX;
                    this.checkRay.X0[1].ray.origin.y -= (this.personOption.sightHeight - 0.05);

                    this.checkRay.X0[2].ray.origin.z += rayMoveX;
                    this.checkRay.X0[2].ray.origin.y -= (this.personOption.sightHeight - this.personOption.height / 2);
                    this.checkRay.X0[3].ray.origin.z -= rayMoveX;
                    this.checkRay.X0[3].ray.origin.y -= (this.personOption.sightHeight - this.personOption.height / 2);

                    this.checkRay.X0[4].ray.origin.z += rayMoveX;
                    this.checkRay.X0[4].ray.origin.y += (this.personOption.height - this.personOption.sightHeight - 0.051);
                    this.checkRay.X0[5].ray.origin.z -= rayMoveX;
                    this.checkRay.X0[5].ray.origin.y += (this.personOption.height - this.personOption.sightHeight - 0.051);
                    for (let i = 0; i < 6; i++) {
                        let intersections = this.checkRay.X0[i].intersectObjects(this.objects);
                        if (intersections.length > 0) {
                            let X0NearFlatTmp = intersections[0].point.x;
                            X0Flat = Math.max(X0Flat === undefined ? X0NearFlatTmp : X0Flat, X0NearFlatTmp);
                        }
                    }
                }
                let X1Flat = undefined;//x正轴碰撞检测
                {
                    for (let i = 0; i < 6; i++) {
                        this.checkRay.X1[i].ray.origin.copy(this.controls.getObject().position);//设置射线原点在摄像机位置，即人物眼睛位置
                        this.checkRay.X1[i].ray.origin.z = positionBeforeZ;
                    }
                    let rayMoveX = this.personOption.thickness / 2;
                    this.checkRay.X1[0].ray.origin.z += rayMoveX;
                    this.checkRay.X1[0].ray.origin.y -= (this.personOption.sightHeight - 0.05);
                    this.checkRay.X1[1].ray.origin.z -= rayMoveX;
                    this.checkRay.X1[1].ray.origin.y -= (this.personOption.sightHeight - 0.05);

                    this.checkRay.X1[2].ray.origin.z += rayMoveX;
                    this.checkRay.X1[2].ray.origin.y -= (this.personOption.sightHeight - this.personOption.height / 2);
                    this.checkRay.X1[3].ray.origin.z -= rayMoveX;
                    this.checkRay.X1[3].ray.origin.y -= (this.personOption.sightHeight - this.personOption.height / 2);

                    this.checkRay.X1[4].ray.origin.z += rayMoveX;
                    this.checkRay.X1[4].ray.origin.y += (this.personOption.height - this.personOption.sightHeight - 0.05);
                    this.checkRay.X1[5].ray.origin.z -= rayMoveX;
                    this.checkRay.X1[5].ray.origin.y += (this.personOption.height - this.personOption.sightHeight - 0.05);
                    for (let i = 0; i < 6; i++) {
                        let intersections = this.checkRay.X1[i].intersectObjects(this.objects);
                        if (intersections.length > 0) {
                            let X1NearFlatTmp = intersections[0].point.x;
                            X1Flat = Math.min(X1Flat === undefined ? X1NearFlatTmp : X1Flat, X1NearFlatTmp);
                        }
                    }
                }
                let nextX = this.controls.getObject().position.x;
                nextX = Math.max(X0Flat === undefined ? nextX : (X0Flat + this.personOption.thickness / 2 + 0.001), nextX);
                nextX = Math.min(X1Flat === undefined ? nextX : (X1Flat - this.personOption.thickness / 2 - 0.001), nextX);
                this.controls.getObject().position.x = nextX
                // console.log(Z0Flat,Z1Flat,X0Flat,X1Flat)
            }
            // console.log(this.controls.getObject().position.x,this.controls.getObject().position.y,this.controls.getObject().position.z)
        }
        //垂直方向移动+碰撞检测
        {
            let bottomFlatY = undefined;
            //坠落四角检测
            {
                for (let i = 0; i < 4; i++) {
                    this.checkRay.Y0[i].ray.origin.copy(this.controls.getObject().position);//设置射线原点在摄像机位置，即人物眼睛位置
                }
                let rayMove = this.personOption.thickness / 2;
                this.checkRay.Y0[0].ray.origin.x += rayMove;
                this.checkRay.Y0[0].ray.origin.z -= rayMove;
                this.checkRay.Y0[1].ray.origin.x += rayMove;
                this.checkRay.Y0[1].ray.origin.z += rayMove;
                this.checkRay.Y0[2].ray.origin.x -= rayMove;
                this.checkRay.Y0[2].ray.origin.z += rayMove;
                this.checkRay.Y0[3].ray.origin.x -= rayMove;
                this.checkRay.Y0[3].ray.origin.z -= rayMove;
                for (let i = 0; i < 4; i++) {
                    let intersections = this.checkRay.Y0[i].intersectObjects(this.objects);
                    if (intersections.length > 0) {
                        let bottomFlatYTmp = intersections[0].point.y;
                        bottomFlatY = Math.max(bottomFlatY === undefined ? bottomFlatYTmp : bottomFlatY, bottomFlatYTmp);
                    }
                }
            }
            //头顶四角检测
            let topFlatY = undefined;
            {
                for (let i = 0; i < 4; i++) {
                    this.checkRay.Y1[i].ray.origin.copy(this.controls.getObject().position);//设置射线原点在摄像机位置，即人物眼睛位置
                }
                let rayMove = this.personOption.thickness / 2 - 0.01;
                this.checkRay.Y1[0].ray.origin.x += rayMove;
                this.checkRay.Y1[0].ray.origin.z -= rayMove;
                this.checkRay.Y1[1].ray.origin.x += rayMove;
                this.checkRay.Y1[1].ray.origin.z += rayMove;
                this.checkRay.Y1[2].ray.origin.x -= rayMove;
                this.checkRay.Y1[2].ray.origin.z += rayMove;
                this.checkRay.Y1[3].ray.origin.x -= rayMove;
                this.checkRay.Y1[3].ray.origin.z -= rayMove;
                for (let i = 0; i < 4; i++) {
                    let intersections = this.checkRay.Y1[i].intersectObjects(this.objects);
                    if (intersections.length > 0) {
                        let topFlatYTmp = intersections[0].point.y;
                        topFlatY = Math.min(topFlatY === undefined ? topFlatYTmp : topFlatY, topFlatYTmp);
                    }
                }
            }
            //无碰撞时下次垂直位置(相机位置)
            let nextY = this.controls.getObject().position.y + (this.velocity.y * delta);
            if (topFlatY !== undefined) {
                if (nextY > topFlatY - (this.personOption.height - this.personOption.sightHeight)) {
                    nextY = topFlatY - (this.personOption.height - this.personOption.sightHeight)
                    this.velocity.y = 0;
                }
            }
            if (bottomFlatY !== undefined) {
                //下方检测到平台时，脚部不能低于最低平台
                this.controls.getObject().position.y = Math.max(bottomFlatY + this.personOption.sightHeight, nextY);
                if (nextY > bottomFlatY + this.personOption.sightHeight) {
                    this.velocity.y -= this.worldOption.g * Math.sqrt(delta);
                } else {
                    this.velocity.y = 0;
                    this.canJump = true;
                }
            } else {
                //下方未检测到平台时
                this.controls.getObject().position.y = nextY;
                this.velocity.y -= this.worldOption.g * Math.sqrt(delta);
            }
        }
        if (this.controls.getObject().position.y < -500) {
            this.controls.getObject().position.set(0,4,0);
        }
    }
}
export {MCFirstPersonControls}