import { Application, Graphics } from "pixi.js"

export default class GameObject {
    public graphics:Graphics = new Graphics();
    public slots: Graphics[][] = [];

    private screenWidth = 100;
    private screenHeight = 100;
    private tiles = 3;
    constructor() {
        
    }

    
    /*
    *
    *
    */
    public DrawTicTacToeSlot()
    {
        //分格子
        let widthPart = this.screenWidth/this.tiles;
        let heightPart = this.screenHeight/this.tiles;
        let color = 0x777777;
        for(let y = 0 ; y < this.tiles ; y++)
        {
            let lineHead:Graphics[] = []; 
            this.slots.push(lineHead);
            for(let x = 0 ; x < this.tiles ; x++)
            {
                let slot = new Graphics();
                slot.beginFill(color);
                //位移
                slot.drawRect(x*widthPart,y*heightPart,widthPart-1,heightPart-1);
                slot.interactive = true;
                slot.buttonMode = true;
                this.slots[y].push(slot);
                //點下去先提醒這是第幾塊地
                slot.on('pointerdown',()=>{
                    console.log(x,y);
                });
                lineHead.push(slot);
            }
        }
    }

    //畫線
    public DrawTicTacToeLine()
    {
        //用格數分成三等分
        let widthPart:number = this.screenWidth / this.tiles;
        let heightPart:number = this.screenHeight / this.tiles;
        let color:number = 0xFFFFFF;
        for(let i = 1 ; i < this.tiles ; i++)
        {
            this.graphics.beginFill(color);
            this.graphics.drawRect(0, heightPart * i, widthPart * this.tiles, 1);
            this.graphics.drawRect(widthPart * i, 0, 1, heightPart * this.tiles);
        }
        this.graphics.endFill();
    }
    public render(app:Application)
    {
        this.DrawTicTacToeSlot();
        this.DrawTicTacToeLine();
        this.slots.forEach(slotColumn => {
            slotColumn.forEach(slot =>{
                app.stage.addChild(slot);
            })
        });
        app.stage.addChild(this.graphics);
    }

}