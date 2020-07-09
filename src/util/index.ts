const allCapsAlpha: string[] = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const allLowerAlpha: string[] = [..."abcdefghijklmnopqrstuvwxyz"];
const allUniqueChars: string[] = [..."~!@#$%^&*()_+-=[]{}|;:'\",./<>?"];
const allNumbers: string[] = [..."0123456789"];

const extentedBase = [
  ...allCapsAlpha,
  ...allNumbers,
  ...allLowerAlpha,
  ...allUniqueChars,
];
const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha];

export const wordGenerator = (len: number, unique: boolean): string => {
  if (unique)
    return [...Array(len)]
      .map(() => extentedBase[(Math.random() * extentedBase.length) | 0])
      .join("");

  return [...Array(len)]
    .map(() => base[(Math.random() * base.length) | 0])
    .join("");
};

export const stringGenerator= (len: number, mix: boolean): string => {
  if(mix)
  return [...Array(len)]
    .map(() => wordGenerator(Math.floor(Math.random() * 7)+2,Math.random() >= 0.8))
    .join(" ");

    return [...Array(len)]
    .map(() => wordGenerator(Math.floor(Math.random() * 7)+2,false))
    .join(" ");
};

export const randomArrayElement= (array: Array<unknown>): any => {
  
  return array[Math.floor(Math.random()*array.length)];
};

export const getrandomBoolean=(probabilty: number): boolean=>{

  return Math.random()>=probabilty;
};

