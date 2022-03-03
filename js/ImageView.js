const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default function ImageView({ app, initialState }) {
  this.state = initialState;
  this.target = document.createElement("div");
  this.target.className = "Modal Image";

  app.appendChild(this.target);

  this.setState = (nextState) => {
    this.state = nextState;
    if (nextState) {
      this.render();
    }
  };

  this.render = () => {
    //this.target.innerHTML = `<div class="content">${this.state ? </div>`;
    const content = document.createElement("div");
    content.setAttribute("class", "content");
    const img = document.createElement("img");
    img.setAttribute("src", `${IMAGE_PATH_PREFIX}${this.state}`);

    content.appendChild(img);
    this.target.appendChild(content);
    this.target.style.display = this.state ? "block" : "none";
  };

  this.render();
}
