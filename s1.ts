class shape {
    info(): string {
        return "This is a Shape"
    }
    draw(): string {
        return "drawing a shape"
    }
    renderShapes(arr: shape[]): void {
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i].draw())
        }
    }
}
class square extends shape {
    width: number;
    constructor(width: number) {
        super()
        this.width = width;
    }
    getArea(): number {
        return this.width * this.width
    }
    info(): string {
        return "This is a square"
    }
    draw(): string {
        return "drawing a square"
    }
}
class Coloredsquare extends square {
    color: string
    constructor(width: number, color: string) {
        super(width)
        this.color = color;
    }
    info(): string {
        return `This is a square in color ${this.color}`
    }
    draw(): string {
        return "drawing a Coloredsquare"
    }
}
class rectangle extends square {
    height: number;
    constructor(width: number, height: number,) {
        super(width)
        this.height = height;
    }
    draw(): string {
        return "drawing a rectangle"
    }
}