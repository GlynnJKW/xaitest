import { Vector3, Group } from "three";

export default class Layout{
    constructor(rows, columns = 1, stacks = 1){
        this.layers = [];
        this.rows = rows;
        this.columns = columns;
        this.stacks = stacks;
        this.group = new Group();
        this._total = rows * columns * stacks;
        this._current = 0;
        this._spacing = new Vector3(1,1,1);
    }

    addLayer(){
        for(let i = 0; i < arguments.length; ++i){
            this._addLayer(arguments[i]);
        }
        return this
    }

    _addLayer(layer){
        if(this._current < this._total){
            this.layers.push(layer);
        }
        else{
            console.error("not enough space in layout to add layer")
        }
        return this;
    }
    
    clearLayout(){
        this.layers = [];
        return this;
    }

    setLayout(rows, columns = 1, stacks = 1){
        this.rows = rows;
        this.columns = columns;
        this.stacks = stacks;
        return this;
    }

    setSpacing(x, y, z){
        this._spacing.set(x,y,z);
        return this;
    }

    apply(){
        let row = 0;
        let col = 0;
        let sta = 0;
        for(let i = 0; i < this._total; ++i){
            this.group.add(this.layers[i]);
            this.layers[i].position.set(row * this._spacing.x, col * this._spacing.y, sta * this._spacing.z);
            if(++row >= this.rows){
                row = 0;
                if(++col >= this.columns){
                    col = 0;
                    ++sta;
                }
            }
        }
        return this;
    }

    getCenter(){
        let a = new Vector3(this._spacing.x * (this.rows - 1) / 2,
                        this._spacing.y * (this.columns - 1) / 2,
                        this._spacing.z * (this.stacks - 1) / 2);
        return a;
    }

    moveToCenter(){
        let trans = this.getCenter();
        this.group.position.set(-trans.x, -trans.y, -trans.z);
        return this;
    }
}