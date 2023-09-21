/* eslint-disable @typescript-eslint/no-explicit-any */
import { MentionItem } from "./mention-list-ref";

function random(randomLength: number, prefix?: string) {
  // 兼容更低版本的默认值写法
  prefix === undefined ? (prefix = "") : prefix;
  randomLength === undefined ? (randomLength = 8) : randomLength;

  // 设置随机用户名
  // 用户名随机词典数组
  const nameArr = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "g",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
  ];
  // 随机名字字符串
  let name = prefix;
  // 循环遍历从用户词典中随机抽出一个
  for (let i = 0; i < randomLength; i++) {
    // 随机生成index
    const index = Math.floor(Math.random() * 2);
    const zm =
      nameArr[index][Math.floor(Math.random() * nameArr[index].length)];
    // 拼接进名字变量中
    name += zm;
  }
  // 将随机生成的名字返回
  return name;
}

export const userSuggestions = (): MentionItem[] => {
  const max = 20;
  const users: MentionItem[] = [];
  for (let i = 0; i < max; i++) {
    const username = random(8);
    users.push({
      code: random(4, "code"),
      category: "user",
      label: username,
      image: "https://via.placeholder.com/240x240.png/0077ee?text=" + username,
    });
  }

  return users;
};

export const documentSuggestions = (): MentionItem[] => {
  const max = 20;
  const users: MentionItem[] = [];
  for (let i = 0; i < max; i++) {
    const username = random(8);
    users.push({
      code: random(4, "code"),
      category: "document",
      label: username,
      image: "https://via.placeholder.com/240x240.png/0077ee?text=" + username,
    });
  }

  return users;
};
