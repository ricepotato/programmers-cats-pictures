const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default function Nodes({ app, initialState, onClick, onBackClick }) {
  this.state = initialState;
  this.target = document.createElement("ul");
  this.target.className = "Nodes";
  app.appendChild(this.target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE"
              ? `${IMAGE_PATH_PREFIX}${node.filePath}`
              : "./assets/directory.png";
          return `<div class="Node" data-node-id="${node.id}"><img data-node-id="${node.id}" src="${iconPath}"><div>${node.name}</div></div>`;
        })
        .join("");
      this.target.innerHTML = this.state.isRoot
        ? nodesTemplate
        : `<div class="Node"><img src="./assets/prev.png"></div>${nodesTemplate}`;
    }
  };

  this.target.addEventListener("click", (e) => {
    const node = e.target.closest(".Node");
    if (node) {
      const { nodeId } = node.dataset;
      if (!nodeId) {
        this.onBackClick();
        return;
      }

      const selectedNode = this.state.nodes.find((node) => node.id === nodeId);
      if (selectedNode) {
        this.onClick(selectedNode);
      }
    }
  });

  this.onClick = onClick;
  this.onBackClick = onBackClick;

  this.render();
}
