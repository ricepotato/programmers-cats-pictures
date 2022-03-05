import ImageView from "./ImageView.js";
import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import Loading from "./Loading.js";
import { request } from "./api.js";

const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default function App(app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false,
  };
  const loading = new Loading({ app, initialState: this.state.isLoading });
  const imageView = new ImageView({
    app,
    initialState: this.state.selectedFilePath,
  });
  const breadcrumb = new Breadcrumb({ app, initialState: this.state.depth });
  const nodes = new Nodes({
    app,
    initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        this.setState({
          ...this.state,
          isLoading: true,
        });
        const nextNodes = await request(node.id);
        this.setState({
          ...this.state,
          isRoot: false,
          depth: [...this.state.depth, node],
          nodes: nextNodes,
          isLoading: false,
        });
      } else if (node.type === "FILE") {
      }
    },
    onBackClick: async () => {
      try {
        const nextState = { ...this.state };
        nextState.depth.pop();
        const prevNodeId =
          nextState.depth.length === 0
            ? null
            : nextState.depth[nextState.depth.length - 1].id;
        if (prevNodeId === null) {
          this.setState({
            ...this.state,
            isLoading: true,
          });
          const rootNodes = await request();
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: rootNodes,
            isLoading: false,
          });
        } else {
          const prevNodes = await request(prevNodeId);
          this.setState({ ...nextState, isRoot: false, nodes: prevNodes });
        }
      } catch (e) {
        alert(e);
      }
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setState(this.state.selectedFilePath);
    loading.setState(this.state.isLoading);
  };

  const init = async () => {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      });
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
        isLoading: false,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  };

  init();
}
