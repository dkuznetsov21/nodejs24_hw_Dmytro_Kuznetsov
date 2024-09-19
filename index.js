//Дана строка "Node.js course". Виведіть в консоль довжину цієї строки.

const string = 'Node.js course';

console.log('Node.js course: string length', string.length)

/** Дано число 33. Напишіть функції що приймає на вхід дане число та видає це число
 помножене на 2 стільки разів, з скількох символів складається число.
 Підказка: Для числа 33 це 2 рази (число складається із двох символів). **/

function mathFunc(number) {
    const numberLength = String(number).length;

    for (let i = 0; i < numberLength; i++) {
        number *= 2;
    }

    console.log(number);
}

mathFunc(5674);