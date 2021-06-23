export enum Color {
    RED = '#cd5c5c',
    YELLOW = '#dfdf80',
    GREEN = '#688556',
    BLUE = '#587498'
}

export const randomColor = () => {
    return Object.values(Color)[Math.floor(Math.random() * 4)] as Color;
};

export const nextColor = (color: Color) => {
    const values = Object.values(Color);
    return values[(values.indexOf(color) + 1) % (values.length)];
};
