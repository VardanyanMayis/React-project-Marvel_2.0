import { Component } from "react";
import BanerApp from "../BanerApp/BanerApp";

class ForRandomHero extends Component {
    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({error: true});
    }

    render() {
        if(this.state.error) return <BanerApp />;

        return this.props.children;
    }

}

export default ForRandomHero;
