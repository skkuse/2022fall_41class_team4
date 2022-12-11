import React from "react";
import Td from "./Td";

class Tr extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.search,
        };
    }
    render() {
        return (
            <li>
                {this.props.ProblemData.map((elem) => {
                    var searched = this.props.search;
                    var id = this.props.id;
                    var name = this.props.name; // 추가
                    console.log(elem.name);
                    console.log(id);
                    if (elem.name.includes(searched)) return <Td item={elem} id={id} name={name}/>; // 추가
                })}
            </li>
        );
    }
}

export default Tr;