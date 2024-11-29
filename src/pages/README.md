# Cell Growth Simulator

This application simulates culturing a **single square** Petri dish (sorry hardcore biology majors) inoculated with microbial organisms of the user's choice.

The user can control the lifespan, division time, and division *failure* rate (not success rate) of the cells to inoculate the dish with. Once started, the dish animation can be paused, and if the user wishes, reset.

## Customization
Lifespan and division time can be customized to a resolution of 0.1 seconds. The default value is 1 second, and the arrow buttons in the input boxes will increase/decrease the value by 0.1. Division failure rate can be customized to a resolution of 0.0001, or 0.01%. The default value is 0, and the arrow button will increase/decrease by 0.0001. Upon refreshing/reloading the application, all values will return to default.

## Inoculation and Removal
Inoculation is done by spawning a single cell on a single click. The user cannot streak cells across the dish, nor can the user move preexisting cells. The user may choose to inoculate the dish with further cells during the animation. These additional cells may be customized differently from the initial cells.

Alternatively, the user may choose to *remove* cells, either during initial inoculation or during the animation. This can be done via right-clicking on the cell in question.

## Technical Details of a Reset
Resetting the dish means that all cells will be removed and the animation will stop. The customization controls will remain as the user last set them.


# Component Structure

The application is controlled by the overall `Sim` component in the cellGrowthSim.tsx file. The `Sim` initializes the `Renderer`, the `Grid`, and the drawing `context`. The `Grid` and `context` are given to the `Renderer` that draws `Cell`s onto the canvas. The `Sim` also keeps track of `mouse` position (`moveMouse`) and cell customization `controls` (`adjust`). It accepts the user's clicks and updates the UI. constants.tsx stores application wide configuration details (`Settings`), numbers regularly used during testing (`Test`), and semantics for what would otherwise be magic numbers in the division direction algorithm (`Directions`).

## Renderer
The `Renderer` runs at the speed of your computer's display refresh rate. Most commonly, this is 60 fps. It stores the `Grid` state and the drawing `context`. During continuous animation, `animate` keeps track of how much time has passed between frames, so that it can tell the `Grid` to update the time of every `Cell`'s state by that amount. After telling the `Grid` to `update`, the `Renderer` calls `frame` to render the update. `frame` clears the canvas, then scans row by row, gathering as many horizontally contiguous `Cell`s as possible into `fillRect` calls that draw lines rather than individual dots.

`animate` and `frame` are different so that the `Sim` can use `frame` display the user's clicks without changing the `Grid` state. The `Renderer` stores `prevFrameTime` so that after pausing, the animation can be played from *where it left off* instead of skipping by the amount of time it was paused for. `prevFrameId` is for actually stopping the animation for pausing and resetting.

## Grid
The `Grid` manages the data in the Petri dish. The dish is represented by a nested array (`cells`). During continuous animation, `update` tells each `Cell` to `update` its `time` by the amount of time that has passed since the last update (`deltaTime`). If the `Cell` gives a `status` signal, then either the `Cell` wants to die or the cell wants to divide. If the `Cell` wants to die, `null` is assigned to its location. If the `Cell` wants to divide, we randomize a location among the available locations. The new `Cell` is temporarily put into another data structure (`new_cells`) before being put into `cells` once we have finished processing the entire nested array so that the rest of the loop doesn't process it.

The user's left- and right-clicks access `createCell` and `deleteCell` respectively. `createCell` assigns a `Cell` to the specified location, passing cell details to the `Cell` constructor. `deleteCell` assigns `null` to the specified location. Resetting the dish access `clear` to assign `null` to every location.

## Cell
Cells in the dish are represented by `Cell`. Each `Cell` keeps track of how long it has lived for (`time`), how many times it has tried to divide (`cycle`), its `lifespan`, the time it needs to divide (`divTime`), and its division failure rate (`divFailRate`). On an `update`, it first decides whether or not it wants to die. If it does, it sends the death signal. If not, it then decides whether or not it is eligible to attempt to divide. If it is, it attempts to divide, and if successful, it sends the division signal. If the cell is either ineligible to divide or fails to divide, it sends no signal.

# Assumptions
During an attempted division, if there is no available location for a `Cell` to put its daughter `Cell`, the signal is effectively ignored. No attempt is made to create room by forcefully shoving `Cell`s away from the location.

The `Grid` does one loop through the entire nested array, so if:
 1. `Cell` A wants to die,
 2. another `Cell` B to the immediate right or bottom of it wants to divide,
 3. and B does not have any available locations,

then A will die, and *during the same loop*, B will divide and put its daughter `Cell` in the same location that A died in. If, however, B were to be towards the top or left of A, then B *would not divide* because it was processed before A.

The fact that a `Cell` checks first for death, then for division, means that if a `Cell` wants to both die and divide at the same time, it will die. This happens when `lifespan` is an integer multiple of `divTime`. In such a case, the `Cell` will *not* divide for that last stretch of time immediately before it dies.
