let any: any = "";
let str: string = "123";
console.log(str);
// 想要undefined类型和null类型互相赋值 就要把tsconfig里面的严格类型关闭  strict 就是严格类型
let u: undefined = undefined;
let v: void = null;
let str1: string = "123";
// 不能将void类型赋值给其他类型
// str = u
// str1 = u
let n: null = null;

n = u;

// unknown类型不能调用方法或者属性
// let unknown:unknown = {a:123}
// let unknown:unknown = {a:():number=>123}
// unknown['a']

// unknown类型如果想要被赋值 必须赋值类型是any类型或者unknown类型
let unknown: unknown = "123";
let unknown2: unknown = "234";
unknown = unknown2;
unknown = any;

// Object、object、{}的区别
//1、Object 在原型链顶端 就是Object类型 相当于any类型在ts里 可以赋值各种类型
let obj: Object = 123;
obj = () => {};
obj = "123";
obj = [];
//2、object 表示非原始类型的各种类型
// let obj1:object = '123' //报错
// let obj2:object = 123//报错
// let obj3:object = false//报错
// let obj4:object = Symbol('123')//报错
// let obj5:object = {} //正常
// let obj6:object = ()=>{}//正常
// let obj7:object = []//正常
// 3、{} 可以理解为new Object 也可以赋值各种类型  但是{}赋值对象类型没办法修改
let obj1: {} = 123;
obj1 = () => {};
obj1 = "123";
obj1 = [];
obj1 = { obj: 111 };
// obj1.b = 222   //报错 {}不可以修改 只有初始值

// interface 接口
interface A {
  name: "111";
}
interface A {
  age: 222;
}
// 如果两个interface重名的话 会合并在一块，所以这里要加两个key一个name一个age
let interfaceObj: A = {
  name: "111",
  age: 222,
};
// 接口相关属性
interface Interface {
  readonly name: string; //只读
  age?: number; //可选
  [propName: string]: any; //任意属性 value的类型不仅可以使用any还可以使用其他类型 any是防止对象里类型太多，方便
  fn(): void;
}
let interface: Interface = {
  name: "111",
  fn: (): string => {
    return "123";
  },
};
// 接口继承 extends 如果继承多个接口用,分开
interface B {
  sex: string;
}
interface C {
  address: string;
}
interface D extends B, C {
  school: string;
}
let d: D = {
  sex: "111",
  school: "11",
  address: "string",
};
// 数组类型
let numArr: number[] = [1, 2, 3];
let strArr: string[] = ["1", "2", "3"];
let genericNumArr: Array<number> = [1, 2, 3];

// 通过接口去描述数组
interface numberArr {
  [index: number]: number;
}
let numberInt: numberArr = [1, 2, 3, 4];

// 类数组
function fn(...args) {
  console.log(Array.prototype.slice.call(arguments));
  console.log(Array.from(arguments)); //es6新增方法
  let arr: IArguments = arguments;
  console.log(arr);
}
fn(1, 2, 3);

// 函数
const fn1 = function (name: string, age: number): string {
  return name + age;
};
console.log(fn1("刘雨鑫", 10000));

// 重载函数 重载函数如果想要导出  必须全部导出 export
function reloadFn(params: number): void;
function reloadFn(params: number, params2: number): void;
function reloadFn(params: any, params2?: any): any {
  console.log(params);
  console.log(params2);
}
reloadFn(1, 2);

// 联合类型 交叉类型 |代表联合类型 &代表交叉类型
let numStr: number | string = "1";

// 交叉类型
interface People {
  name: string;
  age: number;
}
interface Liu {
  sex: string;
}
const lyx = function (params: People & Liu): void {
  console.log(params.age);
  console.log(params);
};
lyx({ name: "刘雨鑫", age: 23, sex: "男" });
// 类型断言 只能欺骗编译器 让编译器不会在运行前报错，但是无法避免实际运行时出现的问题 as和<>都是类型断言的两种实现方法
let assertFn = function (num: number | string): void {
  console.log((num as string).length);
  console.log((<string>num).length);
};
let fn2 = function (params: People | Liu): void {
  console.log((<Liu>params).sex);
};

// 内置类型 正则、时间、错误类型
const regexp: RegExp = /^[0-9]+$/;
const date: Date = new Date();
const error: Error = new Error("111");

// class 类  public在内部外部都可以访问  private只能在内部访问  protected内部和子类中访问
class Person {
  name: string;
  private age: number;
  protected sex: string;
  constructor(name: string, age: number, sex: string) {
    this.name = name;
    this.age = age;
    this.sex = sex;
  }
}
const liuYuXin = new Person("刘雨鑫", 23, "男");
console.log(liuYuXin);

// 子类继承父类 能访问到sex 因为sex是protected类型的
class Man extends Person {
  constructor() {
    super("刘雨鑫", 24, "男");
    this.sex = "男";
  }
}

// implements class类的实现 可以通过implements去约束类
interface InterfacePerson1 {
  run(type: boolean): boolean;
}
interface InterfacePerson1 {
  run2(): void;
}
class P1 implements InterfacePerson1, InterfacePerson1 {
  run(type: boolean): boolean {
    return type;
  }
  run2() {}
}

type a<T> = T extends boolean ? "Y" : "N";
type b = a<string>;
type c = a<boolean>;
type MyExclude<T, U> = T extends U ? never : T;
type d = "a" | "b" | "c";
type e = "a" | "b";
type f = MyExclude<d, e>;

