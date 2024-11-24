import { useRef, useEffect } from "react"
import Grid from "./grid"

interface DishProps {
    interact: (
        e: React.MouseEvent<HTMLCanvasElement>,
        grid: Grid,
        location: number[]
    ) => void
    mouse: number[]
    grid: Grid
    move_mouse: (e: React.MouseEvent<HTMLCanvasElement>) => void
}

const Dish = ({ interact, mouse, grid, move_mouse }: DishProps) => {
    let canvas_ref = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        let ctx = canvas_ref.current!.getContext("2d")
        ctx!.fillStyle = "green"
        grid.set_ctx(ctx!)
    }, [canvas_ref])
    function convert(e: React.MouseEvent<HTMLCanvasElement>) {
        let rect = canvas_ref.current!.getBoundingClientRect()
        let x = mouse[0] - rect.left
        let y = mouse[1] - rect.top
        return [x, y]
    }
    return (
        <canvas ref={canvas_ref} width={400} height={400} onMouseMove={move_mouse} onContextMenu={(e) => { interact(e, grid, convert(e)) }} onClick={(e) => { interact(e, grid, convert(e)) }}>
        </canvas>
    )
}

export default Dish