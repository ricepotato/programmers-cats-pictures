const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default function ImageView({ app, initialState, onClick }) {
  this.state = initialState;
  this.target = document.createElement("div");
  this.target.className = "Modal Image";
  this.onClick = onClick;

  app.appendChild(this.target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state) {
      this.target.innerHTML = `<div class="content"><img style="width:100%;" src="${IMAGE_PATH_PREFIX}${this.state}" /></div>`;
    }
    this.target.style.display = this.state ? "block" : "none";
  };

  this.target.addEventListener("click", this.onClick);

  this.render();
}