type FunctionProtoName<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type NoFunctionProtoName<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionProtoName<T>>;
type NoFunctionProperties<T> = Pick<T, NoFunctionProtoName<T>>;
interface User {
  name: string;
  fn(bbb: string): void;
  b(): void;
}
type g = FunctionProtoName<User>;
type h = FunctionProperties<User>;

type Ng = NoFunctionProtoName<User>;
type Nh = NoFunctionProperties<User>;
function foo(aaa: string): number {
  return 0;
}
type GetFnReturn<T> = T extends (...args: any[]) => infer U ? U : T;
type GetFnParams1<T> = T extends (...args: infer R) => {} ? R : never;
type GetObjValueType<T> = T extends { id: infer U; name: infer R } ? [U, R] : T;
type NewGetObjValueType<T> = {
  [K in keyof T]: T[K];
};
const obj111 = {
  id: "111",
  age: 222,
  address: "",
};
// type z = Pick<typeof obj,'age'>
type ccc = Omit<typeof obj111, "age">;
// type MyOmit<T,K extends keyof any> = Pick<T,Exclude<keyof T,K>>
// type TestMyOmit = MyOmit<typeof obj,'id'>
// type II = GetObjValueType<typeof obj>
// type III = NewGetObjValueType<typeof obj>
type I = GetFnReturn<typeof foo>;
type XXX1 = GetFnParams1<typeof foo>;
const symbolKey = Symbol("key");
interface X {
  aaa: string;
  bbb: string;
  ccc: string;
  symbolKey: string;
}
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: T[K];
};
type XXX = Getters<X>;

type Direction = "left" | "right" | "top" | "bottom";
type InferRoot<T> = T extends `${infer R}${Capitalize<Direction>}` ? R : T;
type GetInfer = InferRoot<"marginLeft">;

const arr = ["1", "2", "3", "4"] as const;
type zzz<T extends readonly (string | number | symbol)[]> = {
  [P in T[number]]: P;
};
type zzArr = zzz<typeof arr>;
type Equal<T, U> = T extends U ? (U extends T ? true : false) : false;
type IsTrue = Equal<1111, 1111>;
// type FirstArr<T extends any[]> = T[0] extends [] ? never : T[0]
// type FirstArr<T extends any[]> = T['length'] extends 0 ? never : T[0]
// type FirstArr<T extends any[]> = T[0] extends T[number] ? T[0] : never;
type FirstArr<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First
  : never;
// 数组 取length 是长度 type类型是number  但是元组取长度  是具体的长度 是字面量形式

type MyAwaited<T extends Promise<any>> = T extends Promise<infer X>
  ? X extends Promise<any>
    ? MyAwaited<X>
    : X
  : never;
type If<T extends boolean, U, K> = T extends true ? U : K;
type IfString = If<true, "aaa", "bbb">;
// type IsNull = If<null,'aaa','bbb'> // null报错的话是因为ts开了严格模式  因为上面的泛型定义了类型规范 继承布尔值 如果没有开启严格模式  null是继承布尔值的
type MyConcat<T, U> = T extends any[]
  ? U extends any[]
    ? [...T, ...U]
    : [...T, U]
  : U extends any[]
  ? [T, ...U]
  : [T, U];
type EasyConcat<T extends unknown[], U extends unknown[]> = [...T, ...U];
type List = MyConcat<[], [3333]>;
type EasyList = EasyConcat<[123], [3333]>;
type First<T extends unknown[]> = T extends [infer R, ...infer Rest]
  ? R
  : never;
type Last<T extends unknown[]> = T extends [...infer Rest, infer R] ? R : never;
type ArrFirst = First<[1, 2, 3]>;
type ArrLast = Last<[1, 2, 3]>;
type MyIncludes<T extends unknown[], U> = T extends [infer First, ...infer Rest]
  ? Equal<First, U> extends true
    ? true
    : MyIncludes<Rest, U>
  : false;
type IncludesArray = MyIncludes<[1, 2, 3, 4], 8>;

type Push<T extends unknown[], U> = [...T, U];
type UnShift<T extends unknown[], U> = [U, ...T];
type PushArr = Push<[1, 2, 3], 4>;
type UnShiftArr = UnShift<[1, 2, 3], 4>;
type FnParams<T extends (...args: any[]) => any> = T extends (
  ...args: infer R
) => {}
  ? R
  : never;
type FnReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;
type GetFnParams = FnParams<typeof foo>;
type GetFnReturnType = FnReturnType<typeof foo>;

type LengthOfString<T extends string> = T["length"];
type Length = LengthOfString<"222">;

type MyReadonly<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[K];
} & {
  [X in Exclude<keyof T, K>]: T[X];
};
interface MyReadonlyInt {
  readonly name: string;
  age: number;
  address: string;
}
type MyReadonly2 = MyReadonly<MyReadonlyInt, "age">;

type Xxx = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
    };
  };
};
type Primitive = string | number | boolean;
type DeepReadonly<T> = keyof T extends never
  ? T
  : { readonly [k in keyof T]: DeepReadonly<T[k]> };
type MyDeepObjData = DeepReadonly<Xxx>;

type TupleToUnion<T extends any[]> = T extends (infer R)[] ? R : never;
type Tuple = TupleToUnion<[123, "456", true]>;

type LastArray<T extends unknown[]> = T extends [...any[], infer R] ? R : never;
type LastArrayData = LastArray<[1, 2, 3, 34]>;

type MyPoP<T extends any[]> = T extends [...infer R, any] ? R : never;
type MyPoPData = MyPoP<[1, 2, 3, 34]>;

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve("23")] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{ [key in keyof T]: T[key] extends Promise<infer R> ? R : T[key] }>;
type Prmise1 = typeof promiseAllTest2;
