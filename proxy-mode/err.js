/*
* 两个数组取交集的方法
*/
let arr1 = [1, 2, 2, 3];
let arr2 = [2, 2];
const mixedOfArr = function (arr1, arr2) {
    let n = 0;
    let result = [];
    // 创建新数组
    // 拷贝新数组待用
    let arr1New = arr1.slice();
    let arr2New = arr2.slice();
    return function () {
        n++;
        let a1 = arr1New[0];//每次取数组第一个
        let index = arr2New.indexOf(a1);//获取在第二个数组中的下标
        if (index > -1) {
            // 第二个数组中若存在
            result.push(a1);
            //删除第二个数组中存在的元素
            arr2New.splice(index, 1);
        }
        //删除第一个数组中遍历过的元素
        arr1New.splice(0, 1);
        if (arr1New.length == 0 || arr2New.length == 0) {
            arr1New = null;
            arr2New = null;
            //若其中一个数组遍历完，则返回数据
            // return result;
        } else {
            // 否则递归
            arrOf();
        }
        return result;
    }
}

// debugger
let arrOf = mixedOfArr(arr1, arr2);
console.log(arrOf());
