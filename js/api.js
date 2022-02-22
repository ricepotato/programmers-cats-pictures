class CatsApi {
  constructor() {
    this.baseUrl =
      "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";
  }

  async getCats(cb) {
    try {
      const response = await fetch(`${this.baseUrl}/`);
      const data = await response.json();
      cb(data);
    } catch (e) {
      console.warn(e);
      alert("고양이 목록 가져오기 에러");
    }
  }

  async getCatById(id, cb) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const data = await response.json();
      cb(data);
    } catch (e) {
      console.warn(e);
      alert("고양이 목록 가져오기 에러");
    }
  }
}

class FakeCatsApi {
  constructor() {}

  async getCats(cb) {
    try {
      const data = [
        {
          id: "1",
          name: "노란고양이",
          type: "DIRECTORY",
          filePath: null,
          parent: null,
          parent: null,
        },
        {
          id: "3",
          name: "까만고양이",
          type: "DIRECTORY",
          filePath: null,
          parent: null,
        },
        {
          id: "10",
          name: "고등어무늬 고양이",
          type: "DIRECTORY",
          filePath: null,
          parent: null,
        },
        {
          id: "13",
          name: "삼색이 고양이",
          type: "DIRECTORY",
          filePath: null,
          parent: null,
        },
        {
          id: "14",
          name: "회색고양이",
          type: "DIRECTORY",
          filePath: null,
          parent: null,
        },
        {
          id: "20",
          name: "하얀고양이",
          type: "DIRECTORY",
          filePath: "/images/20201218_002047.jpg",
          parent: null,
        },
      ];
      cb(data);
    } catch (e) {
      console.warn(e);
      alert("고양이 목록 가져오기 에러");
    }
  }

  async getCatById(id, cb) {
    const data = {
      1: [
        {
          id: "5",
          name: "2021/04",
          type: "DIRECTORY",
          filePath: null,
          parent: {
            id: "1",
          },
        },
        {
          id: "19",
          name: "물 마시는 사진",
          type: "FILE",
          filePath: "/images/a2i.jpg",
          parent: {
            id: "1",
          },
        },
      ],
      5: [
        {
          id: "2",
          name: "2021/04/12",
          type: "DIRECTORY",
          filePath: null,
          parent: {
            id: "5",
          },
        },
      ],
      2: [
        {
          id: "8",
          name: "1",
          type: "FILE",
          filePath: "/images/1.jpg",
          parent: {
            id: "2",
          },
        },
        {
          id: "9",
          name: "2",
          type: "FILE",
          filePath: "/images/2.jpg",
          parent: {
            id: "2",
          },
        },
      ],
    };
    cb(data[id]);
  }
}
