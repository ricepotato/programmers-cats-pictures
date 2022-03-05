import ImageView from "./ImageView.js";
import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import Loading from "./Loading.js";
import { request } from "./api.js";

const cache = {};

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
    onClick: () => {
      this.setState({ ...this.state, selectedFilePath: null });
    },
  });
  const breadcrumb = new Breadcrumb({
    app,
    initialState: this.state.depth,
    onClick: (index) => {
      if (index === null) {
        this.setState({ ...this.state, depth: [], nodes: cache.rootNodes });
        return;
      }

      if (index === this.state.depth.length - 1) {
        return;
      }

      const nextState = { ...this.state };
      const nextDepth = this.state.depth.slice(0, index + 1);
      this.setState({
        ...nextState,
        depth: nextDepth,
        nodes: cache[nextDepth[nextDepth.length - 1].id],
      });
    },
  });
  const nodes = new Nodes({
    app,
    initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        this.setState({
          ...this.state,
          isLoading: true,
        });
        if (cache[node.id]) {
          this.setState({
            ...this.state,
            isRoot: false,
            depth: [...this.state.depth, node],
            nodes: cache[node.id],
            isLoading: false,
          });
        } else {
          const nextNodes = await request(node.id);
          this.setState({
            ...this.state,
            isRoot: false,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
            isLoading: false,
          });
          cache[node.id] = nextNodes;
        }
      } else if (node.type === "FILE") {
        this.setState({
          ...this.state,
          selectedFilePath: node.filePath,
        });
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
            ...nextState,
            isRoot: true,
            nodes: cache.rootNodes,
            isLoading: false,
          });
        } else {
          this.setState({
            ...nextState,
            isRoot: false,
            nodes: cache[prevNodeId],
          });
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
      cache.rootNodes = rootNodes;
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
